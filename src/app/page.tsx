import Link from "next/link";

const tools = [
  {
    title: "SVG to PNG",
    description: "Convert SVG files to PNG with custom dimensions",
    href: "/svg-to-png",
    icon: "🖼️",
  },
  {
    title: "Square Image",
    description: "Make any image perfectly square with custom background",
    href: "/square-image",
    icon: "⬛",
  },
  {
    title: "Format Converter",
    description: "Convert images between different formats",
    href: "/format-converter",
    icon: "🔄",
  },
  {
    title: "Image Compressor",
    description: "Compress images without losing quality",
    href: "/image-compressor",
    icon: "📦",
  },
  {
    title: "Rounded Border",
    description: "Add rounded borders to your images",
    href: "/rounded-border",
    icon: "⭕",
  },
  {
    title: "Color Filter",
    description: "Apply color filters to your images",
    href: "/color-filter",
    icon: "🎨",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          QuickPic Image Tools
        </h1>
        <p className="text-foreground/70 text-lg">
          Free, fast, and easy to use image tools
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <h2 className="text-lg font-semibold">{tool.title}</h2>
                <p className="text-foreground/70 mt-1 text-sm">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="text-foreground/50 text-center text-sm">
        <p>All processing is done locally in your browser.</p>
      </footer>
    </div>
  );
}
