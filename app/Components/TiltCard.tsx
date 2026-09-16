"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TiltElement = HTMLDivElement & {
  vanillaTilt?: { destroy: () => void };
};

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Keep it small — subtle reads as premium. */
  max?: number;
  glare?: boolean;
};

/**
 * Gives any panel real perspective on pointer move, via vanilla-tilt (~3KB).
 *
 * The library is imported inside the effect so it stays out of the initial
 * bundle, and it is only loaded for fine pointers — on touch there is no
 * hover to drive the tilt, so the card just renders flat.
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<TiltElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      if (cancelled || !ref.current) return;
      VanillaTilt.init(ref.current, {
        max,
        speed: 600,
        scale: 1.02,
        perspective: 1000,
        glare,
        "max-glare": 0.18,
        gyroscope: false,
      });
    });

    return () => {
      cancelled = true;
      el.vanillaTilt?.destroy();
    };
  }, [max, glare]);

  return (
    <div ref={ref} className={`tilt-3d ${className}`}>
      {children}
    </div>
  );
}
