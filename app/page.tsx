import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-slate-100 flex items-center justify-center">
      <div className="mx-auto max-w-xl w-full">
        <Card className="border border-slate-800 bg-slate-900/95 text-slate-100 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-6 shadow-xl">
              <div className="absolute inset-0 bg-white opacity-20 blur-2xl" />

              <div className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-sm bg-white/90 p-1 sm:p-2 shadow-lg">
                <img
                  src="/IIC org.png"
                  alt="IIC Logo"
                  className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
                />
              </div>

              <div className="relative">
                <h1 className="text-2xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                  ASPIRE 2026 🚀
                </h1>
                <p className="mt-1 text-sm text-white/90">
                  Innovation • Skills • Leadership
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="py-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-950/50 border border-red-900/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v.01M12 9v3m0 0a9 9 0 110 0 9 9 0 010 0z"
                  />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white">
                Registration Closed
              </h2>

              <p className="text-slate-400 max-w-sm">
                Registrations for <span className="text-white font-semibold">ASPIRE 2026</span> are now closed. Thank you for your interest!
              </p>

              <div className="rounded-lg border border-slate-800 bg-slate-800/50 px-5 py-3 mt-2">
                <p className="text-sm text-slate-400">
                  For any queries, contact the IIC team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}