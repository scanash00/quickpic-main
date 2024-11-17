"use client";

import { Download } from "lucide-react";
import { styles } from "../ui/styles";

interface ActionButtonsProps {
  onDownload: () => void;
  onReset: () => void;
  downloadText: string;
}

export function ActionButtons({
  onDownload,
  onReset,
  downloadText,
}: ActionButtonsProps) {
  return (
    <div className={styles.buttonsContainer}>
      <button
        type="button"
        className={styles.primaryButton}
        onClick={onDownload}
      >
        <Download className="h-5 w-5" />
        <span>{downloadText}</span>
      </button>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={onReset}
      >
        Choose Another Image
      </button>
    </div>
  );
}
