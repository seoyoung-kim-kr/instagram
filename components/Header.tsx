"use client";

import { GrInstagram } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";
import GradientLink from "./GradientLink";
import IconLink from "./IconLink";

const iconSize = 24;

export default function Header() {
  const currentPage = usePathname();

  return (
    <header className="flex justify-between items-center px-10 h-16 sticky top-0 bg-white z-10 border-b border-slate-200">
      {/* Logo */}
      <div>
        <IconLink href="/" ariaLabel="Home" className="p-1">
          <GrInstagram size={28} />
        </IconLink>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-x-4">
        {/* Home */}
        <IconLink href="/" active={currentPage === "/"} ariaLabel="Home">
          <FaHome size={iconSize} />
        </IconLink>

        {/* Search */}
        <IconLink
          href="/search"
          active={currentPage === "/search"}
          ariaLabel="Search"
        >
          <FaSearch size={iconSize} />
        </IconLink>

        {/* New */}
        <IconLink
          href="/new"
          active={currentPage === "/new"}
          ariaLabel="New post"
        >
          <FaPlus size={iconSize} />
        </IconLink>

        {/* Sign In */}
        <GradientLink href="/signin" text="Sign In" />
      </div>
    </header>
  );
}
