import { GenerateImage } from "@/app/utils/og-generator";

export const runtime = "edge";
export const alt = "QuickPic Image Watermark";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return GenerateImage({
    title: "Image Watermark",
    description: "Add text or image watermarks to protect your photos",
  });
}
