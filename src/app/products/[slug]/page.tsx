import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PRODUCTS, getProduct, siblings } from "@/lib/products";
import { PRIMARY_CTA } from "@/lib/site";
import { Reveal, MaskedLines } from "@/components/ui/Reveal";
import { Action } from "@/components/ui/Action";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { ArchitectureDiagram } from "@/components/product/ArchitectureDiagram";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

/** Anything not in the catalogue is a 404 rather than an empty rendered shell. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.positioning,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} - ${product.category}`,
      description: product.positioning,
      url: `/products/${product.slug}`,
    },
  };
}

/** Section frame. Every band on this page is a labelled group, never a floating
    heading, so the page reads as a specification document. */
function Band({
  label,
  title,
  children,
  ground,
}: {
  label: string;
  title?: string;
  children: React.ReactNode;
  ground?: string;
}) {
  return (
    <section className={`border-b border-line ${ground ?? ""}`}>
      <div className="shell py-16 md:py-24">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="t-meta text-accent-text lg:sticky lg:top-28">{label}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            {title && (
              <h2 className="t-display mb-9 max-w-[20ch] text-[clamp(1.875rem,4.2vw,3.25rem)] text-ink">
                {title}
              </h2>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const {
    name,
    category,
    domain,
    positioning,
    status,
    stack,
    metrics,
    award,
    links,
    problem,
    users,
    mechanism,
    architecture,
    outcomes,
    capabilities,
    assets,
  } = product;

  const { prev, next } = siblings(slug);

  return (
    <>
      {/* ---- Masthead ---- */}
      <header className="border-b border-line">
        <div className="shell pt-28 pb-14 md:pt-40 md:pb-20">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-ink-3 uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.5}
              aria-hidden
            />
            All products
          </Link>

          <div className="mt-12 grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="t-meta mb-7 text-accent-text">{category}</p>
              <h1 className="t-display text-[clamp(3rem,9vw,6.5rem)] text-ink">
                <MaskedLines lines={[name]} />
              </h1>
              <Reveal delay={0.22}>
                <p className="t-lead mt-8 max-w-[48ch]">{positioning}</p>
              </Reveal>
            </div>

            {/* Spec block. Everything a technical reader checks before reading
                the argument: where it sits, what it is built on, where it is. */}
            <Reveal delay={0.34} className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-line">
                <div className="flex gap-6 border-b border-line py-4">
                  <dt className="t-meta w-24 shrink-0 pt-[0.15rem] text-ink-3">Domain</dt>
                  <dd className="font-sans text-[0.9375rem] text-ink">{domain}</dd>
                </div>
                <div className="flex gap-6 border-b border-line py-4">
                  <dt className="t-meta w-24 shrink-0 pt-[0.15rem] text-ink-3">Status</dt>
                  <dd className="font-sans text-[0.9375rem] text-ink">{status}</dd>
                </div>
                <div className="flex gap-6 border-b border-line py-4">
                  <dt className="t-meta w-24 shrink-0 pt-[0.15rem] text-ink-3">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {stack.map((s) => (
                      <span
                        key={s}
                        className="border border-line px-2 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-2"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
                {award && (
                  <div className="flex gap-6 border-b border-line py-4">
                    <dt className="t-meta w-24 shrink-0 pt-[0.15rem] text-ink-3">Award</dt>
                    <dd className="font-sans text-[0.9375rem] text-ink">{award}</dd>
                  </div>
                )}
              </dl>

              {links && links.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border border-line-strong px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-ink uppercase transition-colors hover:border-accent hover:text-accent-text"
                    >
                      {l.label}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </a>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---- Measured figures. Only ever real, supplied numbers. ---- */}
      {metrics && metrics.length > 0 && (
        <section className="border-b border-line bg-ground-2">
          <div className="shell py-12 md:py-16">
            <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m, i) => (
                <Reveal
                  key={m.label}
                  delay={i * 0.07}
                  className="bg-ground-2 py-6 pr-6 sm:px-8 sm:first:pl-0"
                >
                  <p className="tnum text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-accent-text">
                    {m.value}
                  </p>
                  <p className="mt-4 max-w-[22ch] font-sans text-[0.875rem] leading-snug text-ink-2">
                    {m.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Problem ---- */}
      <Band label="The problem" title={problem.headline}>
        <Reveal>
          <p className="max-w-[62ch] font-sans text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.62] text-ink-2">
            {problem.body}
          </p>
        </Reveal>
      </Band>

      {/* ---- Mechanism ---- */}
      <Band label="How it works" ground="bg-ground-2">
        <ol className="grid gap-px border border-line bg-line md:grid-cols-2">
          {mechanism.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.07}
              className="flex flex-col gap-5 bg-ground-2 p-7 md:p-9"
            >
              <span className="tnum text-[0.6875rem] tracking-[0.14em] text-accent-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="t-display-wide text-[1.375rem] text-ink">{step.title}</h3>
                <p className="mt-3 max-w-[42ch] font-sans text-[0.9375rem] leading-relaxed text-ink-2">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Band>

      {/* ---- Architecture ---- */}
      <Band label="Architecture">
        <ArchitectureDiagram layers={architecture} />
      </Band>

      {/* ---- Outcomes ---- */}
      {outcomes && outcomes.length > 0 && (
        <Band label="What changes" ground="bg-ground-2">
          <ul className="border-t border-line">
            {outcomes.map((o, i) => (
              <Reveal
                as="li"
                key={o.claim}
                delay={i * 0.07}
                className="grid gap-x-10 gap-y-3 border-b border-line py-8 md:grid-cols-2"
              >
                <p className="max-w-[36ch] font-sans text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-[1.45] tracking-[-0.011em] text-ink">
                  {o.claim}
                </p>
                {/* Evidence is printed verbatim. Where a measurement does not
                    exist yet, the page says so rather than implying one. */}
                <p
                  className={`max-w-[46ch] self-center font-mono text-[0.8125rem] leading-relaxed ${
                    o.evidence.startsWith("PILOT MEASUREMENT REQUIRED")
                      ? "text-ink-3"
                      : "text-ink-2"
                  }`}
                >
                  {o.evidence}
                </p>
              </Reveal>
            ))}
          </ul>
        </Band>
      )}

      {/* ---- Capabilities ---- */}
      <Band label="Capabilities">
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal
              as="li"
              key={c}
              delay={i * 0.04}
              className="flex items-start gap-4 border-b border-line py-4"
            >
              <span aria-hidden className="mt-[0.5rem] block size-1.5 shrink-0 bg-accent" />
              <span className="font-sans text-[0.9375rem] leading-relaxed text-ink-2">{c}</span>
            </Reveal>
          ))}
        </ul>
      </Band>

      {/* ---- Users ---- */}
      {users && users.length > 0 && (
        <Band label="Who uses it" ground="bg-ground-2">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {users.map((u, i) => (
              <Reveal key={u.role} delay={i * 0.06} className="bg-ground-2 p-7 md:p-8">
                <h3 className="t-display-wide text-[1.1875rem] text-ink">{u.role}</h3>
                <p className="mt-2.5 max-w-[36ch] font-sans text-[0.875rem] leading-relaxed text-ink-3">
                  {u.context}
                </p>
              </Reveal>
            ))}
          </div>
        </Band>
      )}

      {/* ---- Outstanding evidence ---- */}
      {assets && assets.length > 0 && (
        <Band label="Evidence pending">
          <Reveal>
            <p className="t-body mb-10">
              This page does not fabricate product imagery. The slots below are
              reserved at their final dimensions and name exactly what is needed.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {assets.map((a) => (
              <AssetSlot key={a.brief} label={a.label} brief={a.brief} ratio={a.ratio} />
            ))}
          </div>
        </Band>
      )}

      {/* ---- Adjacent products ---- */}
      <nav aria-label="More products" className="border-b border-line">
        <div className="grid gap-px bg-line md:grid-cols-2">
          {[
            { p: prev, dir: "Previous" as const },
            { p: next, dir: "Next" as const },
          ].map(({ p, dir }) =>
            p ? (
              <Link
                key={dir}
                href={`/products/${p.slug}`}
                className={`group bg-ground p-9 transition-colors hover:bg-ground-2 md:p-14 ${
                  dir === "Next" ? "md:text-right" : ""
                }`}
              >
                <p className="t-meta text-ink-3">{dir}</p>
                <p className="t-display-wide mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] text-ink transition-colors group-hover:text-accent-text">
                  {p.name}
                </p>
                <p className="mt-2 font-sans text-[0.875rem] text-ink-3">{p.category}</p>
              </Link>
            ) : null,
          )}
        </div>
      </nav>

      {/* ---- Close ---- */}
      <section className="border-b border-line bg-ground-2">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <h2 className="t-display max-w-[20ch] text-[clamp(2rem,5vw,3.75rem)] text-ink">
              Have an operation this should be pointed at?
            </h2>
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
