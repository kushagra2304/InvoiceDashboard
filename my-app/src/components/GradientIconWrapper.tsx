import React from "react";

export function GradientIconWrapper({ children, size = 32 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded"
      style={{ width: size, height: size }}
    >
      <div className="text-white w-4 h-4">{children}</div>
    </div>
  );
}
