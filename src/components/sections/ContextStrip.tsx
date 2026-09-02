import { Reveal } from "@/components/ui/Reveal";

/**
 * The hero carries one claim. This strip carries the range of environments that
 * claim has to survive, which is the first question an operations buyer asks.
 */
export function ContextStrip() {
  return (
    <section className="border-b border-line bg-ground-2">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <p className="max-w-[74ch] font-sans text-[clamp(1.125rem,2.2vw,1.75rem)] leading-[1.42] tracking-[-0.014em] text-ink">
            From factory floors and government offices to engineering teams, we
            build systems that automate repetitive work, improve decision-making,
            and{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">scale with your business.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[0.08em] z-0 h-[0.42em] bg-accent-dim"
              />
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
