"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-entry reveal. Motivation: sequence. Content enters in the order it
 * should be read, which is the only reason this animation exists.
 * Collapses to an instant, fully-visible render under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];

  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}

/**
 * Masked line reveal for display typography. Each line rises out of its own
 * clipping box, the way a plate is lifted. Motivation: hierarchy. Used only on
 * the headlines that carry the argument of a page.
 *
 * The trigger is deliberately NOT `whileInView` on the animated line. In its
 * resting state each line is translated a full 108% below its own
 * `overflow-hidden` mask, and an IntersectionObserver reports the area of the
 * element *after* ancestor clipping — which is zero. Any threshold above 0
 * therefore never fires and the headline stays permanently invisible, leaving a
 * headline-shaped hole in the page. Observing the un-clipped container instead
 * is what makes this reliable.
 */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  startDelay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  startDelay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const shown = reduce || inView;

  return (
    <span ref={ref} className={`block ${className ?? ""}`}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduce ? false : { y: "108%" }}
            animate={shown ? { y: "0%" } : undefined}
            transition={{
              duration: 0.82,
              delay: startDelay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
