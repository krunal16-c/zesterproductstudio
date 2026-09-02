import Link from "next/link";
import { NAV, PRIMARY_CTA, SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ground-2">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-[36ch] font-sans text-[0.9375rem] leading-relaxed text-ink-2">
              {SITE.positioning}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-8 inline-block border-b border-accent pb-1 font-mono text-[0.8125rem] break-all text-ink transition-colors hover:text-accent-text"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Products" className="md:col-span-3 md:col-start-7">
            <h2 className="t-meta mb-5 text-ink-3">Products</h2>
            <ul className="space-y-3">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-sans text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio" className="md:col-span-3">
            <h2 className="t-meta mb-5 text-ink-3">Studio</h2>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={PRIMARY_CTA.href}
                  className="font-sans text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                >
                  {PRIMARY_CTA.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-16 border-t border-line pt-7 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-3">
          &copy; {new Date().getFullYear()} {SITE.name}. Software, edge AI,
          computer vision, and industrial IoT for organizations with complex
          operations.
        </p>
      </div>
    </footer>
  );
}
