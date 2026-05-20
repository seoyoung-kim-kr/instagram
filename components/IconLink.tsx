"use client";

import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function IconLink({
  href,
  children,
  active,
  className,
  ariaLabel,
}: Props) {
  const base =
    "flex items-center justify-center rounded-lg p-2 transition duration-150 text-gray-500";
  const normal = `${base} hover:bg-gray-100 hover:text-slate-900`;
  const activeCls = `${base} bg-gray-100 text-slate-900`;
  const cls = `${active ? activeCls : normal} ${className ?? ""}`.trim();

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
