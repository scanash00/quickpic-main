import dynamic from "next/dynamic";

export const metadata = {
  title: "Image Compressor - QuickPic",
  description: "Compress your images without losing quality",
};

const CompressorTool = dynamic(
  () => import("./compressor-tool").then((mod) => mod.CompressorTool),
  {
    ssr: false,
  },
);

export default function Page() {
  return <CompressorTool />;
}
