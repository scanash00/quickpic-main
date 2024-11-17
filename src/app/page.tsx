import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex flex-grow flex-col items-center justify-center">
        <div>
          Hey, I'm Scan, and this is a fork of the project by{" "}
          <a
            href="https://twitter.com/t3dotgg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            theo
          </a>
          .
        </div>
        <div className="mt-4"></div>
        <Link href="/svg-to-png" className="text-blue-500 hover:underline">
          SVG to PNG converter
        </Link>
        <Link href="/square-image" className="text-blue-500 hover:underline">
          Square image generator
        </Link>
        <Link href="/rounded-border" className="text-blue-500 hover:underline">
          Corner Rounder
        </Link>
        <Link href="/color-filter" className="text-blue-500 hover:underline">
          Color Filter
        </Link>
        <Link
          href="/format-converter"
          className="text-blue-500 hover:underline"
        >
          Format Converter
        </Link>
        <Link
          href="/image-compressor"
          className="text-blue-500 hover:underline"
        >
          Image Compressor
        </Link>
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500">
        <a
          href="https://github.com/t3dotgg/quickpic"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
