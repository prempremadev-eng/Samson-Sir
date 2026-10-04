"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Chat" },
  { href: "/dashboard/", label: "Dashboard" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4 border-b px-4 py-3 text-sm">
      <span className="font-semibold">SupportBot</span>
      {links.map((l) => {
        const active = l.href === "/" ? pathname === "/" : pathname.startsWith("/dashboard");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={active ? "font-medium underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
