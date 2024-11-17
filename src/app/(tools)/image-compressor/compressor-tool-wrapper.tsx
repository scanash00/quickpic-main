"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/ui/loading";

const CompressorTool = dynamic(
  () => import("./compressor-tool").then((mod) => mod.CompressorTool),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

export function CompressorToolWrapper() {
  return <CompressorTool />;
}
