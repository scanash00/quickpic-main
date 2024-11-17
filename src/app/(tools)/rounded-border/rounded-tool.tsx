"use client";

import { CircleIcon } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

export function RoundedBorder() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [borderRadius, setBorderRadius] = useState(20);

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

      // Create a rounded rectangle path
      ctx.beginPath();
      ctx.moveTo(borderRadius, 0);
      ctx.lineTo(canvas.width - borderRadius, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, borderRadius);
      ctx.lineTo(canvas.width, canvas.height - borderRadius);
      ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - borderRadius, canvas.height);
      ctx.lineTo(borderRadius, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - borderRadius);
      ctx.lineTo(0, borderRadius);
      ctx.quadraticCurveTo(0, 0, borderRadius, 0);
      ctx.closePath();

      // Clip to the rounded rectangle
      ctx.clip();

      // Draw the image
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = imageFile.name.replace(/\.[^/.]+$/, "") + "_rounded.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    };
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setBorderRadius(20);
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="Rounded Border"
        description="Add smooth rounded corners to your images. Perfect for profile pictures and thumbnails."
        icon={<CircleIcon className="h-6 w-6" />}
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
              style={{ borderRadius: `${borderRadius}px` }}
            />
          </div>

          <div className={styles.controlsContainer}>
            <label htmlFor="radius" className={styles.label}>
              Border Radius
            </label>
            <input
              id="radius"
              type="range"
              min="0"
              max="100"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>{borderRadius}px</div>
          </div>

          <div className={styles.buttonsContainer}>
            <button onClick={handleDownload} className={styles.primaryButton}>
              Download
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
