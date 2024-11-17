"use client";

import { SquareIcon } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

const bgOptions = [
  { id: "white", name: "White", color: "#ffffff" },
  { id: "black", name: "Black", color: "#000000" },
  { id: "transparent", name: "Transparent", color: "transparent" },
  { id: "blur", name: "Blur", color: "blur" },
] as const;

type BgOption = typeof bgOptions[number]["id"];

export function SquareImage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedBg, setSelectedBg] = useState<BgOption>("white");

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
      const size = Math.max(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Handle background
      if (selectedBg === "blur") {
        // Create a blurred background
        ctx.filter = "blur(20px)";
        ctx.drawImage(img, 0, 0, size, size);
        ctx.filter = "none";
      } else if (selectedBg !== "transparent") {
        ctx.fillStyle = bgOptions.find(bg => bg.id === selectedBg)?.color ?? "#ffffff";
        ctx.fillRect(0, 0, size, size);
      }

      // Calculate position to center the image
      const x = (size - img.width) / 2;
      const y = (size - img.height) / 2;

      // Draw the original image centered
      ctx.drawImage(img, x, y);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = imageFile.name.replace(/\.[^/.]+$/, "") + "_square.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    };
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setSelectedBg("white");
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="Square Image"
        description="Convert your rectangular images into perfect squares with custom backgrounds. Ideal for social media profiles and thumbnails."
        icon={<SquareIcon className="h-6 w-6" />}
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
            {selectedBg === "blur" && imageUrl && (
              <div 
                className="absolute inset-0 bg-cover bg-center blur-xl opacity-50"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            )}
            <div className={`relative w-full aspect-square flex items-center justify-center ${
              selectedBg === "transparent" ? "bg-[url('/checkered-pattern.png')] bg-repeat" : ""
            }`} style={{ backgroundColor: selectedBg !== "transparent" && selectedBg !== "blur" ? bgOptions.find(bg => bg.id === selectedBg)?.color : undefined }}>
              <img
                src={imageUrl ?? ""}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <div className={styles.optionGrid}>
            {bgOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedBg(option.id)}
                className={`${styles.optionButton.base} ${
                  selectedBg === option.id
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
