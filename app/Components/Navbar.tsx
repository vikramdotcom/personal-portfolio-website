"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contacts", label: "Contact" },
  { href: "/hire-me", label: "Hire me" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "my-3 rounded-2xl border border-white/10 bg-background/70 py-3 backdrop-blur-xl"
            : "my-4 border border-transparent py-4"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[hsl(var(--violet))] to-[hsl(var(--cyan))] text-sm font-bold text-background transition-transform duration-300 group-hover:rotate-12">
            VS
          </span>
          <span className="text-lg font-semibold tracking-tight">
            P.<span className="gradient-text">Folio</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="ml-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Let&apos;s talk
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-foreground transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-5 bg-foreground transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`mx-4 overflow-hidden rounded-2xl border border-white/10 bg-background/90 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-80 opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col p-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
