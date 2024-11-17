import { BackgroundRemoverTool } from "./bg-remover-tool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background Remover - QuickPic",
  description:
    "Remove image backgrounds with AI. Replace with transparency, solid colors, or blur effects.",
};

export default function BackgroundRemoverPage() {
  return <BackgroundRemoverTool />;
}
