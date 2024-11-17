import type { Metadata } from "next";
import { SvgToPng } from "./svg-tool";

export const metadata: Metadata = {
  title: "SVG to PNG converter - QuickPic",
  description: "Convert SVG files to PNG format with high quality.",
};

export default function Page() {
  return <SvgToPng />;
}
