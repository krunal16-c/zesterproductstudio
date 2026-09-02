"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { STAGES } from "./networkGeometry";
import { NetworkCanvas2D } from "./NetworkCanvas2D";
import { CanvasBoundary } from "./CanvasBoundary";

// Three.js is the heaviest thing on the page and it is never above the fold on
// a phone. It loads only after the shell is interactive, and never on mobile.
const OperationalNetwork = dynamic(() => import("./OperationalNetwork"), {
  ssr: false,
  loading: () => null,
});

const CYCLE_MS = 3400;

export function SystemVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [stage, setStage] = useState(0);
  const [heavy, setHeavy] = useState(false);

  // Capability gate, evaluated once on the client. Narrow viewports and
  // machines without a WebGL context get the 2D renderer.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 900px)").matches;
    if (!wide) return;
    const probe = document.createElement("canvas");
    const supported = Boolean(
      probe.getContext("webgl2") || probe.getContext("webgl"),
    );
    if (supported) setHeavy(true);
  }, []);

  // The system advances through its own stages. Motivation: storytelling. The
  // scene is showing input becoming action, which is the company's thesis.
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setStage((s) => (s + 1) % STAGES.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  const flat = (
    <NetworkCanvas2D
      activeStage={stage}
      reduced={reduce}
      className="h-full w-full"
    />
  );

  return (
    <div className={className}>
      <div className="absolute inset-0">
        {heavy ? (
          <CanvasBoundary fallback={flat}>
            <OperationalNetwork activeStage={stage} reduced={reduce} />
          </CanvasBoundary>
        ) : (
          flat
        )}
      </div>

      {/* Live readout. This is instrumentation for the scene above it, not a
          decorative strip: it names the stage the system is currently in. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-3">
        <div className="flex items-center gap-3">
          <span className="relative block h-1.5 w-9 overflow-hidden bg-line-strong">
            {!reduce && (
              <span className="absolute inset-y-0 left-0 w-1/3 bg-accent [animation:sweep_3.4s_linear_infinite]" />
            )}
          </span>
          <span className="t-meta text-ink-3">Software</span>
          <span className="t-meta text-ink-3" aria-hidden>&times;</span>
          <span className="t-meta text-ink-3">Hardware</span>
          <span className="t-meta text-ink-3" aria-hidden>&times;</span>
          <span className="t-meta text-ink-3">Operations</span>
        </div>

        <ol className="flex items-center gap-1" aria-label="System stage">
          {STAGES.map((s, i) => (
            <li key={s.id}>
              <span
                className={`t-meta px-2 py-1 transition-colors duration-500 ${
                  i === stage ? "bg-accent text-accent-ink" : "text-ink-3"
                }`}
                aria-current={i === stage ? "step" : undefined}
              >
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
