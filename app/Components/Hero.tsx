import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Scene from "./three/Scene";
import TiltCard from "./TiltCard";

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

const stats = [
  { value: "3+", label: "Years building" },
  { value: "20+", label: "Projects shipped" },
  { value: "100%", label: "Responsive" },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8">
      {/* WebGL particle sphere — loaded after hydration, on capable devices */}
      <Scene />

      {/* Scrim over the canvas: keeps the headline readable on the left while
          the sphere still glows behind the portrait on the right. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,hsl(var(--background))_6%,hsl(var(--background)/0.55)_30%,transparent_58%)]" />

      {/* Gradient floor, drawn over the canvas so the section blends downward */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyan))]" />
            Available for work
          </span>

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            I build <span className="gradient-text">frontend</span>
            <br />
            people enjoy using.
          </h1>

          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            I&apos;m Vikram — a self-motivated developer specialising in frontend
            engineering with HTML, CSS, TypeScript, React and Next.js. I also build
            AI-powered products like chatbots and generative web apps.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-11 rounded-full bg-foreground px-6 text-background hover:opacity-90"
            >
              <Link href="/#contact">Start a project</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-white/15 bg-white/[0.04] px-6 hover:bg-white/10"
            >
              <Link href="/#projects">View my work</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-semibold tracking-tight">{stat.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <TiltCard className="mx-auto w-full max-w-sm" max={10}>
          <div className="glass relative p-4">
            <div className="tilt-layer-sm relative overflow-hidden rounded-xl">
              <Image
                src="/images/img.jpg"
                alt="Portrait of Vikram"
                width={600}
                height={720}
                priority
                sizes="(max-width: 1024px) 80vw, 380px"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating chips lifted on the Z axis so they separate as it tilts */}
            <div className="tilt-layer absolute -left-4 top-24 rounded-xl border border-white/10 bg-background/80 px-3 py-2 text-xs backdrop-blur-md">
              <span className="text-[hsl(var(--cyan))]">●</span> Next.js
            </div>
            <div className="tilt-layer absolute -right-3 top-52 rounded-xl border border-white/10 bg-background/80 px-3 py-2 text-xs backdrop-blur-md">
              <span className="text-[hsl(var(--violet))]">●</span> TypeScript
            </div>

            <div className="tilt-layer-sm mt-4 flex items-center justify-between px-2 pb-1">
              <div>
                <p className="text-sm font-semibold">Vikram Singh</p>
                <p className="text-xs text-muted-foreground">Frontend Developer</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted-foreground">
                Remote
              </span>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
