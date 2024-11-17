import { Metadata } from "next";
import dynamic from "next/dynamic";

const EffectsTool = dynamic(() => import("./effects-tool").then((mod) => mod.EffectsTool), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Image Effects - QuickPic",
  description: "Apply beautiful filters and adjustments to your images. Perfect for enhancing photos with professional-looking effects.",
};

export default function EffectsPage() {
  return <EffectsTool />;
}
