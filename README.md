# personal-portfolio-website

Personal portfolio for Vikram Singh — a frontend developer working in React,
Next.js and TypeScript.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and shadcn/ui,
with a lightweight WebGL layer for the 3D work.

## The 3D layer

The site uses real WebGL rather than CSS fakery, but deliberately avoids
three.js — the goal was 3D that never delays first paint.

| Library | Role | Cost |
| --- | --- | --- |
| [`ogl`](https://github.com/oframe/ogl) | Hero particle sphere + wireframe orbit torus | ~14 KB gzipped, lazy |
| [`vanilla-tilt`](https://micku7zu.github.io/vanilla-tilt.js/) | Perspective tilt on cards | ~2.5 KB gzipped, lazy |

Everything 3D is dynamically imported and only fetched on
`requestIdleCallback` after hydration, so none of it appears in the initial
bundle — first load JS stays at ~109 KB.

### Performance guardrails

- Render loop pauses when the canvas scrolls off-screen or the tab is hidden
- Device pixel ratio capped at 1.75; particle count halves on narrow viewports
- Scene is skipped entirely for `prefers-reduced-motion`, data-saver
  connections, and devices reporting under 4 GB of memory
- A CSS gradient sits behind the canvas as the fallback, so the hero is never
  blank
- Card tilt only initialises for fine pointers — touch devices render flat

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Structure

```
app/
  Components/
    three/          WebGL scene (ParticleField, Scene, PageBackdrop)
    TiltCard.tsx    vanilla-tilt wrapper
    Reveal.tsx      scroll reveals via IntersectionObserver
    Hero / Skills / Project / Message / Footer / Navbar
  about | projects | contacts | hire-me
components/ui/      shadcn/ui primitives
lib/                helpers (utils, optional mongoose connection)
```

## Notes

- `lib/dbConnect.ts` is a mongoose helper kept for a future contact-form
  backend. Nothing imports it yet, so no `DATABASE_URI` is needed to build or
  deploy. The contact form is currently presentational.
- Deploys as-is on Vercel with no environment variables and no extra config.
