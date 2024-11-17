"use client";

import { styles } from "../ui/styles";

interface ToolDescriptionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function ToolDescription({ title, description, icon }: ToolDescriptionProps) {
  return (
    <div className={styles.toolDescription}>
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white/60">
            {icon}
          </div>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      <p className="text-white/60 max-w-2xl">{description}</p>
    </div>
  );
}
