"use client";
import { usePlausible } from "next-plausible";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/shared/upload-box";
import { OptionSelector } from "@/components/shared/option-selector";
import {
  useFileUploader,
  type FileUploaderResult,
} from "@/hooks/use-file-uploader";
import { FileDropzone } from "@/components/shared/file-dropzone";

type Format = "png" | "jpeg" | "webp";

function useImageConverter(props: {
  canvas: HTMLCanvasElement | null;
  imageContent: string;
  format: Format;
  fileName?: string;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const { width, height } = useMemo(() => {
    return {
      width: props.imageMetadata.width,
      height: props.imageMetadata.height,
    };
  }, [props.imageMetadata]);

  const getMimeType = (format: Format): string => {
    switch (format) {
      case "png":
        return "image/png";
      case "jpeg":
        return "image/jpeg";
      case "webp":
        return "image/webp";
    }
  };

  const convertImage = async () => {
    const ctx = props.canvas?.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    const saveImage = () => {
      if (props.canvas) {
        const dataURL = props.canvas.toDataURL(getMimeType(props.format));
        const link = document.createElement("a");
        link.href = dataURL;
        const imageFileName = props.imageMetadata.name ?? "image_converted";
        link.download = `${imageFileName.replace(/\..+$/, "")}.${props.format}`;
        link.click();
      }
    };

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      saveImage();
    };

    img.src = props.imageContent;
  };

  return {
    convertImage,
    canvasProps: { width, height },
  };
}

interface ImageRendererProps {
  imageContent: string;
}

const ImageRenderer = ({ imageContent }: ImageRendererProps) => {
  return (
    <div className="relative w-[500px]">
      <img
        src={imageContent}
        alt="Preview"
        className="max-h-[500px] w-full object-contain"
      />
    </div>
  );
};

function SaveImageButton({
  imageContent,
  format,
  imageMetadata,
}: {
  imageContent: string;
  format: Format;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plausible = usePlausible();

  const { convertImage, canvasProps } = useImageConverter({
    canvas: canvasRef.current,
    imageContent,
    format,
    imageMetadata,
  });

  return (
    <>
      <canvas ref={canvasRef} {...canvasProps} className="hidden" />
      <button
        onClick={() => {
          plausible("save-converted-image");
          convertImage();
        }}
        className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        Convert and Save
      </button>
    </>
  );
}

function ConverterToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [format, setFormat] = useLocalStorage<Format>("format", "png");

  const formatOptions = [
    { label: "PNG", value: "png" as const },
    { label: "JPEG", value: "jpeg" as const },
    { label: "WebP", value: "webp" as const },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="Format Converter"
          subtitle="Convert images between formats"
          description="Choose Image"
          accept="image/*"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <OptionSelector
            label="Format"
            value={format}
            onChange={setFormat}
            options={formatOptions}
          />
          <ImageRenderer imageContent={props.fileUploaderProps.file.content} />
          <div className="flex gap-4">
            <SaveImageButton
              imageContent={props.fileUploaderProps.file.content}
              format={format}
              imageMetadata={props.fileUploaderProps.file.metadata}
            />
            <button
              onClick={props.fileUploaderProps.cancel}
              className="rounded-lg bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
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
