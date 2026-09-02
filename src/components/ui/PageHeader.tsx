import type { ReactNode } from "react";
import { Reveal, MaskedLines } from "./Reveal";

/**
 * The masthead every non-home page opens with. One eyebrow, one display
 * headline, one lead. Kept as a single primitive so page rhythm is identical
 * across the site and a new route cannot drift out of the system.
 */
export function PageHeader({
  eyebrow,
  lines,
  lead,
  children,
}: {
  eyebrow: string;
  /** Display headline, split into the lines it should break on. */
  lines: string[];
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <div className="shell pt-32 pb-16 md:pt-44 md:pb-24">
        <Reveal>
          <p className="t-meta mb-8 text-accent-text">{eyebrow}</p>
        </Reveal>

        <h1 className="t-display max-w-[16ch] text-[clamp(2.75rem,8vw,6rem)] text-ink">
          <MaskedLines lines={lines} />
        </h1>

        {lead && (
          <Reveal delay={0.24}>
            <p className="t-lead mt-9 max-w-[54ch]">{lead}</p>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  );
}
