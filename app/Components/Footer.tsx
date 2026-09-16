import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    href: "https://www.linkedin.com/in/vikram-s-404839217",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  { href: "https://www.github.com/vikram-singh9", label: "GitHub", Icon: FaGithub },
  { href: "https://www.facebook.com/thaakur.saab", label: "Facebook", Icon: FaFacebook },
  {
    href: "https://www.instagram.com/vssodho_official",
    label: "Instagram",
    Icon: FaInstagram,
  },
];

const pages = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contacts", label: "Contact" },
  { href: "/hire-me", label: "Hire me" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[hsl(var(--violet))] to-[hsl(var(--cyan))] text-sm font-bold text-background">
                VS
              </span>
              <span className="text-lg font-semibold tracking-tight">
                P.<span className="gradient-text">Folio</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Frontend developer building fast, considered interfaces for the web.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Pages
            </p>
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {page.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Elsewhere
            </p>
            <div className="mt-3 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vikram Singh. All rights reserved.</p>
          <p>
            Designed &amp; built by <strong className="text-foreground">Vikram</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
