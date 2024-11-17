import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-4 font-[family-name:var(--font-geist-sans)] sm:p-8">
      <main className="flex-grow container mx-auto max-w-6xl">
        {/* Header Section */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold mb-4">QuickPic</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A collection of handy tools for quick image manipulation. Fork of the project by{" "}
            <a
              href="https://twitter.com/t3dotgg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              theo
            </a>
            .
          </p>
        </header>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {/* SVG to PNG */}
          <Link 
            href="/svg-to-png" 
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <i className="fas fa-image text-blue-500 text-xl mr-3"></i>
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">SVG to PNG</h2>
            </div>
            <p className="text-gray-500">Convert SVG files to PNG format with customizable dimensions.</p>
          </Link>

          {/* Square Image */}
          <Link 
            href="/square-image" 
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <i className="fas fa-crop-alt text-blue-500 text-xl mr-3"></i>
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Square Image</h2>
            </div>
            <p className="text-gray-500">Generate perfect square images with smart cropping and padding.</p>
          </Link>

          {/* Corner Rounder */}
          <Link 
            href="/rounded-border" 
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <i className="fas fa-border-all text-blue-500 text-xl mr-3"></i>
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Corner Rounder</h2>
            </div>
            <p className="text-gray-500">Add smooth rounded corners to your images with adjustable radius.</p>
          </Link>

          {/* Color Filter */}
          <Link 
            href="/color-filter" 
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <i className="fas fa-palette text-blue-500 text-xl mr-3"></i>
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Color Filter</h2>
            </div>
            <p className="text-gray-500">Apply and customize color filters to enhance your images.</p>
          </Link>

          {/* Format Converter */}
          <Link 
            href="/format-converter" 
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <i className="fas fa-exchange-alt text-blue-500 text-xl mr-3"></i>
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Format Converter</h2>
            </div>
            <p className="text-gray-500">Convert images between different formats while preserving quality.</p>
          </Link>

          {/* Image Compressor */}
          <Link 
            href="/image-compressor" 
            className="group p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <i className="fas fa-compress-alt text-blue-500 text-xl mr-3"></i>
              <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">Image Compressor</h2>
            </div>
            <p className="text-gray-500">Optimize image file size while maintaining visual quality.</p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-sm text-gray-500">
        <a
          href="https://github.com/scanash00/quickpic-main"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition-colors"
          aria-label="View on GitHub"
        >
          <i className="fab fa-github text-lg"></i>
        </a>
      </footer>
    </div>
  );
}
