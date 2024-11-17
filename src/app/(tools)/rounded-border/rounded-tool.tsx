"use client";

import { usePlausible } from "next-plausible";
import { useCallback, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

import { UploadBox } from "@/components/shared/upload-box";
import { OptionSelector } from "@/components/shared/option-selector";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";

type BorderRadius = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;

function useImageRounder(props: {
  canvas: HTMLCanvasElement | null;
  imageContent: string;
  borderRadius: number;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const { width, height } = props.imageMetadata;

  const roundImage = useCallback(async () => {
    const ctx = props.canvas?.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    const saveImage = () => {
      if (props.canvas) {
        const dataURL = props.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${props.imageMetadata.name}-rounded.png`;
        link.click();
      }
    };

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // Create rounded rectangle path
      ctx.beginPath();
      ctx.moveTo(props.borderRadius, 0);
      ctx.lineTo(width - props.borderRadius, 0);
      ctx.quadraticCurveTo(width, 0, width, props.borderRadius);
      ctx.lineTo(width, height - props.borderRadius);
      ctx.quadraticCurveTo(width, height, width - props.borderRadius, height);
      ctx.lineTo(props.borderRadius, height);
      ctx.quadraticCurveTo(0, height, 0, height - props.borderRadius);
      ctx.lineTo(0, props.borderRadius);
      ctx.quadraticCurveTo(0, 0, props.borderRadius, 0);
      ctx.closePath();

      // Clip to the rounded rectangle path
      ctx.clip();

      // Draw the image
      ctx.drawImage(img, 0, 0, width, height);

      ctx.restore();
      saveImage();
    };

    img.src = props.imageContent;
  }, [props.canvas, props.imageContent, props.borderRadius, props.imageMetadata, width, height]);

  return {
    roundImage,
    canvasProps: { width, height },
  };
}

function SaveAsRoundedButton({
  imageContent,
  borderRadius,
  imageMetadata,
}: {
  imageContent: string;
  borderRadius: number;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plausible = usePlausible();

  const { roundImage, canvasProps } = useImageRounder({
    canvas: canvasRef.current,
    imageContent,
    borderRadius,
    imageMetadata,
  });

  const handleSaveImage = useCallback(async () => {
    await roundImage();
  }, [roundImage]);

  return (
    <>
      <canvas ref={canvasRef} {...canvasProps} className="hidden" />
      <button
        onClick={async () => {
          plausible("round-image");
          await handleSaveImage();
        }}
        className="rounded-lg bg-green-700 px-4 py-2 font-medium text-white shadow-md transition-colors duration-200 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Save Image
      </button>
    </>
  );
}

function RoundedBorderCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [borderRadius, setBorderRadius] = useLocalStorage<BorderRadius>("borderRadius", 8);
  const [customRadius, setCustomRadius] = useState<number>(8);

  const radiusOptions = [
    { label: "4px", value: 4 },
    { label: "8px", value: 8 },
    { label: "12px", value: 12 },
    { label: "16px", value: 16 },
    { label: "20px", value: 20 },
    { label: "24px", value: 24 },
    { label: "28px", value: 28 },
    { label: "32px", value: 32 },
  ];

  const handleRadiusChange = (value: number) => {
    setBorderRadius(value as BorderRadius);
    setCustomRadius(value);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="Rounded Border"
          subtitle="Add rounded corners to images"
          description="Choose Image"
          accept="image/*"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <OptionSelector
            label="Border Radius"
            value={borderRadius}
            onChange={handleRadiusChange}
            options={radiusOptions}
          />
          <img
            src={props.fileUploaderProps.file.content}
            alt="Preview"
            className="max-h-[500px] w-full object-contain"
          />
          <div className="flex gap-4">
            <SaveAsRoundedButton
              imageContent={props.fileUploaderProps.file.content}
              borderRadius={customRadius}
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

export function RoundedBorder() {
  const fileUploaderProps = useFileUploader();
  return <RoundedBorderCore fileUploaderProps={fileUploaderProps} />;
}
