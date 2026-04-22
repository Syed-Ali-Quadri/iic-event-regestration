// http:localhost:3000/admin/scan-qr/bilalalisaleemaneesfahad

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type StatusType = 'loading' | 'ready' | 'scanning' | 'detected' | 'error';

interface LogEntry {
  time: string;
  text: string;
  isError?: boolean;
}

export default function QRScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastScannedRef = useRef<string | null>(null);
  const cooldownRef = useRef(false);
  const jsQRRef = useRef<((data: Uint8ClampedArray, width: number, height: number, options?: object) => { data: string } | null) | null>(null);

  const [status, setStatus] = useState<StatusType>('loading');
  const [scanCount, setScanCount] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [placeholderText, setPlaceholderText] = useState('Loading scanner library...');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const addLog = useCallback((text: string, isError = false) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, text, isError }]);
  }, []);

  // Load jsQR dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
    script.onload = () => {
      const w = window as Window & { jsQR?: typeof jsQRRef.current };
      if (typeof w.jsQR === 'function') {
        jsQRRef.current = w.jsQR;
        setStatus('ready');
        setPlaceholderText('Press start to activate camera');
      } else {
        setStatus('error');
        addLog('jsQR not available after load', true);
      }
    };
    script.onerror = () => {
      setStatus('error');
      setPlaceholderText('Failed to load scanner. Refresh page.');
      addLog('Failed to load jsQR library', true);
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [addLog]);

  const resumeScanning = useCallback(() => {
    cooldownRef.current = false;
    lastScannedRef.current = null;
    setStatus('scanning');
    const video = videoRef.current;
    if (video && video.paused && streamRef.current) {
      video.play().then(() => { tick(); });
    }
  }, []);

  const onScan = useCallback(async (data: string) => {
    setScanCount(prev => prev + 1);

    // Freeze video immediately
    const video = videoRef.current;
    if (video) video.pause();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setStatus('detected');

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: data }),
      });

      const json = await res.json();

      if (!res.ok) {
        const errMsg = json?.error || 'Verification failed';
        console.log('%c[ERROR]', 'color:#A32D2D; font-weight:bold;', errMsg);
        addLog(errMsg, true);
        setStatus('error');
      } else {
        const name = json?.existUser?.name || 'Unknown';
        console.log('%c✅ Checked in:', 'color:#1D9E75; font-weight:bold; font-size:14px;', name);
        addLog(`✅ Checked in: ${name}`);
      }
    } catch {
      console.log('%c[ERROR]', 'color:#A32D2D; font-weight:bold;', 'Network error');
      addLog('Network error — could not reach server', true);
      setStatus('error');
    } finally {
      // Unfreeze after API completes
      resumeScanning();
    }
  }, [addLog, resumeScanning]);

  const tick = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !jsQRRef.current) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQRRef.current(imgData.data, imgData.width, imgData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code && code.data !== lastScannedRef.current && !cooldownRef.current) {
        lastScannedRef.current = code.data;
        cooldownRef.current = true;
        onScan(code.data);
        return; // stop the loop — resumeScanning() restarts it
      }
    }
    animFrameRef.current = requestAnimationFrame(tick);
  }, [onScan]);

  const startScanner = async () => {
    if (!jsQRRef.current) { addLog('Scanner library not ready yet.', true); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();
      setIsCameraActive(true);
      setStatus('scanning');
      tick();
    } catch (e) {
      setStatus('error');
      addLog('Camera error: ' + (e as Error).message, true);
    }
  };

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsCameraActive(false);
    setStatus('ready');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopScanner(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearLog = () => {
    setLogs([]);
    setScanCount(0);
  };

  const statusStyles: Record<StatusType, React.CSSProperties> = {
    loading:  { background: '#f1f1f1', color: '#888',    border: '0.5px solid #ddd' },
    ready:    { background: '#f1f1f1', color: '#888',    border: '0.5px solid #ddd' },
    scanning: { background: '#e6f1fb', color: '#185FA5', border: '0.5px solid #b5d4f4' },
    detected: { background: '#eaf3de', color: '#3B6D11', border: '0.5px solid #c0dd97' },
    error:    { background: '#fcebeb', color: '#A32D2D', border: '0.5px solid #f7c1c1' },
  };

  const statusLabel: Record<StatusType, string> = {
    loading:  'loading...',
    ready:    'ready',
    scanning: 'scanning',
    detected: 'detected!',
    error:    'error',
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>QR Scanner</p>
        <span style={{
          fontSize: 12, padding: '4px 10px', borderRadius: 8,
          ...statusStyles[status]
        }}>
          {statusLabel[status]}
        </span>
      </div>

      {/* Camera box */}
      <div style={{
        width: '100%', aspectRatio: '4/3',
        background: '#f5f5f5', borderRadius: 12,
        border: '0.5px solid #ddd', overflow: 'hidden',
        position: 'relative', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {!isCameraActive && (
          <div style={{ textAlign: 'center', color: '#888' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>▶</div>
            <p style={{ fontSize: 14, margin: 0 }}>{placeholderText}</p>
          </div>
        )}

        <video
          ref={videoRef}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: isCameraActive ? 'block' : 'none' }}
          playsInline
          muted
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Scan line animation */}
        {isCameraActive && (
          <div style={{
            position: 'absolute', left: '10%', right: '10%', height: 2,
            background: '#185FA5',
            animation: 'scanLine 2s linear infinite',
          }} />
        )}
      </div>

      <style>{`
        @keyframes scanLine {
          0%   { top: 20%; }
          80%  { top: 75%; }
          100% { top: 20%; }
        }
      `}</style>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={startScanner} disabled={isCameraActive || status === 'loading'} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '0.5px solid #ccc', cursor: 'pointer', background: 'white' }}>
          Start camera
        </button>
        <button onClick={stopScanner} disabled={!isCameraActive} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '0.5px solid #ccc', cursor: 'pointer', background: 'white' }}>
          Stop camera
        </button>
        <button onClick={clearLog} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '0.5px solid #ccc', cursor: 'pointer', background: 'white' }}>
          Clear log
        </button>
      </div>

      {/* Log */}
      <div style={{ marginTop: '1.5rem' }}>
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 8px' }}>
          Scan log{' '}
          <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 8, background: '#f1f1f1', border: '0.5px solid #ddd' }}>
            {scanCount}
          </span>
        </p>
        <div style={{
          background: '#f9f9f9', border: '0.5px solid #ddd',
          borderRadius: 12, padding: 12,
          minHeight: 120, maxHeight: 240, overflowY: 'auto',
          fontFamily: 'monospace', fontSize: 13,
        }}>
          {logs.length === 0 ? (
            <span style={{ color: '#aaa' }}>// Scanned QR data will appear here and in console</span>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{
                padding: '6px 0',
                borderTop: i === 0 ? 'none' : '0.5px solid #eee',
                color: log.isError ? '#A32D2D' : '#111',
                wordBreak: 'break-all',
              }}>
                <span style={{ color: '#aaa', fontSize: 11 }}>{log.time}</span>
                <br />
                {log.text}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}