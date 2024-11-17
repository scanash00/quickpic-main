"use client";

import { Check } from "lucide-react";

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
    <div className="animate-fade-in flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/60">{label}</label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.label}
              type="button"
              className={`relative flex items-center justify-center rounded-lg border-2 p-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                isSelected
                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                  : "border-white/20 bg-white/10 text-white/80 hover:border-white/30 hover:bg-white/20"
              } `}
              onClick={() => onChange(option.value)}
            >
              <span className="text-sm font-medium">{option.label}</span>
              {isSelected && (
                <div className="animate-fade-in absolute right-2 text-blue-300">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
