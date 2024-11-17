"use client";

import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { ToolDescription } from "@/components/shared/tool-description";
import { UploadBox } from "@/components/shared/upload-box";
import { styles } from "@/components/ui/styles";

export function SvgToPng() {
  const [svgFile, setSvgFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    setSvgFile(file);
    setLoading(true);

    try {
      const svgText = await file.text();
      const img = new Image();
      const svg = new Blob([svgText], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svg);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const pngUrl = URL.createObjectURL(blob);
              setPngUrl(pngUrl);
              setLoading(false);
            }
          }, "image/png");
        }
      };

      img.src = url;
    } catch (error) {
      console.error("Error converting SVG to PNG:", error);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (pngUrl && svgFile) {
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = svgFile.name.replace(/\.svg$/, ".png");
      a.click();
    }
  };

  const handleCancel = () => {
    setSvgFile(null);
    setPngUrl(null);
  };

  return (
    <div className={styles.container}>
      <ToolDescription
        title="SVG to PNG Converter"
        description="Convert your SVG files to high-quality PNG images. Perfect for when you need bitmap versions of your vector graphics."
        icon={<ImageIcon className="h-6 w-6" />}
      />

      {!svgFile ? (
        <UploadBox
          title="Upload SVG"
          subtitle="PNG conversion will start automatically"
          description="Choose SVG file"
          accept=".svg"
          onChange={handleFileChange}
          onDrop={handleDrop}
        />
      ) : (
        <div className={styles.toolContainer}>
          {pngUrl && (
            <div className={styles.imageContainer}>
              <img src={pngUrl} alt="Converted PNG" className={styles.image} />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white">Converting...</div>
                </div>
              )}
            </div>
          )}

          <div className={styles.buttonsContainer}>
            <button
              onClick={handleDownload}
              disabled={!pngUrl || loading}
              className={styles.primaryButton}
            >
              Download PNG
            </button>
            <button onClick={handleCancel} className={styles.secondaryButton}>
              Convert Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
