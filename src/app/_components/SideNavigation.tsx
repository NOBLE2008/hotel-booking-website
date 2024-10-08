"use client";
import { HiCalendarDays, HiHome, HiUser } from "react-icons/hi2";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "../_lib/action";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HiHome className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <HiCalendarDays className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <HiUser className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={pathname === link.href ? "bg-primary-900" : ""}
          >
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <form className="mt-auto" action={signOutAction}>
          <SignOutButton />
        </form>
      </ul>
    </nav>
  );
}

export default SideNavigation;
