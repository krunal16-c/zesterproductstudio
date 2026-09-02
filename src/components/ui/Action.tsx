import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The site's only action primitive. Built on the shadcn/ui composition idiom
 * (cva + Slot) but re-authored for the industrial system: zero radius, mono
 * label, and a left-to-right accent fill on hover that reads as a machine
 * state advancing rather than a generic button glow.
 */
const action = cva(
  "act group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors select-none disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        /* Yellow fill, near-black label. 14.9:1 against #FFD400. */
        solid:
          "bg-accent text-accent-ink hover:text-accent-ink [&]:before:bg-[color-mix(in_srgb,var(--accent)_82%,black)]",
        /* Hairline box. Fills with accent on hover, label inverts to near-black. */
        outline:
          "border border-line-strong text-ink hover:text-accent-ink",
        /* Text-only, for tertiary navigation into a product. */
        quiet:
          "text-ink hover:text-accent-ink px-0 before:hidden hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-[6px] hover:no-underline",
      },
      size: {
        md: "h-11 px-5",
        lg: "h-14 px-7 text-[0.75rem]",
        sm: "h-9 px-4",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

type ActionProps = {
  asChild?: boolean;
  href?: string;
  /** Renders the trailing arrow that every forward action on this site carries. */
  arrow?: boolean;
} & VariantProps<typeof action> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Action({
  className,
  variant,
  size,
  asChild,
  href,
  arrow = true,
  children,
  ...props
}: ActionProps) {
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          strokeWidth={1.5}
          aria-hidden
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(action({ variant, size }), className)}>
        {content}
      </Link>
    );
  }

  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(action({ variant, size }), className)} {...props}>
      {content}
    </Comp>
  );
}
