"use client";

import { styles } from "@/components/ui/styles";
import { UploadBox } from "@/components/shared/upload-box";
import { ImagePreview } from "@/components/shared/image-preview";
import { ActionButtons } from "@/components/shared/action-buttons";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";

function RoundedToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [radius, setRadius] = useLocalStorage("radius", 16);

  const handleDownload = async () => {
    if (!props.fileUploaderProps.file) return;

    const img = new Image();
    img.src = props.fileUploaderProps.file.content;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a rounded rectangle path
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(canvas.width - radius, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
    ctx.lineTo(canvas.width, canvas.height - radius);
    ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
    ctx.lineTo(radius, canvas.height);
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();

    // Clip to the rounded rectangle
    ctx.clip();

    // Draw the image
    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    const fileName = props.fileUploaderProps.file.metadata.name;
    const baseName = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    link.download = `${baseName}-rounded.png`;
    link.click();
  };

  return (
    <div className={styles.container}>
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="Rounded Border"
          subtitle="Add rounded corners to your images"
          description="Choose Image"
          accept="image/*"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className={styles.toolContainer}>
          <div className={styles.controlsContainer}>
            <label className={styles.label}>
              Border Radius
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>{radius}px</div>
          </div>

          <ImagePreview
            src={props.fileUploaderProps.file.content}
            metadata={props.fileUploaderProps.file.metadata}
            style={{ borderRadius: `${radius}px` }}
          />

          <ActionButtons
            onDownload={handleDownload}
            onCancel={props.fileUploaderProps.cancel}
            downloadText="Download Rounded Image"
          />
        </div>
      )}
    </div>
  );
}

export function RoundedBorder() {
  const fileUploaderProps = useFileUploader();
  return <RoundedToolCore fileUploaderProps={fileUploaderProps} />;
}
