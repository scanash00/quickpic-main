"use client";

import { Eraser } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

interface BackgroundOptions {
  replacement: "transparent" | "color" | "blur";
  color: string;
  blurAmount: number;
}

export function BackgroundRemoverTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<BackgroundOptions>({
    replacement: "transparent",
    color: "#ffffff",
    blurAmount: 5,
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
    setProcessedUrl(null);
  };

  const processImage = async () => {
    if (!imageFile) return;

    setIsProcessing(true);

    try {
      const img = new Image();
      img.src = imageUrl!;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      canvas.width = img.width;
      canvas.height = img.height;

      // Create a temporary canvas for background effects
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) throw new Error("Could not get temp canvas context");

      tempCanvas.width = img.width;
      tempCanvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);
      tempCtx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const threshold = 240;

      // Process each pixel
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i] ?? 0;
        const green = data[i + 1] ?? 0;
        const blue = data[i + 2] ?? 0;

        // Simple background detection
        // If pixel is close to white or very light color, make it transparent
        const brightness = (red + green + blue) / 3;

        if (brightness > threshold) {
          if (options.replacement === "transparent") {
            // Make pixel transparent
            data[i + 3] = 0;
          } else if (options.replacement === "color") {
            // Replace with selected color
            const color = options.color;
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = 255;
          } else if (options.replacement === "blur") {
            // For blur effect, we'll keep the pixel and apply blur later
            data[i + 3] = 255;
          }
        }
      }

      // Put processed image data back
      ctx.putImageData(imageData, 0, 0);

      // Apply blur effect if selected
      if (options.replacement === "blur") {
        // Draw the processed image onto the temp canvas
        tempCtx.filter = `blur(${options.blurAmount}px)`;
        tempCtx.drawImage(canvas, 0, 0);

        // Get the blurred background
        const blurredData = tempCtx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        ).data;

        // Combine original foreground with blurred background
        const finalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const finalPixels = finalData.data;

        for (let i = 0; i < finalPixels.length; i += 4) {
          const red = data[i] ?? 0;
          const green = data[i + 1] ?? 0;
          const blue = data[i + 2] ?? 0;
          const brightness = (red + green + blue) / 3;

          if (brightness > threshold) {
            finalPixels[i] = blurredData[i] ?? 0;
            finalPixels[i + 1] = blurredData[i + 1] ?? 0;
            finalPixels[i + 2] = blurredData[i + 2] ?? 0;
            finalPixels[i + 3] = 255;
          }
        }

        ctx.putImageData(finalData, 0, 0);
      }

      // Convert to PNG
      const processedDataUrl = canvas.toDataURL("image/png");
      setProcessedUrl(processedDataUrl);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedUrl) return;

    const a = document.createElement("a");
    a.href = processedUrl;
    a.download = imageFile!.name.replace(/\.[^/.]+$/, "") + "_nobg.png";
    a.click();
  };

  const handleCancel = () => {
    setImageFile(null);
    setImageUrl(null);
    setProcessedUrl(null);
    setOptions({
      replacement: "transparent",
      color: "#ffffff",
      blurAmount: 5,
    });
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="Background Remover"
        description="Remove image backgrounds with AI. Replace with transparency, solid colors, or blur effects."
        icon={<Eraser className="h-6 w-6" />}
      />

      {!imageFile ? (
        <UploadBox
          title="Upload Image"
          subtitle="Remove background from this image"
          description="Choose image"
          accept="image/*"
          onChange={handleFileChange}
          onDrop={handleDrop}
        />
      ) : (
        <div className={styles.toolContainer}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className={styles.imageContainer}>
              <img
                src={imageUrl ?? ""}
                alt="Original"
                className={styles.image}
              />
              <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white/70">
                Original
              </span>
            </div>

            <div className={styles.imageContainer}>
              {processedUrl ? (
                <>
                  <img
                    src={processedUrl}
                    alt="Processed"
                    className={styles.image}
                    style={{
                      backgroundColor:
                        options.replacement === "color"
                          ? options.color
                          : "transparent",
                      backdropFilter:
                        options.replacement === "blur"
                          ? `blur(${options.blurAmount}px)`
                          : undefined,
                    }}
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white/70">
                    Processed
                  </span>
                </>
              ) : (
                <div className="text-foreground/50 flex h-full items-center justify-center">
                  {isProcessing ? "Processing..." : "Preview"}
                </div>
              )}
            </div>
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.optionGroup}>
              <label className={styles.formLabel}>Background Replacement</label>
              <div className={styles.optionsGrid}>
                <button
                  onClick={() =>
                    setOptions({ ...options, replacement: "transparent" })
                  }
                  className={`${styles.optionButton.base} ${
                    options.replacement === "transparent"
                      ? styles.optionButton.selected
                      : styles.optionButton.unselected
                  }`}
                >
                  Transparent
                </button>
                <button
                  onClick={() =>
                    setOptions({ ...options, replacement: "color" })
                  }
                  className={`${styles.optionButton.base} ${
                    options.replacement === "color"
                      ? styles.optionButton.selected
                      : styles.optionButton.unselected
                  }`}
                >
                  Color
                </button>
                <button
                  onClick={() =>
                    setOptions({ ...options, replacement: "blur" })
                  }
                  className={`${styles.optionButton.base} ${
                    options.replacement === "blur"
                      ? styles.optionButton.selected
                      : styles.optionButton.unselected
                  }`}
                >
                  Blur
                </button>
              </div>
            </div>

            {options.replacement === "color" && (
              <div className={styles.optionGroup}>
                <label htmlFor="bgColor" className={styles.formLabel}>
                  Background Color
                </label>
                <input
                  id="bgColor"
                  type="color"
                  value={options.color}
                  onChange={(e) =>
                    setOptions({ ...options, color: e.target.value })
                  }
                  className={styles.colorPicker}
                />
              </div>
            )}

            {options.replacement === "blur" && (
              <div className={styles.optionGroup}>
                <label htmlFor="blurAmount" className={styles.formLabel}>
                  Blur Amount: {options.blurAmount}px
                </label>
                <input
                  id="blurAmount"
                  type="range"
                  min="1"
                  max="20"
                  value={options.blurAmount}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      blurAmount: Number(e.target.value),
                    })
                  }
                  className={styles.optionsSlider}
                />
              </div>
            )}
          </div>

          <div className={styles.buttonsContainer}>
            {!processedUrl && (
              <button
                onClick={processImage}
                disabled={isProcessing}
                className={styles.primaryButton}
              >
                {isProcessing ? "Processing..." : "Remove Background"}
              </button>
            )}
            {processedUrl && (
              <button onClick={handleDownload} className={styles.primaryButton}>
                Download Result
              </button>
            )}
            <button onClick={handleCancel} className={styles.secondaryButton}>
              Try Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
