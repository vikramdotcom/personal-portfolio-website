import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function Message() {
  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="section-eyebrow">Contact</span>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s build something <span className="gradient-text">together</span>.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Got a project, a role, or just an idea worth testing? Send it over — I
            read everything and reply within a day or two.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Mail className="h-4 w-4" />
              </span>
              Open to freelance and full-time work
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                <MapPin className="h-4 w-4" />
              </span>
              Working remotely, worldwide
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <TiltCard max={5} glare={false}>
            <form className="glass p-7 sm:p-8">
              <div className="tilt-layer-sm space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="h-11 rounded-xl bg-white/[0.03]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 rounded-xl bg-white/[0.03]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me what you're working on."
                    className="h-32 resize-none rounded-xl bg-white/[0.03]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-foreground text-background hover:opacity-90"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send message
                </Button>
              </div>
            </form>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
