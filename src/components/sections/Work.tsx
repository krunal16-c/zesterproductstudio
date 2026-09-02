import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, productsByDomain } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { Action } from "@/components/ui/Action";

/**
 * Proof of work on the home page, grouped by the operational domain each system
 * acts on. Deliberately a dense index rather than a card grid: the argument here
 * is breadth across domains, and a reader scanning for their own domain finds it
 * faster in a list than in a gallery. Depth lives on the product page.
 *
 * Driven from PRODUCTS so the home page can never drift from the catalogue.
 */
export function Work() {
  const groups = productsByDomain();
  const measured = PRODUCTS.filter((p) => p.metrics?.length).length;

  return (
    <section id="work" className="scroll-mt-20 border-b border-line">
      <div className="shell py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div>
            <p className="t-meta mb-6 text-accent-text">Proof of work</p>
            <h2 className="t-display max-w-[15ch] text-[clamp(2.25rem,5.6vw,4.5rem)] text-ink">
              Systems already running.
            </h2>
          </div>
          <div className="flex items-end gap-10">
            <div>
              <p className="tnum text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none text-ink">
                {PRODUCTS.length}
              </p>
              <p className="t-meta mt-3 text-ink-3">Products</p>
            </div>
            <div>
              <p className="tnum text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none text-ink">
                {measured}
              </p>
              <p className="t-meta mt-3 text-ink-3">With measured figures</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-line">
          {groups.map(({ domain, items }, gi) => (
            <div key={domain} className="grid gap-x-14 gap-y-5 border-b border-line py-9 lg:grid-cols-12">
              <Reveal delay={gi * 0.05} className="lg:col-span-3">
                <p className="t-meta text-ink-3 lg:sticky lg:top-28">{domain}</p>
              </Reveal>

              <ul className="lg:col-span-9">
                {items.map((p, i) => (
                  <Reveal
                    as="li"
                    key={p.slug}
                    delay={gi * 0.05 + i * 0.04}
                    className="border-b border-line last:border-b-0"
                  >
                    <Link
                      href={`/products/${p.slug}`}
                      className="group grid items-baseline gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,14rem)_1fr_auto]"
                    >
                      <span className="t-display-wide flex items-center gap-2 text-[1.375rem] text-ink transition-colors group-hover:text-accent-text">
                        {p.name}
                        <ArrowUpRight
                          className="size-4 shrink-0 text-ink-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>

                      <span className="max-w-[54ch] font-sans text-[0.9375rem] leading-relaxed text-ink-2">
                        {p.positioning}
                      </span>

                      {/* The strongest supplied figure, or the award. Never both,
                          and never a placeholder when there is neither. */}
                      <span className="md:text-right">
                        {p.metrics?.[0] ? (
                          <>
                            <span className="tnum block text-[1.125rem] leading-none text-accent-text">
                              {p.metrics[0].value}
                            </span>
                            <span className="mt-1.5 block max-w-[20ch] font-sans text-[0.75rem] leading-snug text-ink-3 md:ml-auto">
                              {p.metrics[0].label}
                            </span>
                          </>
                        ) : p.award ? (
                          <span className="block max-w-[22ch] font-sans text-[0.75rem] leading-snug text-ink-3 md:ml-auto">
                            {p.award}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Action href="/products" variant="outline" size="lg">
            Explore products
          </Action>
        </div>
      </div>
    </section>
  );
}
