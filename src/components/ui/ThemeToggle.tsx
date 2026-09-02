"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Mode = "dark" | "light";

/**
 * The page is authored dark and locked to one theme at a time. This control
 * exists because the accent has to hold its meaning in both modes, and because
 * a visitor reading on a bright factory floor should not be forced into dark.
 */
export function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("zester-theme") as Mode | null;
    const system: Mode = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    setMode(stored ?? system);
  }, []);

  useEffect(() => {
    if (!mode) return;
    document.documentElement.setAttribute("data-theme", mode);
    window.localStorage.setItem("zester-theme", mode);
  }, [mode]);

  const next = mode === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      aria-label={mode ? `Switch to ${next} appearance` : "Switch appearance"}
      className="grid size-9 shrink-0 place-items-center border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
    >
      {mode === "light" ? (
        <Moon className="size-4" strokeWidth={1.5} aria-hidden />
      ) : (
        <Sun className="size-4" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
