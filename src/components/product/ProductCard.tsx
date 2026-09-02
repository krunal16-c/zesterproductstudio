import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";

/**
 * One catalogue entry. The whole cell is the target, so the click area matches
 * the visual object rather than the four words of the title. Real figures are
 * given the most typographic weight after the name, because a supplied number
 * is the fastest evidence this page has.
 */
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { slug, name, category, positioning, stack, metrics, award, status } = product;

  return (
    <Link
      href={`/products/${slug}`}
      className="group relative flex flex-col gap-7 bg-ground p-7 transition-colors duration-300 hover:bg-ground-2 md:p-9"
    >
      {/* Accent edge advances on hover, the same left-to-right motion the
          primary action uses. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />

      <div className="flex items-start justify-between gap-6">
        <p className="t-meta text-ink-3">{category}</p>
        <span className="tnum shrink-0 text-[0.6875rem] tracking-[0.14em] text-ink-3">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div>
        <h3 className="t-display-wide flex items-center gap-2.5 text-[clamp(1.625rem,2.6vw,2.125rem)] text-ink">
          {name}
          <ArrowUpRight
            className="size-[0.85em] shrink-0 text-ink-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            strokeWidth={1.5}
            aria-hidden
          />
        </h3>
        <p className="mt-3 max-w-[46ch] font-sans text-[0.9375rem] leading-relaxed text-ink-2">
          {positioning}
        </p>
      </div>

      {(metrics?.length || award) && (
        <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
          {metrics?.map((m) => (
            <div key={m.label}>
              <p className="tnum text-[clamp(1.5rem,2.4vw,1.875rem)] leading-none text-accent-text">
                {m.value}
              </p>
              <p className="mt-2 max-w-[18ch] font-sans text-[0.75rem] leading-snug text-ink-3">
                {m.label}
              </p>
            </div>
          ))}
          {award && (
            <p className="max-w-[24ch] border-l border-accent pl-3.5 font-sans text-[0.75rem] leading-snug text-ink-2">
              {award}
            </p>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-2 pt-1">
        {stack.slice(0, 5).map((s) => (
          <span
            key={s}
            className="border border-line px-2 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-3"
          >
            {s}
          </span>
        ))}
        <span className="ml-auto font-mono text-[0.6875rem] tracking-[0.08em] text-ink-3">
          {status}
        </span>
      </div>
    </Link>
  );
}
