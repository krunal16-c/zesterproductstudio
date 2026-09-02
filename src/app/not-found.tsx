import { Action } from "@/components/ui/Action";
import { PRIMARY_CTA } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center border-b border-line">
      <div className="shell py-32">
        <p className="t-meta mb-8 text-accent-text">Error 404</p>
        <h1 className="t-display max-w-[16ch] text-[clamp(2.75rem,8vw,6rem)] text-ink">
          No route to that page.
        </h1>
        <p className="t-body mt-8">
          The address exists but nothing is served from it. The catalogue below
          is the complete set of products.
        </p>
        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Action href="/products" variant="solid" size="lg">
            Explore products
          </Action>
          <Action href={PRIMARY_CTA.href} variant="outline" size="lg">
            {PRIMARY_CTA.label}
          </Action>
        </div>
      </div>
    </section>
  );
}
