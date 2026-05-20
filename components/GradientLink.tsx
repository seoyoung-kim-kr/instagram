"use client";

import Link from "next/link";

type Props = {
  href: string;
  text: string;
  className?: string;
  ariaLabel?: string;
};

export default function GradientLink({
  href,
  text,
  className,
  ariaLabel,
}: Props) {
  const outerDefault =
    "rounded-lg bg-linear-to-r from-pink-200 via-pink-300 to-purple-400 p-0.5";
  const outerClass = `${outerDefault} ${className ?? ""}`.trim();
  const innerClass =
    "rounded-lg bg-pink-50 px-3 py-1.5 text-sm font-semibold hover:bg-pink-200 transition-colors duration-200 hover:text-white text-gray-700";

  return (
    <Link href={href} className={outerClass} aria-label={ariaLabel ?? text}>
      <div className={innerClass}>{text}</div>
    </Link>
  );
}
