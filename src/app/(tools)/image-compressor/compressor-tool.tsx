"use client";

import { CompressIcon } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

const qualityOptions = [
  { id: "high", name: "High", value: 0.8 },
  { id: "medium", name: "Medium", value: 0.6 },
  { id: "low", name: "Low", value: 0.4 },
  { id: "custom", name: "Custom", value: null },
] as const;

type QualityOption = typeof qualityOptions[number]["id"];

export function CompressorTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>("high");
  const [customQuality, setCustomQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

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
    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getQualityValue = () => {
    if (selectedQuality === "custom") {
      return customQuality / 100;
    }
    return qualityOptions.find(q => q.id === selectedQuality)?.value ?? 0.8;
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

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = imageFile.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg";
            a.click();
            URL.revokeObjectURL(url);
          }
        },
        "image/jpeg",
        getQualityValue()
      );
    };
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setSelectedQuality("high");
    setCustomQuality(80);
    setOriginalSize(0);
    setCompressedSize(0);
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="Image Compressor"
        description="Compress your images while maintaining quality. Perfect for reducing file size for web use."
        icon={<CompressIcon className="h-6 w-6" />}
      />

      {!imageFile ? (
        <UploadBox
          title="Upload Image"
          subtitle="Supported formats: PNG, JPG, JPEG"
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
            <div className="absolute top-2 right-2 flex gap-2">
              <div className="rounded-md bg-gray-900/80 px-3 py-1.5 text-xs text-white backdrop-blur">
                Original: {formatSize(originalSize)}
              </div>
              {compressedSize > 0 && (
                <div className="rounded-md bg-green-900/80 px-3 py-1.5 text-xs text-white backdrop-blur">
                  Compressed: {formatSize(compressedSize)}
                </div>
              )}
            </div>
          </div>

          <div className={styles.optionGrid}>
            {qualityOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedQuality(option.id)}
                className={`${styles.optionButton.base} ${
                  selectedQuality === option.id
                    ? styles.optionButton.selected
                    : styles.optionButton.unselected
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>

          {selectedQuality === "custom" && (
            <div className={styles.controlsContainer}>
              <label htmlFor="quality" className={styles.label}>
                Quality: {customQuality}%
              </label>
              <input
                id="quality"
                type="range"
                min="1"
                max="100"
                value={customQuality}
                onChange={(e) => setCustomQuality(Number(e.target.value))}
                className={styles.slider}
              />
            </div>
          )}

          <div className={styles.buttonsContainer}>
            <button onClick={handleDownload} className={styles.primaryButton}>
              Download Compressed
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
