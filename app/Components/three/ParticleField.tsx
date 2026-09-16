"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Geometry, Program, Mesh, Torus } from "ogl";

/**
 * Hero WebGL scene: a rotating particle sphere wrapped in a faint wireframe
 * torus. Built on `ogl` rather than three.js so the scene chunk stays small,
 * and it is loaded lazily so the page paints its CSS gradient long before any
 * of this arrives.
 *
 * The render loop is paused whenever the canvas scrolls out of view or the tab
 * is hidden, so it never burns frames in the background.
 */

const POINT_VERT = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  uniform float uOpacity;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Slow per-particle breathing along its own radius
    float t = uTime * 0.35 + random.x * 6.2831853;
    pos *= 1.0 + sin(t) * 0.07 * random.y;

    // Parallax: near particles chase the pointer harder than far ones
    pos.xy += uPointer * (0.18 + random.z * 0.42);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = max(-mv.z, 0.001);
    gl_PointSize = uSize * (0.45 + random.w) / dist;

    // Violet -> cyan across the vertical axis, amber sparks on a few points
    vec3 violet = vec3(0.494, 0.361, 1.0);
    vec3 cyan   = vec3(0.145, 0.827, 0.929);
    vec3 amber  = vec3(0.984, 0.749, 0.141);

    vec3 col = mix(violet, cyan, smoothstep(-1.0, 1.0, position.y));
    col = mix(col, amber, step(0.94, random.z));
    vColor = col;

    // Fade with depth so the sphere reads as a volume, not a flat disc
    vAlpha = smoothstep(7.2, 3.6, dist) * (0.35 + random.w * 0.65) * uOpacity;
  }
`;

const POINT_FRAG = /* glsl */ `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Round the square point sprite into a soft dot
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;

    float falloff = 1.0 - smoothstep(0.0, 0.25, d);
    gl_FragColor = vec4(vColor, vAlpha * falloff);
  }
`;

const LINE_VERT = /* glsl */ `
  attribute vec3 position;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying float vDepth;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const LINE_FRAG = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  varying float vDepth;

  void main() {
    gl_FragColor = vec4(uColor, smoothstep(7.5, 3.8, vDepth) * 0.2);
  }
`;

export type SceneVariant = "hero" | "ambient";

/**
 * `hero` is the full scene; `ambient` is the same code path dialled down for
 * use as a page backdrop. Both share one lazy chunk, so a second variant on
 * another route costs no extra download.
 */
const VARIANTS = {
  hero: {
    count: { wide: 3600, narrow: 1400 },
    // Scaled by DPR at init; resolves to ~2-3 CSS px dots
    size: { wide: 22, narrow: 16 },
    torus: true,
    opacity: 1,
  },
  ambient: {
    count: { wide: 1700, narrow: 800 },
    size: { wide: 16, narrow: 12 },
    torus: false,
    opacity: 0.5,
  },
} as const;

export default function ParticleField({
  variant = "hero",
}: {
  variant?: SceneVariant;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Respect the OS motion setting: no WebGL context at all, just the CSS
    // gradient already sitting behind this element.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        depth: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.75),
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL — the gradient fallback stands on its own
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    host.appendChild(canvas);

    const camera = new Camera(gl, { fov: 38, near: 0.1, far: 100 });
    camera.position.set(0, 0, 5.2);

    const scene = new Transform();

    // Fewer points on phones: fill rate, not vertex count, is the limit there
    const cfg = VARIANTS[variant];
    const isNarrow = window.innerWidth < 768;
    const count = isNarrow ? cfg.count.narrow : cfg.count.wide;
    const radius = 1.75;

    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      // Even distribution over a sphere, pushed out into a thick shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.72 + 0.28 * Math.sqrt(Math.random()));

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      randoms[i * 4] = Math.random();
      randoms[i * 4 + 1] = Math.random();
      randoms[i * 4 + 2] = Math.random();
      randoms[i * 4 + 3] = Math.random();
    }

    const pointGeometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
    });

    const pointProgram = new Program(gl, {
      vertex: POINT_VERT,
      fragment: POINT_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: [0, 0] },
        uSize: { value: (isNarrow ? cfg.size.narrow : cfg.size.wide) * renderer.dpr },
        uOpacity: { value: cfg.opacity },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
    });
    // Additive blend: overlapping points glow instead of flattening out
    pointProgram.setBlendFunc(gl.SRC_ALPHA, gl.ONE);

    const points = new Mesh(gl, {
      mode: gl.POINTS,
      geometry: pointGeometry,
      program: pointProgram,
    });
    points.setParent(scene);

    // Drawing an indexed mesh as LINES is a cheap way to get a structural
    // "orbit" wireframe with no extra geometry work.
    let torus: Mesh | null = null;

    if (cfg.torus) {
      const torusGeometry = new Torus(gl, {
        radius: 2.55,
        tube: 0.42,
        radialSegments: 20,
        tubularSegments: 56,
      });

      const torusProgram = new Program(gl, {
        vertex: LINE_VERT,
        fragment: LINE_FRAG,
        uniforms: { uColor: { value: [0.494, 0.361, 1.0] } },
        transparent: true,
        depthTest: false,
        depthWrite: false,
        cullFace: false,
      });
      torusProgram.setBlendFunc(gl.SRC_ALPHA, gl.ONE);

      torus = new Mesh(gl, {
        mode: gl.LINES,
        geometry: torusGeometry,
        program: torusProgram,
      });
      torus.rotation.x = 1.15;
      torus.setParent(scene);
    }

    /* ---------- sizing ---------- */

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.perspective({ aspect: w / h });
      scene.position.x = variant === "hero" && w >= 1024 ? 1.45 : 0;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    /* ---------- pointer ---------- */

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    // Coarse pointers get the idle drift instead of chasing taps
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    /* ---------- loop, gated on visibility ---------- */

    let raf = 0;
    let running = false;
    let onScreen = false;
    let last = performance.now();
    let elapsed = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      // Clamp dt so a backgrounded tab does not jump the animation on return
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;

      const ease = Math.min(dt * 3.5, 1);
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      pointProgram.uniforms.uTime.value = elapsed;
      pointProgram.uniforms.uPointer.value = [current.x * 0.35, current.y * 0.35];

      scene.rotation.y = elapsed * 0.12 + current.x * 0.32;
      scene.rotation.x = Math.sin(elapsed * 0.18) * 0.09 - current.y * 0.22;
      if (torus) torus.rotation.z = elapsed * 0.08;

      renderer.render({ scene, camera });
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(host);

    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (finePointer) window.removeEventListener("pointermove", onPointerMove);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [variant]);

  return <div ref={hostRef} className="absolute inset-0 -z-10" aria-hidden="true" />;
}
