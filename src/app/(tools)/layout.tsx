"use client";

import Link from "next/link";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-white/10 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold hover:text-white/90"
        >
          <span className="text-xl">←</span>
          <span>QuickPic</span>
        </Link>
      </header>

      <div>{children}</div>
    </div>
  );
}
