"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface UploadBoxProps {
  title: string;
  subtitle: string;
  description: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
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
  const onDragEnter = useCallback(() => {
    // Handle drag enter
  }, []);

  const onDragLeave = useCallback(() => {
    // Handle drag leave
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    accept: { [accept]: [] },
  });

  return (
    <div {...getRootProps()} className="w-full max-w-2xl mx-auto">
      <input {...getInputProps({ onChange })} />
      <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500">
          <UploadCloud className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:bg-blue-800"
            onClick={() => document.querySelector('input')?.click()}
          >
            {description}
          </button>
          <p className="text-sm text-gray-500">or drag and drop</p>
        </div>
      </div>
    </div>
  );
}
