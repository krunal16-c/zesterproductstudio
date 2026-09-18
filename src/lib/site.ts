export const SITE = {
  name: "Zester Product Studio",
  short: "Zester",
  url: "https://zesterproductstudio.com",
  email: "partnerships@zesterproductstudio.com",
  positioning:
    "Zester Product Studio builds intelligent software and hardware products that improve how organizations operate.",
} as const;

export const NAV = [
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
] as const;

/** One label per intent. This is the only contact-intent CTA on the site. */
export const PRIMARY_CTA = { label: "Solve a Real Problem", href: "/contact" } as const;
