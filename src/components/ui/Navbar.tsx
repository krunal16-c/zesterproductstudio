"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { NAV, PRIMARY_CTA, SITE } from "@/lib/site";
import { Action } from "./Action";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onContactPage = pathname === PRIMARY_CTA.href;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ground/88 backdrop-blur-xl">
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative font-sans text-[0.8125rem] tracking-[-0.005em] text-ink-2 transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {!onContactPage && (
              <Action href={PRIMARY_CTA.href} variant="solid" size="sm" className="hidden sm:inline-flex">
                {PRIMARY_CTA.label}
              </Action>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-9 place-items-center border border-line text-ink lg:hidden"
            >
              <Menu className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu. A separate composition, not the desktop nav stacked. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ground lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-line">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center border border-line text-ink"
              >
                <X className="size-4" strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            <nav aria-label="Primary, mobile" className="shell flex flex-1 flex-col justify-center gap-1 py-10">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="t-display block border-b border-line py-5 text-[clamp(2.5rem,13vw,4rem)] text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell shrink-0 space-y-5 border-t border-line py-7">
              <Action href={PRIMARY_CTA.href} variant="solid" size="lg" className="w-full">
                {PRIMARY_CTA.label}
              </Action>
              <a
                href={`mailto:${SITE.email}`}
                className="block font-mono text-[0.75rem] break-all text-ink-3 transition-colors hover:text-accent-text"
              >
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
