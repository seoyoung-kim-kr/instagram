import React from "react";

type Props = {
  text: string | React.ReactNode;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
  variant?: "blue" | "white"; // Defaults to "blue"
};

export default function Button({
  text,
  onClick,
  red,
  disabled,
  variant = "blue",
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center min-w-28 text-sm font-semibold py-1.5 px-6 rounded-lg transition-all duration-200 border cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed ${
        red
          ? "bg-red-500 hover:bg-red-600 text-white border-transparent"
          : variant === "white"
            ? "bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200"
            : "bg-blue-500 hover:bg-blue-600 text-white border-transparent"
      }`}
    >
      {text}
    </button>
  );
}
