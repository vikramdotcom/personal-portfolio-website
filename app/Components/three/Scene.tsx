"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Split out of the main bundle entirely — nothing here is fetched until the
// browser is idle after hydration.
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

type NetworkInfo = { saveData?: boolean };

/**
 * Decides whether this device should get the WebGL hero at all, and if so
 * defers it until the main thread is free. The hero looks complete without
 * it: the CSS gradient underneath is the fallback.
 */
export default function Scene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: NetworkInfo;
      deviceMemory?: number;
    };

    // Skip the scene on data-saver connections and low-memory devices rather
    // than shipping them a canvas they will struggle to animate.
    if (nav.connection?.saveData) return;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const idle = window.requestIdleCallback;
    if (idle) {
      const id = idle(() => setEnabled(true), { timeout: 2500 });
      return () => window.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(() => setEnabled(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!enabled) return null;
  return <ParticleField />;
}
