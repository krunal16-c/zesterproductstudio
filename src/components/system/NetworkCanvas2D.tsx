"use client";

import { useEffect, useRef } from "react";
import { buildNetwork } from "./networkGeometry";

/**
 * Mobile and low-power fallback. Same system, same geometry, drawn to a 2D
 * canvas with no WebGL context and no shader compilation. Roughly two orders of
 * magnitude cheaper to start than the R3F scene, which matters more on a phone
 * than the depth does. Under reduced motion it paints one static frame.
 */
export function NetworkCanvas2D({
  activeStage,
  reduced = false,
  className,
}: {
  activeStage: number;
  reduced?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(activeStage);
  stageRef.current = activeStage;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const net = buildNetwork();
    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--ink").trim() || "#ededea";
    const accent = styles.getPropertyValue("--accent").trim() || "#ffd400";

    let raf = 0;
    let w = 0;
    let h = 0;
    let eased = activeStage;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Orthographic projection of the same 3D layout, flattened to the plane.
    const project = (x: number, y: number) => ({
      px: w / 2 + (x / net.bounds) * (w * 0.44),
      py: h / 2 - (y / net.bounds) * (h * 0.4),
    });

    const weight = (stage: number) => 1 - Math.min(Math.abs(stage - eased), 1);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time / 1000;
      if (!reduced) eased += (stageRef.current - eased) * 0.045;
      else eased = stageRef.current;

      ctx.lineWidth = 1;
      for (let i = 0; i < net.pulseCount; i++) {
        const a = project(net.pulseStart[i * 3], net.pulseStart[i * 3 + 1]);
        const b = project(net.pulseEnd[i * 3], net.pulseEnd[i * 3 + 1]);
        ctx.strokeStyle = ink;
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();

        if (!reduced) {
          const wgt = weight(net.pulseStage[i]);
          const p = (t * 0.135 + net.pulsePhase[i]) % 1;
          const fade = Math.min(p / 0.16, 1) * Math.min((1 - p) / 0.16, 1);
          ctx.globalAlpha = fade * (0.35 + wgt * 0.65);
          ctx.fillStyle = wgt > 0.5 ? accent : ink;
          ctx.beginPath();
          ctx.arc(a.px + (b.px - a.px) * p, a.py + (b.py - a.py) * p, 1.9 + wgt * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < net.nodeCount; i++) {
        const { px, py } = project(net.nodePositions[i * 3], net.nodePositions[i * 3 + 1]);
        const wgt = weight(net.nodeStage[i]);
        const s = (2.1 + net.nodeScale[i] * 1.1) * (1 + wgt * 0.5);
        ctx.globalAlpha = 0.3 + wgt * 0.68;
        ctx.fillStyle = wgt > 0.5 ? accent : ink;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }

      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [reduced, activeStage]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
