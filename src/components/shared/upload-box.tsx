"use client";

import { useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { FileDropzone } from "./file-dropzone";
import { styles } from "../ui/styles";

interface UploadBoxProps {
  title: string;
  subtitle: string;
  description: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (files: File[]) => void;
}

export function UploadBox({
  title,
  subtitle,
  description,
  accept,
  onChange,
  onDrop,
}: UploadBoxProps) {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.includes("image")) {
          const file = item.getAsFile();
          if (file) {
            onDrop([file]);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [onDrop]);

  return (
    <FileDropzone
      acceptedFileTypes={[accept]}
      dropText="Drop your image here"
      setCurrentFile={(file) => onDrop([file])}
    >
      <div className={styles.uploadBox.container}>
        <div className={styles.uploadBox.inner}>
          <div className={styles.uploadBox.iconContainer}>
            <UploadCloud className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h2 className={styles.uploadBox.title}>{title}</h2>
            <p className={styles.uploadBox.subtitle}>{subtitle}</p>
          </div>
          <div className={styles.uploadBox.buttonContainer}>
            <span className={styles.uploadBox.dragText}>
              Drag and drop, paste, or
            </span>
            <button
              type="button"
              className={styles.uploadBox.uploadButton}
              onClick={() => document.querySelector("input")?.click()}
            >
              {description}
            </button>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={onChange}
          />
        </div>
      </div>
    </FileDropzone>
  );
}
