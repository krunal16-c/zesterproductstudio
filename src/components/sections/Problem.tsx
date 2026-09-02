import { Reveal } from "@/components/ui/Reveal";

/* --------------------------------------------------------------------------
   Each diagram draws the failure it is named after. The loop never exits, the
   systems never connect, the signal arrives after the decision, and the part
   never seats in its socket. All four run on transform and offset-distance
   only, and all four stop under prefers-reduced-motion via the global gate.
   -------------------------------------------------------------------------- */

const S = { className: "h-full w-full", viewBox: "0 0 160 100", fill: "none" } as const;

const stroke = "var(--ink-3)";
const accent = "var(--accent)";

function ManualWork() {
  return (
    <svg {...S} role="img" aria-label="A work loop that always returns to the same manual step">
      <rect x="18" y="38" width="24" height="24" stroke={stroke} strokeWidth="1.5" />
      <rect x="68" y="18" width="24" height="24" stroke={stroke} strokeWidth="1.5" />
      <rect x="118" y="38" width="24" height="24" stroke={stroke} strokeWidth="1.5" />
      <rect x="68" y="58" width="24" height="24" stroke={accent} strokeWidth="1.5" />
      <path
        id="loopPath"
        d="M30 38 L80 18 L130 38 L130 62 L80 82 L30 62 Z"
        stroke={stroke}
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <rect
        x="-2.5"
        y="-2.5"
        width="5"
        height="5"
        fill={accent}
        className="dg-path dg-loop"
        style={{ ["--path" as string]: "path('M30 38 L80 18 L130 38 L130 62 L80 82 L30 62 Z')" }}
      />
    </svg>
  );
}

function Disconnected() {
  return (
    <svg {...S} role="img" aria-label="Four systems holding data that never connects">
      {[
        [24, 24],
        [112, 24],
        [24, 62],
        [112, 62],
      ].map(([x, y], i) => (
        <g key={i} className="dg-drift" style={{ ["--drift" as string]: `${i % 2 ? 3 : -3}px` }}>
          <rect x={x} y={y} width="26" height="18" stroke={stroke} strokeWidth="1.5" />
          <rect x={x + 5} y={y + 5} width="6" height="2" fill={stroke} />
          <rect x={x + 5} y={y + 10} width="12" height="2" fill={stroke} />
        </g>
      ))}
      {/* Pathways that are drawn but never complete. */}
      <path d="M50 33 H108" stroke={accent} strokeWidth="1.25" className="dg-dash" />
      <path d="M50 71 H108" stroke={accent} strokeWidth="1.25" className="dg-dash" />
      <path d="M37 42 V62" stroke={stroke} strokeWidth="1.25" className="dg-dash" />
      <path d="M125 42 V62" stroke={stroke} strokeWidth="1.25" className="dg-dash" />
    </svg>
  );
}

function SlowDecisions() {
  return (
    <svg {...S} role="img" aria-label="A signal arriving after the decision point has passed">
      <path d="M12 50 H148" stroke={stroke} strokeWidth="1" strokeOpacity="0.4" />
      <path d="M100 30 V70" stroke={accent} strokeWidth="1.5" className="dg-flash" />
      <text x="100" y="84" fill={stroke} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
        DECISION
      </text>
      <rect x="8" y="44" width="12" height="12" stroke={stroke} strokeWidth="1.5" />
      <circle
        r="3"
        fill={accent}
        className="dg-path dg-late"
        style={{ ["--path" as string]: "path('M24 50 H144')" }}
      />
      <path d="M140 44 L148 50 L140 56" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

function WrongFit() {
  return (
    <svg {...S} role="img" aria-label="A generic component that does not seat into the operation it is meant to fit">
      <path
        d="M96 20 H150 V80 H96"
        stroke={stroke}
        strokeWidth="1.5"
      />
      {/* The socket is shaped by the operation. */}
      <path
        d="M96 20 V38 H78 V62 H96 V80"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <g className="dg-reach" style={{ ["--reach" as string]: "10px" }}>
        <rect x="18" y="34" width="42" height="32" stroke={accent} strokeWidth="1.5" />
        <path d="M60 42 H70" stroke={accent} strokeWidth="1.5" />
        <path d="M60 58 H70" stroke={accent} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

const PROBLEMS = [
  {
    title: "Manual Work",
    body: "Workflows still depend on repetitive human effort.",
    Diagram: ManualWork,
  },
  {
    title: "Disconnected Systems",
    body: "Data exists across tools, machines, documents, and people.",
    Diagram: Disconnected,
  },
  {
    title: "Slow Decisions",
    body: "Critical information arrives too late.",
    Diagram: SlowDecisions,
  },
  {
    title: "Technology That Doesn't Fit",
    body: "Generic software rarely matches the way an organization actually operates.",
    Diagram: WrongFit,
  },
];

export function Problem() {
  return (
    <section className="border-b border-line">
      <div className="shell py-24 md:py-32">
        <div className="max-w-[26ch]">
          <h2 className="t-display text-[clamp(2.25rem,5.6vw,4.5rem)] text-ink">
            Most software stops at the screen.
          </h2>
        </div>
        <p className="t-body mt-7">
          Organizations don&apos;t need another impressive demo. They need
          technology that survives contact with the real world.
        </p>

        <div className="mt-16 grid border-t border-line md:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map(({ title, body, Diagram }, i) => (
            <Reveal
              key={title}
              delay={i * 0.07}
              className="flex flex-col gap-6 border-b border-line px-0 py-8 md:px-7 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="h-24 w-full max-w-[220px] opacity-90">
                <Diagram />
              </div>
              <div>
                <h3 className="t-display-wide text-[1.375rem] text-ink">{title}</h3>
                <p className="mt-2.5 max-w-[34ch] font-sans text-[0.875rem] leading-relaxed text-ink-2">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
