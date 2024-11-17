"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/shared/upload-box";
import { OptionSelector } from "@/components/shared/option-selector";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";
import { Download } from "lucide-react";

type Format = "png" | "jpeg" | "webp";

const formatOptions = [
  { label: "PNG", value: "png" as Format },
  { label: "JPEG", value: "jpeg" as Format },
  { label: "WebP", value: "webp" as Format },
];

function ConverterToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [format, setFormat] = useLocalStorage<Format>("format", "png");

  const handleDownload = async () => {
    if (!props.fileUploaderProps.file) return;

    const img = new Image();
    img.src = props.fileUploaderProps.file.content;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    const mimeType = `image/${format === "jpeg" ? "jpeg" : format}`;
    const quality = format === "jpeg" ? 0.9 : undefined;
    const dataUrl = canvas.toDataURL(mimeType, quality);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${props.fileUploaderProps.file.metadata.name}.${format}`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="Format Converter"
          subtitle="Convert your images to different formats"
          description="Choose Image"
          accept="image/*"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
          <OptionSelector
            label="Output Format"
            value={format}
            onChange={setFormat}
            options={formatOptions}
          />
          
          <div className="relative w-full rounded-lg border border-gray-200 bg-white p-4">
            <img
              src={props.fileUploaderProps.file.content}
              alt="Preview"
              className="mx-auto max-h-[500px] w-full object-contain"
            />
            <div className="absolute top-2 right-2">
              <div className="rounded-md bg-gray-900/80 px-3 py-1.5 text-xs text-white backdrop-blur">
                {props.fileUploaderProps.file.metadata.width} x {props.fileUploaderProps.file.metadata.height}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:bg-blue-800"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5" />
              <span>Download {format.toUpperCase()}</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-200 active:bg-gray-300"
              onClick={props.fileUploaderProps.cancel}
            >
              Choose Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ConverterTool() {
  const fileUploaderProps = useFileUploader();
  return <ConverterToolCore fileUploaderProps={fileUploaderProps} />;
}
