import { Arrow, Underline } from "../art/Marks";

/**
 * "What I can do for you?" — the process poster, rebuilt from the reference
 * image as native page elements rather than a flat picture. Taped paper notes
 * sit straight on the board, joined by pen-drawn arrows, with the brushed red
 * title disc at the centre and the red margin notes around the edge.
 *
 * Desktop keeps the reference's arrangement: a tall portrait ring of seven
 * steps around the disc, in the same seats. A phone has no room for a ring,
 * so there the steps run as one numbered column, an arrow between each.
 *
 * Strings are transcribed from the reference image. Its header and footer
 * lines are dropped on purpose — some of them contradict the site's own copy.
 */

type IconId =
  | "lens"
  | "docs"
  | "signpost"
  | "clipboard"
  | "laptop"
  | "chart"
  | "gears";

type Step = { no: string; title: string; icon: IconId };

const STEPS: readonly Step[] = [
  { no: "01", title: "Problem Discovery", icon: "lens" },
  { no: "02", title: "Research & Insights", icon: "docs" },
  { no: "03", title: "Product Strategy & Prioritisation", icon: "signpost" },
  { no: "04", title: "PRD & Product Execution", icon: "clipboard" },
  { no: "05", title: "Building & Iterating", icon: "laptop" },
  { no: "06", title: "Product Impact & Metrics", icon: "chart" },
  { no: "07", title: "Process Improvement & Automation", icon: "gears" },
];

/** Seat of each step in the portrait ring, as a percentage of the stage. */
const SEATS = [
  { x: 50, y: 20, r: -3 },
  { x: 76, y: 30, r: 3 },
  { x: 85, y: 50, r: -2 },
  { x: 76, y: 71, r: 3 },
  { x: 43, y: 75, r: -3 },
  { x: 18, y: 57, r: 2 },
  { x: 24, y: 30, r: -4 },
] as const;

/**
 * The curved connectors, drawn in one overlay whose viewBox (300×450) is the
 * 2:3 of the stage, so these coordinates line up with the seats above. Each
 * path runs from just outside one note to just outside the next, bowing away
 * from the centre; the arrowhead is a marker that orients itself to the path.
 */
const CONNECTORS = [
  "M180 100 Q216 84 206 112", // 01 → 02
  "M232 164 Q272 150 250 198", // 02 → 03
  "M252 254 Q282 270 244 292", // 03 → 04
  "M196 322 Q176 356 160 332", // 04 → 05
  "M102 314 Q64 326 74 290", // 05 → 06
  "M58 228 Q40 196 70 164", // 06 → 07
  "M100 116 Q120 80 122 104", // 07 → 01
] as const;

/** Red margin notes, seated at the stage edge beside the step they comment on. */
const MARGIN_NOTES = [
  { text: "Users. Data. Patterns. Insights.", pos: { right: "-2%", top: "11%" }, align: "text-right", w: 116 },
  { text: "Simpler processes. Greater impact.", pos: { left: "-2%", top: "22%" }, align: "text-left", w: 104 },
  { text: "Measure what matters.", pos: { left: "-4%", top: "51%" }, align: "text-left", w: 78 },
  { text: "Build. Test. Iterate.", pos: { left: "0%", top: "78%" }, align: "text-left", w: 80 },
  { text: "From problem to plan.", pos: { right: "-2%", top: "67%" }, align: "text-right", w: 90 },
] as const;

const CLOSING = "Better Products. Bigger Impact.";

const ICONS: Record<IconId, React.ReactNode> = {
  lens: (
    <g>
      <circle cx="26" cy="26" r="15" />
      <path d="M37 37 L52 52" strokeWidth="3.4" />
    </g>
  ),
  docs: (
    <g>
      <path d="M14 14 h26 v30 h-26 z" />
      <path d="M20 20 h26 v30 h-26 z" />
      <g strokeWidth="2">
        <path d="M26 30 h14" />
        <path d="M26 37 h14" />
        <path d="M26 44 h9" />
      </g>
    </g>
  ),
  signpost: (
    <g>
      <path d="M32 54 V12" />
      <path d="M30 20 H15 l-6 6 6 6 h15 z" />
      <path d="M34 34 H51 l6 6 -6 6 H34 z" />
    </g>
  ),
  clipboard: (
    <g>
      <path d="M16 14 h32 v40 h-32 z" />
      <path d="M26 10 h12 v8 h-12 z" />
      <g strokeWidth="2.2">
        <path d="M22 28 l3 3 5 -7" />
        <path d="M36 29 h8" />
        <path d="M22 40 l3 3 5 -7" />
        <path d="M36 41 h8" />
      </g>
    </g>
  ),
  laptop: (
    <g>
      <path d="M16 16 h32 v22 h-32 z" />
      <path d="M10 44 h44 l-4 6 h-36 z" />
      <g strokeWidth="2.2">
        <path d="M24 34 v-8" />
        <path d="M31 34 v-13" />
        <path d="M38 34 v-6" />
      </g>
    </g>
  ),
  chart: (
    <g>
      <path d="M14 48 h37" />
      <g strokeWidth="3">
        <path d="M20 48 v-9" />
        <path d="M29 48 v-18" />
        <path d="M38 48 v-12" />
        <path d="M47 48 v-24" />
      </g>
      <g strokeWidth="2.2">
        <path d="M16 40 L46 14" />
        <path d="M46 14 l-9 0 M46 14 l0 9" />
      </g>
    </g>
  ),
  gears: (
    <g>
      <g>
        <circle cx="25" cy="27" r="8" />
        <path
          d="M25 15 v5 M25 34 v5 M13 27 h5 M32 27 h5 M17 19 l3 3 M30 32 l3 3 M33 19 l-3 3 M20 32 l-3 3"
          strokeWidth="2"
        />
      </g>
      <g style={{ stroke: "var(--color-pen)" }}>
        <circle cx="41" cy="40" r="6" />
        <path
          d="M41 30 v4 M41 46 v4 M31 40 h4 M47 40 h4 M34 33 l3 3 M45 44 l3 3 M48 33 l-3 3 M37 44 l-3 3"
          strokeWidth="2"
        />
      </g>
    </g>
  ),
};

function Icon({ id }: { id: IconId }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className="h-9 w-9 shrink-0"
      style={{ filter: "url(#wobble-soft)" }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[id]}
      </g>
    </svg>
  );
}

/** A torn strip of tape over the top edge of a note. Note 01 gets the red one. */
function Tape({ red = false }: { red?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3",
        red ? "bg-pen/70" : "bg-kraft/70",
      ].join(" ")}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,.28)" }}
    />
  );
}

function Note({ step, className }: { step: Step; className?: string }) {
  return (
    <article
      className={[
        "paper-plain relative bg-paper px-4 py-4 text-ink shadow-[0_16px_38px_-16px_rgba(0,0,0,.7)]",
        className ?? "",
      ].join(" ")}
    >
      <Tape red={step.no === "01"} />
      <div className="flex items-center gap-2">
        <span className="hand text-[20px] leading-none text-pen">{step.no}</span>
        <span className="ml-auto text-ink/75">
          <Icon id={step.icon} />
        </span>
      </div>
      <p className="hand mt-2 text-[18px] leading-[1.12] font-semibold text-ink">
        {step.title}
      </p>
      <span className="mt-1 block w-2/3 text-pen">
        <Underline />
      </span>
    </article>
  );
}

/** The brushed red disc with the title on it. */
function Hub() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 240 224"
        aria-hidden="true"
        focusable="false"
        className="w-full"
        style={{ filter: "url(#wobble)" }}
      >
        <path
          d="M122 8 C182 4 222 42 230 96 C238 150 214 198 152 210
             C96 221 34 208 16 152 C-2 100 14 46 60 22
             C80 12 100 10 122 8 Z"
          fill="var(--color-pen)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <p className="hand text-[clamp(22px,3vw,42px)] leading-[0.92] font-bold text-paper">
          What
          <br />
          I can do
          <br />
          for you?
        </p>
        <span className="mt-1 block w-24 text-pen-soft">
          <Underline />
        </span>
      </div>
    </div>
  );
}

function Star() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full text-pen"
      style={{ filter: "url(#wobble)" }}
    >
      <path
        d="M24 4 L29 18 L44 18 L32 28 L36 43 L24 34 L12 43 L16 28 L4 18 L19 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StepsFlag() {
  return (
    <svg
      viewBox="0 0 68 52"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full text-paper/40"
      style={{ filter: "url(#wobble-soft)" }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 46 h14 v-11 h14 v-11 h14 v-11 h10" />
        <path d="M54 3 v13" />
        <path d="M54 3 l12 4 -12 4" />
      </g>
    </svg>
  );
}

/** The white curved arrows that run the ring, drawn over the whole stage. */
function Connectors() {
  return (
    <svg
      viewBox="0 0 300 450"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ color: "rgba(232,230,223,0.7)" }}
    >
      <defs>
        <marker
          id="proc-arrowhead"
          viewBox="0 0 12 12"
          refX="9"
          refY="6"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path
            d="M1 1 L11 6 L1 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      {CONNECTORS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          markerEnd="url(#proc-arrowhead)"
        />
      ))}
    </svg>
  );
}

export function Process() {
  return (
    <section
      aria-label="What I can do for you"
      className="relative z-10 px-4 pt-10 pb-16 lg:px-12"
    >
      <h2 className="sr-only">What I can do for you</h2>

      {/* desktop — the portrait ring, sitting straight on the board */}
      <div className="relative mx-auto my-2 hidden aspect-[2/3] w-full max-w-[780px] lg:block">
        <Connectors />

        <div className="absolute top-1/2 left-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2">
          <Hub />
        </div>

        <ol className="contents">
          {STEPS.map((step, i) => (
            <li
              key={step.no}
              className="absolute w-[20%] max-w-[168px]"
              style={{
                left: `${SEATS[i].x}%`,
                top: `${SEATS[i].y}%`,
                transform: `translate(-50%,-50%) rotate(${SEATS[i].r}deg)`,
              }}
            >
              <Note step={step} />
            </li>
          ))}
        </ol>

        {MARGIN_NOTES.map((n) => (
          <div
            key={n.text}
            className="absolute"
            style={{ ...n.pos, width: n.w }}
          >
            <p
              className={["hand text-[15px] leading-tight text-pen", n.align].join(
                " ",
              )}
            >
              {n.text}
            </p>
            <span className="mt-0.5 block w-3/4 text-pen">
              <Underline />
            </span>
          </div>
        ))}

        <span className="absolute h-11 w-11" style={{ left: "13%", top: "13%" }}>
          <Star />
        </span>
        <span className="absolute h-10 w-14" style={{ left: "74%", top: "86%" }}>
          <StepsFlag />
        </span>
        <div className="absolute w-[118px]" style={{ right: "1%", top: "83%" }}>
          <p className="hand text-right text-[15px] leading-tight text-pen">
            {CLOSING}
          </p>
          <span className="mt-0.5 ml-auto block w-3/4 text-pen">
            <Underline />
          </span>
        </div>
      </div>

      {/* mobile — the same steps as one numbered column */}
      <div className="mx-auto max-w-[320px] lg:hidden">
        <div className="mx-auto w-[240px]">
          <Hub />
        </div>
        <ol className="mt-6 flex flex-col items-center">
          {STEPS.map((step, i) => (
            <li key={step.no} className="flex w-full flex-col items-center">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="my-3 block rotate-90 text-paper/60"
                >
                  <Arrow />
                </span>
              )}
              <Note
                step={step}
                className={["w-full", i % 2 ? "rotate-1" : "-rotate-1"].join(" ")}
              />
            </li>
          ))}
        </ol>
        <p className="hand mt-6 text-center text-[18px] text-pen">{CLOSING}</p>
      </div>
    </section>
  );
}
