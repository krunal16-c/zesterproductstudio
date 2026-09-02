import { Reveal } from "@/components/ui/Reveal";

/**
 * The architecture as an actual stack, drawn on a single spine.
 *
 * Motivation: an operations buyer's first question is "where does this run and
 * what does it touch". A layer list answers that faster than prose, and the
 * spine makes the direction of the system legible — data enters at the source
 * layer and leaves at the surface. The terminal node is filled because that is
 * the only layer a user ever sees.
 *
 * The connector is drawn per row rather than as one absolutely positioned rule,
 * so rows of any content height stay joined and the spine never overshoots the
 * final node.
 */
export function ArchitectureDiagram({
  layers,
}: {
  layers: { layer: string; detail: string }[];
}) {
  return (
    <ol>
      {layers.map(({ layer, detail }, i) => {
        const terminal = i === layers.length - 1;

        return (
          <Reveal as="li" key={layer} delay={i * 0.06} className="flex gap-5">
            <span className="tnum w-8 shrink-0 pt-[0.2rem] text-[0.6875rem] tracking-[0.14em] text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Node and connector share a column, so the spine is exactly as
                long as the row it belongs to. */}
            <span className="flex w-6 shrink-0 flex-col items-center md:w-10" aria-hidden>
              <span
                className={`mt-[0.3rem] block size-2.5 shrink-0 border ${
                  terminal ? "border-accent bg-accent" : "border-line-strong bg-ground"
                }`}
              />
              {!terminal && <span className="w-px flex-1 bg-line-strong" />}
            </span>

            <div className={`min-w-0 flex-1 ${terminal ? "" : "pb-9"}`}>
              <h3 className="t-display-wide text-[1.25rem] text-ink">{layer}</h3>
              <p className="mt-1.5 max-w-[52ch] font-sans text-[0.9375rem] leading-relaxed text-ink-2">
                {detail}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
