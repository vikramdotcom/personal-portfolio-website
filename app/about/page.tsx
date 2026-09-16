import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Reveal from "../Components/Reveal";
import TiltCard from "../Components/TiltCard";

export const metadata = { title: "About" };

const timeline = [
  {
    period: "Now",
    title: "Frontend Developer",
    body: "Building production interfaces in React and Next.js, with a focus on performance, accessibility and motion that serves the content.",
  },
  {
    period: "Recently",
    title: "AI-powered web apps",
    body: "Shipping chatbots and generative tooling on top of modern LLM APIs, wiring them into interfaces people can actually use.",
  },
  {
    period: "Foundation",
    title: "Design & marketing",
    body: "Years of graphic design, SEO and digital marketing work — the reason I care as much about how something reads as how it renders.",
  },
];

export default function AboutPage() {
  return (
    <section className="relative px-5 pb-28 pt-36 sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_26rem_at_50%_0%,hsl(var(--violet)/0.12),transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <span className="section-eyebrow">About me</span>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Developer first, <span className="gradient-text">designer</span> by habit.
          </h1>
          <p className="mt-5 text-muted-foreground">
            I&apos;m Vikram — a self-motivated frontend developer working in HTML, CSS,
            JavaScript and TypeScript with React and Next.js. I like the part of the job
            where a rough idea turns into something fast, legible and genuinely pleasant
            to use.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <TiltCard max={9} className="mx-auto w-full max-w-sm">
              <div className="glass p-4">
                <div className="tilt-layer-sm overflow-hidden rounded-xl">
                  <Image
                    src="/images/img.jpg"
                    alt="Portrait of Vikram"
                    width={600}
                    height={700}
                    sizes="(max-width: 1024px) 80vw, 380px"
                    className="h-[380px] w-full object-cover"
                  />
                </div>
                <div className="tilt-layer-sm mt-4 px-2 pb-1">
                  <p className="text-sm font-semibold">Vikram Singh</p>
                  <p className="text-xs text-muted-foreground">
                    Frontend Developer · Remote
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="space-y-4">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <TiltCard max={5} glare={false}>
                  <div className="glass p-6">
                    <div className="tilt-layer-sm">
                      <span className="text-xs uppercase tracking-widest text-[hsl(var(--cyan))]">
                        {item.period}
                      </span>
                      <h2 className="mt-2 text-lg font-semibold tracking-tight">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}

            <Reveal delay={280}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  asChild
                  className="h-11 rounded-full bg-foreground px-6 text-background hover:opacity-90"
                >
                  <Link href="/hire-me">Work with me</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-white/15 bg-white/[0.04] px-6 hover:bg-white/10"
                >
                  <Link href="/projects">See my projects</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
