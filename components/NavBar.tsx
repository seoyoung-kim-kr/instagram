"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import HomeIcon from "./ui/icons/HomeIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import NewIcon from "./ui/icons/NewIcon";
import GradientBtn from "./GradientBtn";
import Avartar from "./Avartar";

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
  },
  {
    href: "/new",
    icon: <NewIcon />,
  },
];

export default function NavBar() {
  const currentPage = usePathname();
  const { data: session, status } = useSession();

  const userImage = session?.user?.image ?? null;
  const userName = session?.user?.username ?? null;

  const base =
    "flex items-center justify-center rounded-lg p-2 transition duration-150 text-gray-500";
  const normal = `${base} hover:bg-gray-100 hover:text-slate-900`;
  const activeCls = `${base} bg-gray-100 text-slate-900`;

  return (
    <div className="flex justify-between items-center px-10 h-16 sticky top-0 bg-white z-10 border-b border-slate-200">
      <Link href="/">
        <h1 className="font-bold text-lg">Instagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center justify-center gap-x-4">
          {menu.map(({ href, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={currentPage === href ? activeCls : normal}
                aria-label={href}
              >
                {icon}
              </Link>
            </li>
          ))}
          {status === "loading" ? (
            <GradientBtn text="Loading..." disabled />
          ) : session ? (
            <>
              <Link href={`/user/${userName}`}>
                <Avartar image={userImage} />
              </Link>
              <GradientBtn text="Sign out" onClick={() => signOut()} />
            </>
          ) : (
            <Link href="/sign-in">
              <GradientBtn text="Sign in" />
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
