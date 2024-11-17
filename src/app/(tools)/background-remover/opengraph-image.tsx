import { GenerateImage } from "@/app/utils/og-generator";

export const runtime = "edge";
export const alt = "QuickPic Background Remover";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return GenerateImage({
    title: "Background Remover",
    description: "Remove image backgrounds with AI",
  });
}
