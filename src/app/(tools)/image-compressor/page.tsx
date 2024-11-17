'use client';

import dynamic from 'next/dynamic';

const CompressorTool = dynamic(() => import('./compressor-tool').then(mod => mod.CompressorTool), {
  ssr: false
});

export const metadata = {
  title: "Image Compressor - QuickPic",
  description: "Compress your images without losing quality",
};

export default function Page() {
  return <CompressorTool />;
}
