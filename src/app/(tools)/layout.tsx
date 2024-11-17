"use client";

import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

function BackButton() {
  return (
    <div className="fixed left-4 top-4 z-50">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-gray-400 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
    </div>
  );
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <BackButton />
      <main className="flex flex-grow flex-col items-center justify-center">
        {children}
      </main>
      <footer className="mt-8 text-center">
        <a
          href="https://github.com/scanash00/quickpic-main"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-gray-400 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-gray-200"
        >
          <Github className="h-4 w-4" />
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
