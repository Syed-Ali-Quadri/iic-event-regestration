"use client";

import { useRef, useState } from "react";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formRef.current) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const apiResponse = await response.json();

      // ❌ Backend error (Zod / custom)
      if (!response.ok) {
        setError(apiResponse.error || "Something went wrong");
        return;
      }

      // ✅ Success
      setSuccess("Registration successful!");

      // Optional: reset form
      formRef.current.reset();

    } catch (err) {
      // ❌ Network error
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Registration Form</h1>

      {/* 🔴 ERROR SECTION */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          <strong>Error:</strong>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      {/* 🟢 SUCCESS SECTION */}
      {success && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          {success}
        </div>
      )}

      {/* ⏳ LOADING */}
      {loading && <p>Submitting...</p>}

      <form ref={formRef} onSubmit={submit}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="text" placeholder="Email" required />
        <input name="phone" type="text" placeholder="Phone" required />
        <input name="department" type="text" placeholder="Department" required />
        <input name="year" type="text" placeholder="Year" required />
        <input name="rollno" type="text" placeholder="Roll No" required />
        <input name="section" type="text" placeholder="Section" required />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </>
  );
}