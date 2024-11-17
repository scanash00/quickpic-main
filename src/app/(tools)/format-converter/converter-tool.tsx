"use client";

import { FileTypeIcon } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

const formatOptions = [
  { id: "png", name: "PNG", mime: "image/png" },
  { id: "jpeg", name: "JPEG", mime: "image/jpeg" },
  { id: "webp", name: "WebP", mime: "image/webp" },
] as const;

type FormatOption = typeof formatOptions[number]["id"];

export function ConverterTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>("png");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleDownload = () => {
    if (!imageUrl || !imageFile) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const format = formatOptions.find(f => f.id === selectedFormat);
      if (!format) return;

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = imageFile.name.replace(/\.[^/.]+$/, "") + "." + format.id;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, format.mime);
    };
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setSelectedFormat("png");
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="Format Converter"
        description="Convert your images between different formats. Support for PNG, JPEG, and WebP with high quality preservation."
        icon={<FileTypeIcon className="h-6 w-6" />}
      />

      {!imageFile ? (
        <UploadBox
          title="Upload Image"
          subtitle="Supported formats: PNG, JPG, JPEG, WebP"
          description="Choose image"
          accept="image/*"
          onChange={handleFileChange}
          onDrop={handleDrop}
        />
      ) : (
        <div className={styles.toolContainer}>
          <div className={styles.imageContainer}>
            <img
              src={imageUrl ?? ""}
              alt="Preview"
              className={styles.image}
            />
          </div>

          <div className={styles.optionGrid}>
            {formatOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedFormat(option.id)}
                className={`${styles.optionButton.base} ${
                  selectedFormat === option.id
                    ? styles.optionButton.selected
                    : styles.optionButton.unselected
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>

          <div className={styles.buttonsContainer}>
            <button onClick={handleDownload} className={styles.primaryButton}>
              Download {selectedFormat.toUpperCase()}
            </button>
            <button onClick={handleCancel} className={styles.secondaryButton}>
              Try Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
