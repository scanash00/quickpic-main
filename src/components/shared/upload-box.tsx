"use client";

import { useEffect, useRef, useState } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <FileDropzone
      acceptedFileTypes={[accept]}
      dropText="Drop your image here"
      setCurrentFile={(file) => onDrop([file])}
    >
      <div className={styles.uploadBox.container}>
        <div 
          ref={cardRef}
          className={`${styles.uploadBox.inner} group`}
          style={{ 
            transform: isHovered 
              ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            transition: isHovered ? 'transform 0.1s' : 'transform 0.5s',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <div className={styles.uploadBox.iconContainer}>
            <UploadCloud className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h2 className={styles.uploadBox.title}>{title}</h2>
            <p className={styles.uploadBox.subtitle}>{subtitle}</p>
          </div>
          <div className={styles.uploadBox.buttonContainer}>
            <span className={styles.uploadBox.dragText}>Drag and drop, paste, or</span>
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
            className={styles.hidden}
            accept={accept}
            onChange={onChange}
          />
        </div>
      </div>
    </FileDropzone>
  );
}
