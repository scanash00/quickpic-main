import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between p-4 font-[family-name:var(--font-geist-sans)] sm:p-8">
      <main className="container mx-auto max-w-6xl flex-grow">
        {/* Header Section */}
        <header className="mb-12 pt-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">QuickPic</h1>
          <p className="mx-auto max-w-2xl text-gray-500">
            A collection of handy tools for quick image manipulation. Fork of
            the project by{" "}
            <a
              href="https://twitter.com/t3dotgg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 transition-colors hover:text-blue-600"
            >
              theo
            </a>
            .
          </p>
        </header>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
          {/* SVG to PNG */}
          <Link
            href="/svg-to-png"
            className="group rounded-xl border border-gray-800 p-6 transition-all hover:border-gray-700 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center">
              <i className="fas fa-image mr-3 text-xl text-blue-500"></i>
              <h2 className="text-xl font-semibold transition-colors group-hover:text-blue-500">
                SVG to PNG
              </h2>
            </div>
            <p className="text-gray-500">
              Convert SVG files to PNG format with customizable dimensions.
            </p>
          </Link>

          {/* Square Image */}
          <Link
            href="/square-image"
            className="group rounded-xl border border-gray-800 p-6 transition-all hover:border-gray-700 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center">
              <i className="fas fa-crop-alt mr-3 text-xl text-blue-500"></i>
              <h2 className="text-xl font-semibold transition-colors group-hover:text-blue-500">
                Square Image
              </h2>
            </div>
            <p className="text-gray-500">
              Generate perfect square images with smart cropping and padding.
            </p>
          </Link>

          {/* Corner Rounder */}
          <Link
            href="/rounded-border"
            className="group rounded-xl border border-gray-800 p-6 transition-all hover:border-gray-700 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center">
              <i className="fas fa-border-all mr-3 text-xl text-blue-500"></i>
              <h2 className="text-xl font-semibold transition-colors group-hover:text-blue-500">
                Corner Rounder
              </h2>
            </div>
            <p className="text-gray-500">
              Add smooth rounded corners to your images with adjustable radius.
            </p>
          </Link>

          {/* Color Filter */}
          <Link
            href="/color-filter"
            className="group rounded-xl border border-gray-800 p-6 transition-all hover:border-gray-700 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center">
              <i className="fas fa-palette mr-3 text-xl text-blue-500"></i>
              <h2 className="text-xl font-semibold transition-colors group-hover:text-blue-500">
                Color Filter
              </h2>
            </div>
            <p className="text-gray-500">
              Apply and customize color filters to enhance your images.
            </p>
          </Link>

          {/* Format Converter */}
          <Link
            href="/format-converter"
            className="group rounded-xl border border-gray-800 p-6 transition-all hover:border-gray-700 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center">
              <i className="fas fa-exchange-alt mr-3 text-xl text-blue-500"></i>
              <h2 className="text-xl font-semibold transition-colors group-hover:text-blue-500">
                Format Converter
              </h2>
            </div>
            <p className="text-gray-500">
              Convert images between different formats while preserving quality.
            </p>
          </Link>

          {/* Image Compressor */}
          <Link
            href="/image-compressor"
            className="group rounded-xl border border-gray-800 p-6 transition-all hover:border-gray-700 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center">
              <i className="fas fa-compress-alt mr-3 text-xl text-blue-500"></i>
              <h2 className="text-xl font-semibold transition-colors group-hover:text-blue-500">
                Image Compressor
              </h2>
            </div>
            <p className="text-gray-500">
              Optimize image file size while maintaining visual quality.
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-sm text-gray-500">
        <a
          href="https://github.com/scanash00/quickpic-main"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-gray-400"
          aria-label="View on GitHub"
        >
          <i className="fab fa-github text-lg"></i>
        </a>
      </footer>
    </div>
  );
}
