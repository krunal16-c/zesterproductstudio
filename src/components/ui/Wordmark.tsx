import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The mark is a single filled accent square carrying the Z. A solid stamped
 * plate rather than an illustration: it holds at 16px in a browser tab and
 * still reads as the same object at the top of the page.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Zester Product Studio, home"
    >
      <span
        aria-hidden
        className="grid size-7 shrink-0 place-items-center bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
      >
        <span className="t-display-wide text-[1.0625rem] leading-none text-accent-ink">
          Z
        </span>
      </span>
      <span className="t-display-wide text-[1.0625rem] tracking-[0.01em] text-ink uppercase">
        Zester
      </span>
    </Link>
  );
}
