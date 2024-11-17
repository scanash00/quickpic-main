"use client";

import { styles } from "@/components/ui/styles";
import { UploadBox } from "@/components/shared/upload-box";
import { ImagePreview } from "@/components/shared/image-preview";
import { ActionButtons } from "@/components/shared/action-buttons";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";

function SvgToolCore(props: { fileUploaderProps: FileUploaderResult }) {
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

    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    const fileName = props.fileUploaderProps.file.metadata.name;
    const baseName = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    link.download = `${baseName}.png`;
    link.click();
  };

  return (
    <div className={styles.container}>
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="SVG to PNG"
          subtitle="Convert SVG images to PNG format"
          description="Choose SVG"
          accept=".svg"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className={styles.toolContainer}>
          <ImagePreview
            src={props.fileUploaderProps.file.content}
            metadata={props.fileUploaderProps.file.metadata}
          />

          <ActionButtons
            onDownload={handleDownload}
            onCancel={props.fileUploaderProps.cancel}
            downloadText="Download PNG"
          />
        </div>
      )}
    </div>
  );
}

export function SvgToPng() {
  const fileUploaderProps = useFileUploader();
  return <SvgToolCore fileUploaderProps={fileUploaderProps} />;
}
