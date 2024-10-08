import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="relative aspect-square w-10">
                <Image
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span>Guest area</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
