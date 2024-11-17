"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { UploadBox } from "@/components/shared/upload-box";
import { OptionSelector } from "@/components/shared/option-selector";
import {
  type FileUploaderResult,
  useFileUploader,
} from "@/hooks/use-file-uploader";

type Filter = "grayscale" | "sepia" | "invert" | "blur" | "none";

const filterOptions = [
  { label: "None", value: "none" as Filter },
  { label: "Grayscale", value: "grayscale" as Filter },
  { label: "Sepia", value: "sepia" as Filter },
  { label: "Invert", value: "invert" as Filter },
  { label: "Blur", value: "blur" as Filter },
];

const filterStyles: Record<Filter, React.CSSProperties> = {
  none: {},
  grayscale: { filter: "grayscale(100%)" },
  sepia: { filter: "sepia(100%)" },
  invert: { filter: "invert(100%)" },
  blur: { filter: "blur(5px)" },
};

function FilterToolCore(props: { fileUploaderProps: FileUploaderResult }) {
  const [filter, setFilter] = useLocalStorage<Filter>("filter", "none");

  return (
    <div className="flex flex-col items-center gap-8 p-6">
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
        <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
          <OptionSelector
            label="Filter"
            value={filter}
            onChange={setFilter}
            options={filterOptions}
          />
          
          <div className="relative w-full rounded-lg border border-gray-200 bg-white p-4">
            <img
              src={props.fileUploaderProps.file.content}
              alt="Preview"
              className="mx-auto max-h-[500px] w-full object-contain"
              style={filterStyles[filter]}
            />
            <div className="absolute top-2 right-2">
              <div className="rounded-md bg-gray-900/80 px-3 py-1.5 text-xs text-white backdrop-blur">
                {props.fileUploaderProps.file.metadata.width} x {props.fileUploaderProps.file.metadata.height}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-200 active:bg-gray-300"
              onClick={props.fileUploaderProps.cancel}
            >
              Choose Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterTool() {
  const fileUploaderProps = useFileUploader();
  return <FilterToolCore fileUploaderProps={fileUploaderProps} />;
}
