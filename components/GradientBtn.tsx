"use client";

import React from "react";

type Props = {
  text: string;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  disabled?: boolean;
};

export default function GradientBtn({
  text,
  className,
  onClick,
  ariaLabel,
  disabled,
}: Props) {
  const outerDefault =
    "rounded-lg bg-linear-to-r from-pink-200 via-pink-300 to-purple-400 p-0.5";
  const outerClass = `${outerDefault} ${className ?? ""}`.trim();
  const innerClass =
    "rounded-lg bg-pink-50 px-3 py-1.5 text-sm font-semibold hover:bg-pink-200 transition-colors duration-200 hover:text-white text-gray-700";

  return (
    <button
      type="button"
      onClick={onClick}
      className={outerClass}
      aria-label={ariaLabel ?? text}
      disabled={disabled}
    >
      <div className={innerClass}>{text}</div>
    </button>
  );
}
