import React from "react";
import { shadedBorders } from "../utils/color";

export const ShadedCard: React.FC<{ color: string, children: React.ReactNode }> = ({ color, children }) => {
  const colors: any = {
    cyan: 'bg-cyan-500',
    green: 'bg-green-500'
  }

  const borderColors: any = {
    cyan: ['border-t-cyan-400', 'border-l-cyan-400', 'border-b-cyan-600', 'border-r-cyan-600'],
    green: ['border-t-green-400', 'border-l-green-400', 'border-b-green-600', 'border-r-green-600']
  }

  return (
    <div
      className={`border-5 rounded-xl ${colors[color]} p-3 ${borderColors[color].join(" ")}`}
    >
      {children}
    </div>
  );
};
