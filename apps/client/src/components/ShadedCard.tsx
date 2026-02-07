import React from "react";
import { shadedBorders } from "../utils/color";

export const ShadedCard: React.FC<{ color: string, children: React.ReactNode }> = ({ color, children }) => {
  return (
    <div
      className="border-5 border-radius-2 card-shadow p-1"
      style={{
        backgroundColor: color,
        ...shadedBorders(color, 50)
      }}
    >
      {children}
    </div>
  );
};
