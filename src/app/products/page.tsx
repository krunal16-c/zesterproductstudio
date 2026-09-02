import type { Metadata } from "next";
import { PRODUCTS, productsByDomain } from "@/lib/products";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Action } from "@/components/ui/Action";
import { PRIMARY_CTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Systems built by Zester Product Studio across government, workplace, knowledge, business, research, and field operations.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const groups = productsByDomain();

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        lines={["Systems, not", "demonstrations."]}
        lead="Every entry below is a system that was built and run against a real operational problem. Figures on this page are measured, never projected."
      >
        <Reveal delay={0.36} className="mt-14 flex flex-wrap items-end gap-x-16 gap-y-8 border-t border-line pt-9">
          <div>
            <p className="tnum text-[clamp(2rem,4vw,3rem)] leading-none text-ink">
              {PRODUCTS.length}
            </p>
            <p className="t-meta mt-3 text-ink-3">Products</p>
          </div>
          <div>
            <p className="tnum text-[clamp(2rem,4vw,3rem)] leading-none text-ink">
              {groups.length}
            </p>
            <p className="t-meta mt-3 text-ink-3">Operational domains</p>
          </div>
        </Reveal>
      </PageHeader>

      {groups.map(({ domain, items }) => (
        <section key={domain} className="border-b border-line">
          <div className="shell py-16 md:py-20">
            <div className="flex items-baseline gap-5 pb-9">
              <h2 className="t-meta shrink-0 text-accent-text">{domain}</h2>
              <span aria-hidden className="h-px flex-1 bg-line" />
              <span className="tnum shrink-0 text-[0.6875rem] tracking-[0.14em] text-ink-3">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>

            {/* One hairline grid. gap-px over a line-coloured bed gives the
                separators without doubling borders between cells. */}
            <div className="grid gap-px border border-line bg-line md:grid-cols-2">
              {items.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={PRODUCTS.indexOf(product)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-line bg-ground-2">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <h2 className="t-display max-w-[18ch] text-[clamp(2rem,5vw,3.75rem)] text-ink">
              None of these started as a product.
            </h2>
            <p className="t-body mt-7">
              They started as an operational problem someone needed solved. If you
              have one, that is the conversation.
            </p>
            <div className="mt-10">
              <Action href={PRIMARY_CTA.href} variant="solid" size="lg">
                {PRIMARY_CTA.label}
              </Action>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
