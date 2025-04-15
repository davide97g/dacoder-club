import { AlertCircle, Loader2 } from "lucide-react";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube Subscription Checker",
  description: "Check if you're subscribed to our YouTube channel",
};

export default function RootLayout({}: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4 text-slate-900">
          <main className="flex w-full max-w-md flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-slate-800" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-slate-800"></div>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Work in Progress
              </h1>

              <p className="text-slate-600">
                We&apos;re currently building something awesome. Our site will
                be ready soon!
              </p>
            </div>

            <div className="w-full max-w-sm space-y-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <AlertCircle className="h-4 w-4" />
                <p>Get latest updates </p>
                <a
                  href="https://www.youtube.com/channel/UCp-6Cv5ksm2mY-xLJqvLVKw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="ml-auto rounded-md bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700">
                    My YouTube Channel
                  </button>
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-sm text-slate-500">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <p>Expected launch: Coming soon</p>
            </div>
          </main>

          <footer className="mt-auto py-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
