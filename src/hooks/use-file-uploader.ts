"use client";

import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";

export interface FileMetadata {
  width: number;
  height: number;
  name: string;
  size: number;
}

export interface FileData {
  content: string;
  metadata: FileMetadata;
}

export interface FileUploaderResult {
  file: FileData | null;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDrop: (files: File[]) => Promise<void>;
  cancel: () => void;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        img.src = e.target.result as string;
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}

function validateFile(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File must be an image"));
    }

    if (file.size > 10 * 1024 * 1024) {
      reject(new Error("File size must be less than 10MB"));
    }

    resolve();
  });
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}

export function useFileUploader(): FileUploaderResult {
  const [file, setFile] = useState<FileData | null>(null);

  const processFile = useCallback(async (file: File): Promise<void> => {
    try {
      await validateFile(file);
      const [dimensions, content] = await Promise.all([
        getImageDimensions(file),
        readFileAsDataURL(file),
      ]);

      setFile({
        content,
        metadata: {
          ...dimensions,
          name: file.name,
          size: file.size,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to process file");
    }
  }, []);

  const handleFileUpload = useCallback(async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      throw new Error("No file selected");
    }
    const selectedFile = files[0];
    if (!selectedFile) {
      throw new Error("No file selected");
    }
    await processFile(selectedFile);
  }, [processFile]);

  const handleDrop = useCallback(async (files: File[]): Promise<void> => {
    if (files.length === 0) {
      throw new Error("No file dropped");
    }
    const selectedFile = files[0];
    if (!selectedFile) {
      throw new Error("No file dropped");
    }
    await processFile(selectedFile);
  }, [processFile]);

  const cancel = useCallback(() => {
    setFile(null);
  }, []);

  return {
    file,
    handleFileUpload,
    handleDrop,
    cancel,
  };
}
