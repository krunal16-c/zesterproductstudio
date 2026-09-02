"use client";

import { useEffect, useState } from "react";

export type Tone = { ink: string; accent: string; line: string };

const read = (): Tone => {
  const s = getComputedStyle(document.documentElement);
  return {
    ink: s.getPropertyValue("--ink").trim() || "#ededea",
    accent: s.getPropertyValue("--accent").trim() || "#ffd400",
    line: s.getPropertyValue("--ink-3").trim() || "#6b6b65",
  };
};

/**
 * Reads live design tokens so the WebGL scene stays inside the same palette as
 * the rest of the page, and follows a theme change without a reload.
 */
export function useThemeTone(): Tone | null {
  const [tone, setTone] = useState<Tone | null>(null);

  useEffect(() => {
    const sync = () => setTone(read());
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  return tone;
}
