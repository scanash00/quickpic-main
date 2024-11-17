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
    <div className="flex flex-col gap-2 animate-fade-in">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.label}
              type="button"
              className={`
                relative flex items-center justify-center p-3 rounded-lg border-2
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-800' 
                  : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                }
              `}
              onClick={() => onChange(option.value)}
            >
              <span className="text-sm font-medium">{option.label}</span>
              {isSelected && (
                <div className="absolute right-2 text-blue-500 animate-fade-in">
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
