import { GenerateImage } from "@/app/utils/og-generator";

export const runtime = "edge";
export const alt = "QuickPic Image Effects";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return GenerateImage({
    title: "Image Effects",
    description: "Apply beautiful filters and adjustments to your images",
  });
}
