"use client";

import { styles } from "../ui/styles";

interface ToolDescriptionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function ToolDescription({
  title,
  description,
  icon,
}: ToolDescriptionProps) {
  return (
    <div className={styles.toolDescription}>
      <div className="mb-2 flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/60">
            {icon}
          </div>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      <p className="max-w-2xl text-white/60">{description}</p>
    </div>
  );
}
