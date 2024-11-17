import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickPic - Image Tools",
  description: "Free, fast, and easy to use image tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-[#111] text-white antialiased`}
      >
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
