import { GenerateImage } from "@/app/utils/og-generator";

export const runtime = "edge";

export const alt = "Color Filter - QuickPic";
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  return await GenerateImage({
    title: "Color Filter",
    description: "Apply color effects to your images. For free.",
  });
}
