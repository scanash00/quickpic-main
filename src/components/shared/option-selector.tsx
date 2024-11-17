"use client";

import { useEffect, useRef } from "react";

interface Option<T> {
  label: string;
  value: T;
}

interface OptionSelectorProps<T> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
}

export function OptionSelector<T>({
  label,
  value,
  onChange,
  options,
}: OptionSelectorProps<T>) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm font-medium text-gray-200">{label}</label>
      <select
        value={String(value)}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => String(opt.value) === e.target.value
          );
          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
        className="rounded-lg bg-white/10 px-4 py-2 text-white"
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
