"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

const effectPresets = [
  { id: "original", name: "Original" },
  { id: "vintage", name: "Vintage", filters: "sepia(0.5) brightness(0.9) contrast(1.1)" },
  { id: "noir", name: "Noir", filters: "grayscale(1) contrast(1.2) brightness(0.9)" },
  { id: "chrome", name: "Chrome", filters: "brightness(1.1) contrast(1.1) saturate(1.2)" },
  { id: "fade", name: "Fade", filters: "brightness(1.1) saturate(0.8) opacity(0.9)" },
  { id: "warm", name: "Warm", filters: "sepia(0.3) brightness(1.1) saturate(1.1)" },
  { id: "cool", name: "Cool", filters: "brightness(1.1) saturate(1.2) hue-rotate(10deg)" },
  { id: "vivid", name: "Vivid", filters: "contrast(1.2) saturate(1.3)" },
] as const;

type EffectPreset = typeof effectPresets[number]["id"];

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
}

export function EffectsTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<EffectPreset>("original");
  const [adjustments, setAdjustments] = useState<Adjustments>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
  });

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

  const getFilterStyle = () => {
    const preset = effectPresets.find((p) => p.id === selectedEffect);
    if (preset?.filters) {
      return preset.filters;
    }

    return `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%) blur(${adjustments.blur}px)`;
  };

  const handleAdjustmentChange = (
    key: keyof Adjustments,
    value: number
  ) => {
    setSelectedEffect("original");
    setAdjustments((prev) => ({
      ...prev,
      [key]: value,
    }));
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

      ctx.filter = getFilterStyle();
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = imageFile.name.replace(/\.[^/.]+$/, "") + "_effect.jpg";
            a.click();
            URL.revokeObjectURL(url);
          }
        },
        "image/jpeg",
        0.9
      );
    };
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setSelectedEffect("original");
    setAdjustments({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
    });
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="Image Effects"
        description="Apply beautiful filters and adjustments to your images. Perfect for enhancing photos with professional-looking effects."
        icon={<Sparkles className="h-6 w-6" />}
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
              style={{ filter: getFilterStyle() }}
            />
          </div>

          <div className={styles.optionGrid}>
            {effectPresets.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setSelectedEffect(effect.id)}
                className={`${styles.optionButton.base} ${
                  selectedEffect === effect.id
                    ? styles.optionButton.selected
                    : styles.optionButton.unselected
                }`}
              >
                {effect.name}
              </button>
            ))}
          </div>

          {selectedEffect === "original" && (
            <div className={styles.controlsContainer}>
              <div>
                <label htmlFor="brightness" className={styles.label}>
                  Brightness: {adjustments.brightness}%
                </label>
                <input
                  id="brightness"
                  type="range"
                  min="0"
                  max="200"
                  value={adjustments.brightness}
                  onChange={(e) =>
                    handleAdjustmentChange("brightness", Number(e.target.value))
                  }
                  className={styles.slider}
                />
              </div>

              <div>
                <label htmlFor="contrast" className={styles.label}>
                  Contrast: {adjustments.contrast}%
                </label>
                <input
                  id="contrast"
                  type="range"
                  min="0"
                  max="200"
                  value={adjustments.contrast}
                  onChange={(e) =>
                    handleAdjustmentChange("contrast", Number(e.target.value))
                  }
                  className={styles.slider}
                />
              </div>

              <div>
                <label htmlFor="saturation" className={styles.label}>
                  Saturation: {adjustments.saturation}%
                </label>
                <input
                  id="saturation"
                  type="range"
                  min="0"
                  max="200"
                  value={adjustments.saturation}
                  onChange={(e) =>
                    handleAdjustmentChange("saturation", Number(e.target.value))
                  }
                  className={styles.slider}
                />
              </div>

              <div>
                <label htmlFor="blur" className={styles.label}>
                  Blur: {adjustments.blur}px
                </label>
                <input
                  id="blur"
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={adjustments.blur}
                  onChange={(e) =>
                    handleAdjustmentChange("blur", Number(e.target.value))
                  }
                  className={styles.slider}
                />
              </div>
            </div>
          )}

          <div className={styles.buttonsContainer}>
            <button onClick={handleDownload} className={styles.primaryButton}>
              Download Effect
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
