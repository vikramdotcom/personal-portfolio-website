import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const projects = [
  {
    title: "Tic Tac Toe",
    image: "/images/favicon.jpeg",
    body: "A React-based take on the classic, showcasing state management and interactive UI design. The goal was a fun, seamless game across every device.",
    href: "https://vercel.live/link/tic-tac-toe-xi-pied.vercel.app?via=project-dashboard-alias-list&p=1",
    stack: ["React", "State"],
  },
  {
    title: "Rock Paper Scissors",
    image: "/images/rock.jpg",
    body: "A native web game built on modern JavaScript, letting players go head to head against the computer with instant feedback.",
    href: "#",
    stack: ["JavaScript", "DOM"],
  },
  {
    title: "To Do App",
    image: "/images/todo.png",
    body: "A Next.js task manager for adding, editing and deleting tasks, wrapped in an interface that stays out of the way.",
    href: "https://vercel.live/link/to-do-app-three-cyan.vercel.app?via=project-dashboard-alias-list&p=1",
    stack: ["Next.js", "CRUD"],
  },
  {
    title: "Calculator",
    image: "/images/cal.png",
    body: "A clean Next.js calculator for everyday arithmetic — small surface area, careful attention to input handling.",
    href: "#",
    stack: ["Next.js", "UI"],
  },
];

export default function Project() {
  return (
    <section id="projects" className="relative px-5 py-28 sm:px-8">
      {/* Soft violet wash to separate this band from the sections around it */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45rem_28rem_at_50%_0%,hsl(var(--violet)/0.1),transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <span className="section-eyebrow">Selected work</span>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Things I&apos;ve <span className="gradient-text">built</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A few projects that show how I think about state, interaction and polish.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <TiltCard max={6} className="h-full">
                <article className="glass group h-full overflow-hidden transition-colors duration-300 hover:border-white/20">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  </div>

                  <div className="tilt-layer-sm p-6 pt-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.body}
                    </p>

                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-[hsl(var(--cyan))]"
                    >
                      Open project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
