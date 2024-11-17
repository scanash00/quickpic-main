"use client";

import { Download } from "lucide-react";
import { styles } from "../ui/styles";

interface ActionButtonsProps {
  onDownload: () => void;
  onCancel: () => void;
  downloadText: string;
}

export function ActionButtons({ onDownload, onCancel, downloadText }: ActionButtonsProps) {
  return (
    <div className={styles.buttonsContainer}>
      <button
        type="button"
        className={`${styles.primaryButton} ${styles.glowHover}`}
        onClick={onDownload}
      >
        <Download className="h-5 w-5" />
        <span>{downloadText}</span>
      </button>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={onCancel}
      >
        Choose Another Image
      </button>
    </div>
  );
}
