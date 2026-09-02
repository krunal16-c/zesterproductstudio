import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SITE, PRIMARY_CTA } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: PRIMARY_CTA.label,
  description:
    "Start a conversation with Zester Product Studio about an operational problem worth solving.",
  alternates: { canonical: "/contact" },
};

/**
 * There is no form here on purpose. A form that posts nowhere is worse than an
 * address, and this site does not ship a surface it cannot honour. The page
 * gives the one channel that works and tells you what to put in it.
 */
const INCLUDE = [
  {
    title: "The operation, not the feature",
    body: "What work is being done today, by whom, and where it breaks down. The system follows from that; it does not lead it.",
  },
  {
    title: "Where the data already lives",
    body: "Machines, documents, spreadsheets, an existing platform, or nowhere at all. All four are workable answers.",
  },
  {
    title: "What a good outcome looks like",
    body: "The measurement you would use to decide this worked. If there is not one yet, say so and we will find it together.",
  },
  {
    title: "Constraints that are real",
    body: "Procurement rules, air-gapped environments, existing vendors, timelines. These shape the architecture from the first day.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        lines={["Bring us a", "real problem."]}
        lead="We take on work where the operational problem is specific and the constraints are real. One address, read by the people who would build it."
      >
        <Reveal delay={0.36} className="mt-12">
          <a
            href={`mailto:${SITE.email}`}
            className="group inline-flex max-w-full items-center gap-4 border-b-2 border-accent pb-2 font-mono text-[clamp(1rem,3vw,1.75rem)] break-all text-ink transition-colors hover:text-accent-text"
          >
            {SITE.email}
            <ArrowUpRight
              className="size-[0.8em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.5}
              aria-hidden
            />
          </a>
        </Reveal>
      </PageHeader>

      <section className="border-b border-line bg-ground-2">
        <div className="shell py-16 md:py-24">
          <p className="t-meta mb-10 text-accent-text">What to include</p>

          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {INCLUDE.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.07}
                className="flex flex-col gap-5 bg-ground-2 p-7 md:p-9"
              >
                <span className="tnum text-[0.6875rem] tracking-[0.14em] text-accent-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="t-display-wide text-[1.375rem] text-ink">{item.title}</h2>
                  <p className="mt-3 max-w-[42ch] font-sans text-[0.9375rem] leading-relaxed text-ink-2">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell py-16 md:py-24">
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="t-meta text-accent-text">What happens next</p>
            </div>
            <div className="lg:col-span-9">
              <Reveal>
                <p className="max-w-[58ch] font-sans text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.62] text-ink-2">
                  We read it, and if the problem is one we can genuinely help with,
                  we reply with what we would need to understand before proposing
                  anything. If it is not a fit, we say that instead of scheduling a
                  call to find out slowly.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
