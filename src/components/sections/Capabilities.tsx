import { Reveal } from "@/components/ui/Reveal";

/* --------------------------------------------------------------------------
   Four capability diagrams. Each one draws the actual signal path for that
   capability, because the buyer's question is "where does this physically run"
   and a diagram answers it faster than a paragraph.
   -------------------------------------------------------------------------- */

const ink = "var(--ink-3)";
const accent = "var(--accent)";

/** Sensor to device to local decision. The link upstream is deliberately thin
    and dashed: the decision does not depend on it. */
function EdgeDiagram() {
  return (
    <svg viewBox="0 0 300 130" fill="none" className="h-full w-full" role="img"
      aria-label="A sensor feeding a local device that decides on site, with only a thin link upstream">
      <path d="M14 78 h30" stroke={ink} strokeWidth="1.25" />
      <circle cx="14" cy="78" r="5" stroke={accent} strokeWidth="1.5" />
      <path d="M8 68 a10 10 0 0 1 12 0" stroke={accent} strokeWidth="1.25" className="dg-pulse" />
      <path d="M5 60 a16 16 0 0 1 18 0" stroke={accent} strokeWidth="1" className="dg-pulse" style={{ animationDelay: "0.3s" }} />

      <rect x="44" y="52" width="72" height="52" stroke={ink} strokeWidth="1.5" />
      <rect x="58" y="66" width="44" height="24" stroke={accent} strokeWidth="1.5" />
      {[62, 70, 78, 86, 94].map((x) => (
        <path key={x} d={`M${x} 66 v-8`} stroke={ink} strokeWidth="1" />
      ))}
      {[62, 70, 78, 86, 94].map((x) => (
        <path key={x} d={`M${x} 90 v8`} stroke={ink} strokeWidth="1" />
      ))}

      <path d="M116 78 h56" stroke={ink} strokeWidth="1.25" />
      <circle r="3.5" fill={accent} className="dg-path dg-travel"
        style={{ ["--path" as string]: "path('M44 78 H172')" }} />

      <rect x="172" y="60" width="44" height="36" stroke={ink} strokeWidth="1.5" />
      <path d="M182 78 h10 l4 -8 l4 16 l4 -8 h6" stroke={accent} strokeWidth="1.5" />

      <path d="M216 78 h34" stroke={ink} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 6" />
      <rect x="250" y="66" width="36" height="24" stroke={ink} strokeWidth="1" strokeOpacity="0.4" />
      <text x="268" y="106" fill={ink} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" opacity="0.55">
        UPSTREAM
      </text>
    </svg>
  );
}

/** Camera to perception grid to event to action. */
function VisionDiagram() {
  return (
    <svg viewBox="0 0 240 150" fill="none" className="h-full w-full" role="img"
      aria-label="A camera view resolved into detections, one of which raises an event and triggers an action">
      <path d="M14 60 L14 90 L40 100 L40 50 Z" stroke={ink} strokeWidth="1.5" />
      <path d="M40 58 L96 34 L96 116 L40 92 Z" stroke={ink} strokeWidth="1" strokeOpacity="0.35" />

      <rect x="100" y="34" width="82" height="82" stroke={ink} strokeWidth="1.25" />
      {[54, 74, 94].map((y) => (
        <path key={y} d={`M100 ${y} h82`} stroke={ink} strokeWidth="0.75" strokeOpacity="0.3" />
      ))}
      {[120, 140, 160].map((x) => (
        <path key={x} d={`M${x} 34 v82`} stroke={ink} strokeWidth="0.75" strokeOpacity="0.3" />
      ))}
      <rect x="120" y="54" width="40" height="40" stroke={accent} strokeWidth="1.5" />
      <g className="dg-scan" style={{ ["--scan" as string]: "70px" }}>
        <path d="M100 40 h82" stroke={accent} strokeWidth="1" strokeOpacity="0.65" />
      </g>

      <path d="M182 75 h20" stroke={ink} strokeWidth="1.25" />
      <rect x="202" y="65" width="20" height="20" stroke={accent} strokeWidth="1.5" className="dg-pulse" />
      <path d="M212 85 v22" stroke={ink} strokeWidth="1.25" />
      <path d="M206 101 l6 6 l6 -6" stroke={accent} strokeWidth="1.5" />
      <text x="212" y="128" fill={ink} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
        ACTION
      </text>
    </svg>
  );
}

/** Machines on a shared bus, reporting into one operational record. */
function IoTDiagram() {
  return (
    <svg viewBox="0 0 240 150" fill="none" className="h-full w-full" role="img"
      aria-label="Machines and environment sensors reporting onto one operational bus">
      <path d="M20 96 H220" stroke={ink} strokeWidth="1.5" />
      <circle r="3.5" fill={accent} className="dg-path dg-travel"
        style={{ ["--path" as string]: "path('M20 96 H220')" }} />
      <circle r="3.5" fill={accent} className="dg-path dg-travel"
        style={{ ["--path" as string]: "path('M20 96 H220')", animationDelay: "-2s" }} />

      {[36, 84, 132, 180].map((x, i) => (
        <g key={x}>
          <path d={`M${x + 16} 96 v-${20 + (i % 2) * 14}`} stroke={ink} strokeWidth="1.25" />
          <rect
            x={x}
            y={96 - (20 + (i % 2) * 14) - 26}
            width="32"
            height="26"
            stroke={i === 1 ? accent : ink}
            strokeWidth="1.5"
          />
          <path
            d={`M${x + 7} ${96 - (20 + (i % 2) * 14) - 14} h18`}
            stroke={i === 1 ? accent : ink}
            strokeWidth="1"
          />
        </g>
      ))}

      <path d="M120 96 v22" stroke={ink} strokeWidth="1.25" />
      <rect x="94" y="118" width="52" height="22" stroke={accent} strokeWidth="1.5" />
    </svg>
  );
}

/** A workflow that executes, checks itself, and improves. The return edge is
    the point of the diagram. */
function SoftwareDiagram() {
  return (
    <svg viewBox="0 0 300 130" fill="none" className="h-full w-full" role="img"
      aria-label="A workflow state machine that executes, verifies, and feeds its result back into itself">
      {[
        { x: 16, label: "INTAKE" },
        { x: 96, label: "EXECUTE" },
        { x: 176, label: "VERIFY" },
        { x: 250, label: "" },
      ].map(({ x, label }, i) =>
        i === 3 ? (
          <g key={x}>
            <rect x={x} y="42" width="34" height="34" stroke={accent} strokeWidth="1.5" />
            <path d={`M${x + 9} 59 l6 6 l12 -14`} stroke={accent} strokeWidth="1.75" />
          </g>
        ) : (
          <g key={x}>
            <rect x={x} y="42" width="60" height="34" stroke={i === 1 ? accent : ink} strokeWidth="1.5" />
            <text x={x + 30} y="63" fill={ink} fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle">
              {label}
            </text>
          </g>
        ),
      )}

      {[76, 156, 236].map((x) => (
        <g key={x}>
          <path d={`M${x} 59 h${x === 236 ? 14 : 20}`} stroke={ink} strokeWidth="1.25" />
          <path d={`M${x + (x === 236 ? 8 : 14)} 55 l4 4 l-4 4`} stroke={ink} strokeWidth="1.25" />
        </g>
      ))}

      {/* The learning edge. */}
      <path d="M206 76 V102 H46 V76" stroke={accent} strokeWidth="1.25" strokeDasharray="4 5" />
      <path d="M42 82 l4 -6 l4 6" stroke={accent} strokeWidth="1.25" />
      <circle r="3" fill={accent} className="dg-path dg-travel"
        style={{ ["--path" as string]: "path('M206 76 V102 H46 V76')" }} />
      <text x="126" y="118" fill={ink} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">
        IMPROVE
      </text>
    </svg>
  );
}

const PILLARS = [
  {
    title: "Edge Intelligence",
    body: "AI running close to where work happens.",
    Diagram: EdgeDiagram,
    span: "lg:col-span-4",
    ground: "bg-ground-2",
  },
  {
    title: "Computer Vision",
    body: "Turn physical environments into measurable systems.",
    Diagram: VisionDiagram,
    span: "lg:col-span-2",
    ground: "bg-ground",
  },
  {
    title: "Industrial IoT",
    body: "Connect machines, environments, and operational data.",
    Diagram: IoTDiagram,
    span: "lg:col-span-2",
    ground: "bg-ground",
  },
  {
    title: "Intelligent Software",
    body: "Turn complex workflows into systems that execute, learn, and improve.",
    Diagram: SoftwareDiagram,
    span: "lg:col-span-4",
    ground: "bg-ground-3",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 border-b border-line">
      <div className="shell py-24 md:py-32">
        <p className="t-meta mb-6 text-accent-text">What we build</p>
        <h2 className="t-display max-w-[16ch] text-[clamp(2.25rem,5.6vw,4.5rem)] text-ink">
          Products for real operations.
        </h2>

        {/* Four items, four cells. Sizes vary so the grid has rhythm and the
            two heavier capabilities get the width their diagrams need. */}
        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-6">
          {PILLARS.map(({ title, body, Diagram, span, ground }, i) => (
            <Reveal
              key={title}
              delay={i * 0.06}
              className={`${span} ${ground} flex flex-col gap-8 p-7 md:p-10`}
            >
              <div className="h-32 w-full md:h-40">
                <Diagram />
              </div>
              <div className="mt-auto">
                <h3 className="t-display-wide text-[clamp(1.5rem,2.4vw,2rem)] text-ink">{title}</h3>
                <p className="mt-2.5 max-w-[38ch] font-sans text-[0.9375rem] leading-relaxed text-ink-2">
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
