import { MaskedLines, Reveal } from "@/components/ui/Reveal";

/**
 * The company's belief, stated once, with nothing else in the frame. The second
 * clause is the payload, so it arrives after the first and carries the accent.
 * Motivation: hierarchy. This is the strongest moment on the page.
 */
export function Thesis() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="shell py-20 md:py-28 lg:py-32">
        <h2 className="t-display max-w-[19ch] text-[clamp(2.5rem,7.2vw,6.25rem)]">
          <MaskedLines
            lines={[
              "We believe the future of AI",
              "isn't better conversations.",
            ]}
            lineClassName="text-ink-3"
          />
          <MaskedLines
            lines={["It's better operations."]}
            lineClassName="text-ink"
            startDelay={0.42}
          />
        </h2>

        <Reveal delay={0.7} className="mt-10 flex items-center gap-5">
          <span className="h-px w-16 bg-accent md:w-28" />
          <span className="t-meta text-ink-3">Zester Product Studio</span>
        </Reveal>
      </div>
    </section>
  );
}
