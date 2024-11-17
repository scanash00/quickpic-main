"use client";

import { styles } from "@/components/ui/styles";
import { UploadBox } from "@/components/shared/upload-box";
import { ImagePreview } from "@/components/shared/image-preview";
import { ActionButtons } from "@/components/shared/action-buttons";
import { OptionSelector } from "@/components/shared/option-selector";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";

type Filter = "none" | "grayscale" | "sepia" | "invert" | "blur" | "saturate" | "brightness" | "contrast";

const filterStyles: Record<Filter, React.CSSProperties> = {
  none: {},
  grayscale: { filter: "grayscale(100%)" },
  sepia: { filter: "sepia(100%)" },
  invert: { filter: "invert(100%)" },
  blur: { filter: "blur(5px)" },
  saturate: { filter: "saturate(200%)" },
  brightness: { filter: "brightness(150%)" },
  contrast: { filter: "contrast(200%)" },
};

const filterOptions = [
  { label: "None", value: "none" },
  { label: "Grayscale", value: "grayscale" },
  { label: "Sepia", value: "sepia" },
  { label: "Invert", value: "invert" },
  { label: "Blur", value: "blur" },
  { label: "Saturate", value: "saturate" },
  { label: "Brightness", value: "brightness" },
  { label: "Contrast", value: "contrast" },
];

function FilterToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [filter, setFilter] = useLocalStorage<Filter>("filter", "none");

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

    ctx.filter = filterStyles[filter].filter || "none";
    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    const fileName = props.fileUploaderProps.file.metadata.name;
    const baseName = fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    link.download = `${baseName}-${filter}.png`;
    link.click();
  };

  return (
    <div className={styles.container}>
      {!props.fileUploaderProps.file ? (
        <UploadBox
          title="Image Filter"
          subtitle="Apply filters to your images"
          description="Choose Image"
          accept="image/*"
          onChange={props.fileUploaderProps.handleFileUpload}
          onDrop={props.fileUploaderProps.handleDrop}
        />
      ) : (
        <div className={styles.toolContainer}>
          <OptionSelector
            label="Filter"
            value={filter}
            onChange={setFilter}
            options={filterOptions}
          />
          
          <ImagePreview
            src={props.fileUploaderProps.file.content}
            metadata={props.fileUploaderProps.file.metadata}
            style={filterStyles[filter]}
          />

          <ActionButtons
            onDownload={handleDownload}
            onCancel={props.fileUploaderProps.cancel}
            downloadText={`Download ${filter !== "none" ? filter : ""} Image`}
          />
        </div>
      )}
    </div>
  );
}

export function FilterTool() {
  const fileUploaderProps = useFileUploader();
  return <FilterToolCore fileUploaderProps={fileUploaderProps} />;
}
