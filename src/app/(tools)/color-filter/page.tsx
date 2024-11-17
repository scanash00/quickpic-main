import type { Metadata } from "next";
import { ColorFilter } from "./filter-tool";

export const metadata: Metadata = {
  title: "Image Filter - QuickPic",
  description: "Apply beautiful filters to your images with real-time preview.",
};

export default function Page() {
  return <ColorFilter />;
}
