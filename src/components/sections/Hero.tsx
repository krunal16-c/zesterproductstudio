import { SITE, PRIMARY_CTA } from "@/lib/site";
import { Action } from "@/components/ui/Action";
import { SystemVisual } from "@/components/system/SystemVisual";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center border-b border-line pt-24 pb-10">
      <div className="shell grid w-full items-center gap-y-12 lg:grid-cols-12 lg:gap-x-14">
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="t-meta mb-7 text-accent-text">{SITE.name}</p>

          <h1 className="t-display text-[clamp(3.25rem,10.5vw,7.5rem)] text-ink">
            Build Better
            <br />
            Operations.
          </h1>

          <p className="t-lead mt-8">
            We build intelligent software and hardware products that improve how
            organizations operate.
          </p>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Action href={PRIMARY_CTA.href} variant="solid" size="lg">
              {PRIMARY_CTA.label}
            </Action>
            <Action href="/products" variant="outline" size="lg">
              Explore Products
            </Action>
          </div>
        </div>

        {/* The system visual is the hero's real asset. It is generated from the
            same stage model the rest of the page argues from, not decoration. */}
        <SystemVisual className="relative aspect-[4/3] w-full lg:col-span-6 lg:aspect-auto lg:h-[min(70vh,620px)] xl:col-span-7" />
      </div>
    </section>
  );
}
