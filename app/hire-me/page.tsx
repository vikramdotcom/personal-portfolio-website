import Link from "next/link";
import { Bot, Gauge, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageBackdrop from "../Components/three/PageBackdrop";
import Reveal from "../Components/Reveal";
import TiltCard from "../Components/TiltCard";

export const metadata = { title: "Hire me" };

const services = [
  {
    Icon: LayoutTemplate,
    title: "Website & landing pages",
    body: "Marketing sites and landing pages in Next.js — responsive, accessible and easy for you to update afterwards.",
    points: ["Next.js + Tailwind", "CMS-ready", "Deployed on Vercel"],
  },
  {
    Icon: Bot,
    title: "AI-powered products",
    body: "Chatbots, assistants and generative tooling wired into a real interface rather than a bare API call.",
    points: ["Chat interfaces", "LLM integration", "Streaming UI"],
  },
  {
    Icon: Gauge,
    title: "Performance & polish",
    body: "Taking an existing frontend and making it fast: bundle work, image handling, motion that never blocks the page.",
    points: ["Core Web Vitals", "Bundle trimming", "Motion audit"],
  },
];

export default function HireMePage() {
  return (
    <section className="relative px-5 pb-28 pt-36 sm:px-8">
      <PageBackdrop />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_26rem_at_50%_0%,hsl(var(--cyan)/0.1),transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <span className="section-eyebrow">Hire me</span>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Available for <span className="gradient-text">freelance</span> and full-time.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Tell me what you&apos;re building and I&apos;ll tell you honestly whether I&apos;m
            the right person for it — and how long it should take.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map(({ Icon, title, body, points }, i) => (
            <Reveal key={title} delay={i * 80}>
              <TiltCard max={7} className="h-full">
                <article className="glass h-full p-6 transition-colors duration-300 hover:border-white/20">
                  <div className="tilt-layer-sm">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-[hsl(var(--violet)/0.25)] to-[hsl(var(--cyan)/0.15)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-lg font-semibold tracking-tight">{title}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1 w-1 rounded-full bg-[hsl(var(--cyan))]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={260}>
          <div className="glass mt-14 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Have something in mind?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Send a short brief — timeline, scope, budget range. I reply within a day
                or two.
              </p>
            </div>
            <Button
              asChild
              className="h-11 shrink-0 rounded-full bg-foreground px-6 text-background hover:opacity-90"
            >
              <Link href="/contacts">Send a brief</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
