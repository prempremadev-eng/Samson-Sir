"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Headset, LayoutDashboard, MessageSquare } from "lucide-react";

const links = [
  { href: "/", label: "Chat", icon: MessageSquare },
  { href: "/dashboard/", label: "Dashboard", icon: LayoutDashboard },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-white/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Headset className="size-4.5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">SupportBot</span>
            <span className="block text-xs text-slate-500">Customer Care</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith("/dashboard");
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
