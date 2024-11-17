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

type FilterType = "grayscale" | "sepia" | "invert" | "blur" | "none";

function useImageConverter(props: {
  canvas: HTMLCanvasElement | null;
  imageContent: string;
  filter: FilterType;
  fileName?: string;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const { width, height } = useMemo(() => {
    return {
      width: props.imageMetadata.width,
      height: props.imageMetadata.height,
    };
  }, [props.imageMetadata]);

  const convertToPng = async () => {
    const ctx = props.canvas?.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    const saveImage = () => {
      if (props.canvas) {
        const dataURL = props.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        const imageFileName = props.imageMetadata.name ?? "image_filtered";
        link.download = `${imageFileName.replace(/\..+$/, "")}_${props.filter}.png`;
        link.click();
      }
    };

    const img = new Image();
    img.onload = () => {
      ctx.filter = getFilterString(props.filter);
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

function getFilterString(filter: FilterType): string {
  switch (filter) {
    case "grayscale":
      return "grayscale(100%)";
    case "sepia":
      return "sepia(100%)";
    case "invert":
      return "invert(100%)";
    case "blur":
      return "blur(5px)";
    default:
      return "none";
  }
}

interface ImageRendererProps {
  imageContent: string;
  filter: FilterType;
}

const ImageRenderer = ({ imageContent, filter }: ImageRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const imgElement = containerRef.current.querySelector("img");
      if (imgElement) {
        imgElement.style.filter = getFilterString(filter);
      }
    }
  }, [imageContent, filter]);

  return (
    <div ref={containerRef} className="relative w-[500px]">
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
  filter,
  imageMetadata,
}: {
  imageContent: string;
  filter: FilterType;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plausible = usePlausible();

  const { convertToPng, canvasProps } = useImageConverter({
    canvas: canvasRef.current,
    imageContent,
    filter,
    imageMetadata,
  });

  return (
    <>
      <canvas ref={canvasRef} {...canvasProps} className="hidden" />
      <button
        onClick={() => {
          plausible("save-filtered-image");
          convertToPng();
        }}
        className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        Save Image
      </button>
    </>
  );
}

function FilterToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [filter, setFilter] = useLocalStorage<FilterType>("filter", "none");

  const filterOptions = [
    { label: "None", value: "none" as const },
    { label: "Grayscale", value: "grayscale" as const },
    { label: "Sepia", value: "sepia" as const },
    { label: "Invert", value: "invert" as const },
    { label: "Blur", value: "blur" as const },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <OptionSelector
          label="Filter"
          value={filter}
          onChange={setFilter}
          options={filterOptions}
        />
      </div>

      {props.fileUploaderProps.file ? (
        <div className="flex flex-col items-center gap-4">
          <ImageRenderer
            imageContent={props.fileUploaderProps.file.content}
            filter={filter}
          />
          <SaveAsPngButton
            imageContent={props.fileUploaderProps.file.content}
            filter={filter}
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

export function FilterTool() {
  const fileUploaderProps = useFileUploader();
  return <FilterToolCore fileUploaderProps={fileUploaderProps} />;
}
