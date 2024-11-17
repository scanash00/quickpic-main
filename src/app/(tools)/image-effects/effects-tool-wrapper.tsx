"use client";

import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/ui/loading";

const EffectsTool = dynamic(
  () => import("./effects-tool").then((mod) => mod.EffectsTool),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

export function EffectsToolWrapper() {
  return <EffectsTool />;
}
