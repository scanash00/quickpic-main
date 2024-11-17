"use client";

import { styles } from "../ui/styles";
import { type FileMetadata } from "@/hooks/use-file-uploader";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  metadata: FileMetadata;
  style?: React.CSSProperties;
}

export function ImagePreview({ src, alt = "Preview", metadata, style }: ImagePreviewProps) {
  return (
    <div className={styles.imageContainer}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        style={style}
      />
      <div className={styles.imageDimensions}>
        {metadata.width} x {metadata.height}
      </div>
    </div>
  );
}
