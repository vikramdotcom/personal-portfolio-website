import {
  Code2,
  FileSpreadsheet,
  Megaphone,
  MessagesSquare,
  Palette,
  Search,
} from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const skills = [
  {
    Icon: Code2,
    title: "Web Development",
    body: "Responsive, user-friendly websites built with HTML, CSS, JavaScript and modern frameworks like React and Next.js.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    Icon: Palette,
    title: "Graphic Design",
    body: "Visually striking brand and social work in Photoshop, Illustrator and InDesign, from identity to print.",
    tags: ["Photoshop", "Illustrator"],
  },
  {
    Icon: Megaphone,
    title: "Digital Marketing",
    body: "Online strategies that actually convert — social campaigns, content and positioning that build awareness.",
    tags: ["Social", "Content"],
  },
  {
    Icon: Search,
    title: "SEO",
    body: "Technical and on-page optimisation that lifts rankings and drives durable organic traffic.",
    tags: ["Keywords", "On-page"],
  },
  {
    Icon: FileSpreadsheet,
    title: "MS Office",
    body: "Advanced Word and Excel work: clean documents, structured data and processes that stay maintainable.",
    tags: ["Excel", "Word"],
  },
  {
    Icon: MessagesSquare,
    title: "English Speaking",
    body: "Fluent, clear communication — presentations, client calls and writing that gets the point across.",
    tags: ["Presenting", "Writing"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <span className="section-eyebrow">What I do</span>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            A toolkit built for <span className="gradient-text">shipping</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six areas I work in day to day — each one backed by real projects rather
            than a certificate.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ Icon, title, body, tags }, i) => (
            <Reveal key={title} delay={i * 70}>
              <TiltCard max={7} className="h-full">
                <article className="glass group h-full p-6 transition-colors duration-300 hover:border-white/20">
                  <div className="tilt-layer-sm">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-[hsl(var(--violet)/0.25)] to-[hsl(var(--cyan)/0.15)]">
                      <Icon className="h-5 w-5 text-foreground" />
                    </span>

                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
