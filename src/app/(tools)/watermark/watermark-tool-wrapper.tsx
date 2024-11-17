"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/ui/loading";

const WatermarkTool = dynamic(
  () => import("./watermark-tool").then((mod) => mod.WatermarkTool),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

export function WatermarkToolWrapper() {
  return <WatermarkTool />;
}
