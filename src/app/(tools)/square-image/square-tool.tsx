"use client";

import { usePlausible } from "next-plausible";
import { useCallback, useRef } from "react";

import { UploadBox } from "@/components/shared/upload-box";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";

function useImageSquarer(props: {
  canvas: HTMLCanvasElement | null;
  imageContent: string;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const { width, height } = props.imageMetadata;
  const size = Math.max(width, height);

  const squareImage = useCallback(async () => {
    const ctx = props.canvas?.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    const saveImage = () => {
      if (props.canvas) {
        const dataURL = props.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${props.imageMetadata.name}-squared.png`;
        link.click();
      }
    };

    const img = new Image();
    img.onload = () => {
      // Calculate position to center the image
      const x = (size - width) / 2;
      const y = (size - height) / 2;

      // Draw white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);

      // Draw the image centered
      ctx.drawImage(img, x, y, width, height);
      saveImage();
    };

    img.src = props.imageContent;
  }, [props.canvas, props.imageContent, props.imageMetadata, width, height, size]);

  return {
    squareImage,
    canvasProps: { width: size, height: size },
  };
}

function SaveAsSquareButton({
  imageContent,
  imageMetadata,
}: {
  imageContent: string;
  imageMetadata: { width: number; height: number; name: string };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plausible = usePlausible();

  const { squareImage, canvasProps } = useImageSquarer({
    canvas: canvasRef.current,
    imageContent,
    imageMetadata,
  });

  const handleSaveImage = useCallback(async () => {
    await squareImage();
  }, [squareImage]);

  return (
    <>
      <canvas ref={canvasRef} {...canvasProps} className="hidden" />
      <button
        onClick={async () => {
          plausible("square-image");
          await handleSaveImage();
        }}
        className="rounded-lg bg-green-700 px-4 py-2 font-medium text-white shadow-md transition-colors duration-200 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Save Image
      </button>
    </>
  );
}

function SquareImageCore(props: { fileUploaderProps: FileUploaderResult }) {
  return (
    <div className="flex flex-col items-center gap-8">
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="Square Image"
          subtitle="Convert images to square format"
          description="Choose Image"
          accept="image/*"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img
            src={props.fileUploaderProps.file.content}
            alt="Preview"
            className="max-h-[500px] w-full object-contain"
          />
          <div className="flex gap-4">
            <SaveAsSquareButton
              imageContent={props.fileUploaderProps.file.content}
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

export function SquareImage() {
  const fileUploaderProps = useFileUploader();
  return <SquareImageCore fileUploaderProps={fileUploaderProps} />;
}
