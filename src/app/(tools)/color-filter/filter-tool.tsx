"use client";

import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

const filterOptions = [
  { id: "normal", name: "Normal" },
  { id: "grayscale", name: "Grayscale" },
  { id: "sepia", name: "Sepia" },
  { id: "invert", name: "Invert" },
  { id: "saturate", name: "Saturate" },
  { id: "hue-rotate", name: "Hue Rotate" },
  { id: "brightness", name: "Brightness" },
  { id: "contrast", name: "Contrast" },
] as const;

type FilterOption = (typeof filterOptions)[number]["id"];

const filterValues = {
  normal: "",
  grayscale: "grayscale(100%)",
  sepia: "sepia(100%)",
  invert: "invert(100%)",
  saturate: "saturate(200%)",
  "hue-rotate": "hue-rotate(180deg)",
  brightness: "brightness(150%)",
  contrast: "contrast(200%)",
};

export function ColorFilter() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("normal");

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

      ctx.filter = filterValues[selectedFilter];
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download =
            imageFile.name.replace(/\.[^/.]+$/, "") + "_filtered.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    };
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setSelectedFilter("normal");
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="Image Filter"
        description="Apply beautiful filters to your images. Choose from a variety of effects like grayscale, sepia, and more."
        icon={<PaletteIcon className="h-6 w-6" />}
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
              style={{ filter: filterValues[selectedFilter] }}
            />
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.optionsGrid}>
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedFilter === option.id
                      ? "border-2 border-blue-500 bg-white/5"
                      : "border border-white/20 hover:border-white/40"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
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
