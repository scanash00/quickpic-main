"use client";

import { usePlausible } from "next-plausible";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/shared/upload-box";
import { OptionSelector } from "@/components/shared/option-selector";
import { FileDropzone } from "@/components/shared/file-dropzone";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";
import { useEffect, useState } from "react";

function SquareToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [background, setBackground] = useLocalStorage<"white" | "black">(
    "background",
    "white"
  );

  const backgroundOptions = [
    { label: "White", value: "white" as const },
    { label: "Black", value: "black" as const },
  ];

  const [squareImageContent, setSquareImageContent] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (props.fileUploaderProps.file) {
      const canvas = document.createElement("canvas");
      const size = Math.max(
        props.fileUploaderProps.file.metadata.width,
        props.fileUploaderProps.file.metadata.height,
      );
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill background
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, size, size);

      // Load and center the image
      const img = new Image();
      img.onload = () => {
        const x = (size - props.fileUploaderProps.file.metadata.width) / 2;
        const y = (size - props.fileUploaderProps.file.metadata.height) / 2;
        ctx.drawImage(img, x, y);
        setSquareImageContent(canvas.toDataURL("image/png"));
      };
      img.src = props.fileUploaderProps.file.content;
    }
  }, [props.fileUploaderProps.file, background]);

  const handleSaveImage = () => {
    if (squareImageContent && props.fileUploaderProps.file) {
      const link = document.createElement("a");
      link.href = squareImageContent;
      const originalFileName = props.fileUploaderProps.file.metadata.name;
      const fileNameWithoutExtension =
        originalFileName.substring(0, originalFileName.lastIndexOf(".")) ||
        originalFileName;
      link.download = `${fileNameWithoutExtension}-squared.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const plausible = usePlausible();

  return (
    <div className="flex flex-col items-center gap-8">
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="Square Image Generator"
          subtitle="Make your images square with custom background"
          description="Choose Image"
          accept="image/*"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <OptionSelector
            label="Background"
            value={background}
            onChange={setBackground}
            options={backgroundOptions}
          />
          {squareImageContent && (
            <img src={squareImageContent} alt="Preview" className="mb-4" />
          )}
          <div className="flex gap-4">
            <button
              onClick={() => {
                plausible("create-square-image");
                handleSaveImage();
              }}
              className="rounded-lg bg-green-700 px-4 py-2 font-medium text-white shadow-md transition-colors duration-200 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              Save Image
            </button>
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

export function SquareTool() {
  const fileUploaderProps = useFileUploader();
  return <SquareToolCore fileUploaderProps={fileUploaderProps} />;
}
