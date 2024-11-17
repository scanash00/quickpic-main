import type { Metadata } from "next";
import { WatermarkToolWrapper } from "./watermark-tool-wrapper";

export const metadata: Metadata = {
  title: "Image Watermark - QuickPic",
  description: "Add watermarks to your images",
  openGraph: {
    title: "Image Watermark - QuickPic",
    description: "Add watermarks to your images",
  },
  twitter: {
    title: "Image Watermark - QuickPic",
    description: "Add watermarks to your images",
  },
};

export default function Page() {
  return <WatermarkToolWrapper />;
}
