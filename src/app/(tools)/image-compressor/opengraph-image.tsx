import { GenerateImage } from "@/app/utils/og-generator";

export const runtime = "edge";

export const alt = "Image Compressor - QuickPic";
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  return await GenerateImage({
    title: "Image Compressor",
    description: "Compress your images without losing quality. For free.",
  });
}
