import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  count?: number | string;
};

export default function ActionButton({ children, onClick, count }: Props) {
  return (
    <div className="flex items-center gap-x-1">
      <button
        type="button"
        onClick={onClick}
        className="hover:opacity-60 transition-opacity outline-none"
      >
        {children}
      </button>
      {count !== undefined && (
        <span className="font-bold text-sm">{count}</span>
      )}
    </div>
  );
}
