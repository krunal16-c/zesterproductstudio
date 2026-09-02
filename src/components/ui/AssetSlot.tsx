import { cn } from "@/lib/cn";

const RATIO: Record<string, string> = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

/**
 * An explicit, art-directed request for a real asset.
 *
 * This site never fabricates a product screenshot, a dashboard, or a factory
 * photograph. Where evidence is needed and does not yet exist, the page
 * reserves the exact space and states what is missing. Reserving the box also
 * keeps cumulative layout shift at zero once the real asset lands.
 */
export function AssetSlot({
  label,
  brief,
  ratio = "16/10",
  className,
}: {
  label: string;
  brief: string;
  ratio?: keyof typeof RATIO | string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative flex w-full flex-col justify-between overflow-hidden border border-dashed border-line-strong bg-ground-2 p-5 md:p-7",
        RATIO[ratio] ?? RATIO["16/10"],
        className,
      )}
    >
      {/* Corner registration marks. These read as a technical crop frame and
          only ever appear on a slot that is genuinely awaiting an asset. */}
      <span aria-hidden className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent" />
      <span aria-hidden className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-accent" />

      <figcaption className="t-meta text-accent-text">{label}</figcaption>
      <p className="max-w-[38ch] font-sans text-[0.8125rem] leading-relaxed text-ink-3">
        {brief}
      </p>
    </figure>
  );
}
