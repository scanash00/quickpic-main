import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import { useClipboardPaste } from "./use-clipboard-paste";

interface FileMetadata {
  width: number;
  height: number;
  name: string;
}

interface ProcessedFile {
  content: string;
  originalContent?: string;
  metadata: FileMetadata;
}

const parseSvgFile = (content: string, fileName: string): ProcessedFile => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(content, "image/svg+xml");
  const svgElement = svgDoc.documentElement;
  const width = parseInt(svgElement.getAttribute("width") ?? "300");
  const height = parseInt(svgElement.getAttribute("height") ?? "150");

  // Convert SVG content to a data URL
  const svgBlob = new Blob([content], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);

  return {
    content: svgUrl,
    originalContent: content,
    metadata: {
      width,
      height,
      name: fileName,
    },
  };
};

const parseImageFile = (
  content: string,
  fileName: string,
): Promise<ProcessedFile> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        content,
        metadata: {
          width: img.width,
          height: img.height,
          name: fileName,
        },
      });
    };
    img.src = content;
  });
};

export interface FileUploaderResult {
  file: ProcessedFile | null;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (files: File[]) => void;
  cancel: () => void;
}

/**
 * A hook for handling file uploads, particularly images and SVGs
 * @returns {FileUploaderResult} An object containing:
 * - file: The processed image content as a data URL (for regular images) or object URL (for SVGs)
 * - handleFileUpload: Function to handle file input change events
 * - handleDrop: Function to handle file drop events
 * - cancel: Function to reset the upload state
 */
export function useFileUploader(): FileUploaderResult {
  const [file, setFile] = useState<ProcessedFile | null>(null);

  const processFile = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      if (file.type === "image/svg+xml") {
        setFile(parseSvgFile(content, file.name));
      } else {
        const result = await parseImageFile(content, file.name);
        setFile(result);
      }
    };
    if (file.type === "image/svg+xml") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const cancel = useCallback(() => {
    setFile(null);
  }, []);

  useClipboardPaste({
    onPaste: processFile,
    acceptedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".webp", ".svg"],
  });

  return {
    file,
    handleFileUpload,
    handleDrop,
    cancel,
  };
}
