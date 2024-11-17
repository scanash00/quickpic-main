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

type Quality = "high" | "medium" | "low";

function useImageConverter(props: {
  canvas: HTMLCanvasElement | null;
  imageContent: string;
  quality: Quality;
  fileName?: string;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const { width, height } = useMemo(() => {
    return {
      width: props.imageMetadata.width,
      height: props.imageMetadata.height,
    };
  }, [props.imageMetadata]);

  const getQualityValue = (quality: Quality): number => {
    switch (quality) {
      case "high":
        return 0.8;
      case "medium":
        return 0.5;
      case "low":
        return 0.2;
    }
  };

  const convertToPng = async () => {
    const ctx = props.canvas?.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    const saveImage = () => {
      if (props.canvas) {
        const dataURL = props.canvas.toDataURL(
          "image/jpeg",
          getQualityValue(props.quality),
        );
        const link = document.createElement("a");
        link.href = dataURL;
        const imageFileName = props.imageMetadata.name ?? "image_compressed";
        link.download = `${imageFileName.replace(/\..+$/, "")}_${props.quality}.jpg`;
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
    convertToPng,
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

function SaveAsPngButton({
  imageContent,
  quality,
  imageMetadata,
}: {
  imageContent: string;
  quality: Quality;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plausible = usePlausible();

  const { convertToPng, canvasProps } = useImageConverter({
    canvas: canvasRef.current,
    imageContent,
    quality,
    imageMetadata,
  });

  return (
    <>
      <canvas ref={canvasRef} {...canvasProps} className="hidden" />
      <button
        onClick={() => {
          plausible("save-compressed-image");
          convertToPng();
        }}
        className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        Save Compressed Image
      </button>
    </>
  );
}

function CompressorToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [quality, setQuality] = useLocalStorage<Quality>("quality", "high");

  const qualityOptions = [
    { label: "High Quality", value: "high" as const },
    { label: "Medium Quality", value: "medium" as const },
    { label: "Low Quality", value: "low" as const },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <OptionSelector
          label="Compression Quality"
          value={quality}
          onChange={setQuality}
          options={qualityOptions}
        />
      </div>

      {props.fileUploaderProps.file ? (
        <div className="flex flex-col items-center gap-4">
          <ImageRenderer imageContent={props.fileUploaderProps.file.content} />
          <SaveAsPngButton
            imageContent={props.fileUploaderProps.file.content}
            quality={quality}
            imageMetadata={props.fileUploaderProps.file.metadata}
          />
        </div>
      ) : (
        <FileDropzone onDrop={props.fileUploaderProps.handleDrop}>
          <UploadBox />
        </FileDropzone>
      )}
    </div>
  );
}

export function CompressorTool() {
  const fileUploaderProps = useFileUploader();
  return <CompressorToolCore fileUploaderProps={fileUploaderProps} />;
}
