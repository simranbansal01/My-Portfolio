import { Arrow, Underline } from "../art/Marks";

/**
 * "What I can do for you?" — the process poster, rebuilt from the reference
 * image as native page elements rather than a flat picture: taped paper notes
 * on the board, pen-drawn arrows, red margin notes, and the brushed title disc
 * at the centre.
 *
 * Desktop lays the seven steps out as the reference does — a ring around the
 * disc. A phone has no room for a ring, so the same steps run there as one
 * numbered column with an arrow between each.
 *
 * Strings are transcribed from the reference image. Its header and footer
 * lines are dropped on purpose: some of them contradict the site's own copy.
 */

type IconId =
  | "lens"
  | "docs"
  | "signpost"
  | "clipboard"
  | "laptop"
  | "chart"
  | "gears";

type Step = {
  no: string;
  title: string;
  icon: IconId;
  /** The red margin note the reference pairs with this step, if any. */
  note?: string;
  /** Which way that note is set beside the step in the ring. */
  noteSide: "left" | "right" | "down";
};

const STEPS: readonly Step[] = [
  { no: "01", title: "Problem Discovery", icon: "lens", noteSide: "right" },
  {
    no: "02",
    title: "Research & Insights",
    icon: "docs",
    note: "Users. Data. Patterns. Insights.",
    noteSide: "right",
  },
  {
    no: "03",
    title: "Product Strategy & Prioritisation",
    icon: "signpost",
    noteSide: "right",
  },
  {
    no: "04",
    title: "PRD & Product Execution",
    icon: "clipboard",
    note: "From problem to plan.",
    noteSide: "right",
  },
  {
    no: "05",
    title: "Building & Iterating",
    icon: "laptop",
    note: "Build. Test. Iterate.",
    noteSide: "down",
  },
  {
    no: "06",
    title: "Product Impact & Metrics",
    icon: "chart",
    note: "Measure what matters.",
    noteSide: "left",
  },
  {
    no: "07",
    title: "Process Improvement & Automation",
    icon: "gears",
    note: "Simpler processes. Greater impact.",
    noteSide: "left",
  },
];

const CLOSING = "Better Products. Bigger Impact.";

/** Where each step sits in the ring, as a percentage of the square stage. */
const SEATS = [
  { x: 50, y: 12 },
  { x: 83, y: 28 },
  { x: 86, y: 56 },
  { x: 69, y: 82 },
  { x: 40, y: 89 },
  { x: 15, y: 60 },
  { x: 18, y: 30 },
] as const;

const NOTE_ROTATE = [-3, 3, -2, 3, -3, 2, -4] as const;

/** A pen arrow dropped into the gap between two steps, pointing round the ring. */
const ARROWS = [
  { x: 68, y: 15, r: 12 },
  { x: 89, y: 41, r: 66 },
  { x: 82, y: 71, r: 116 },
  { x: 55, y: 91, r: 162 },
  { x: 25, y: 79, r: 210 },
  { x: 12, y: 43, r: 258 },
  { x: 32, y: 14, r: 306 },
] as const;

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

function Note({
  step,
  className,
}: {
  step: Step;
  className?: string;
}) {
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
          d="M122 10 C176 6 214 44 226 92 C238 142 216 194 158 208
             C104 221 40 210 18 158 C-3 108 12 52 58 26
             C78 15 100 12 122 10 Z"
          fill="var(--color-pen)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="hand text-[clamp(20px,3.4vw,38px)] leading-[0.95] font-bold text-paper">
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

function Steps() {
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

const RING_NOTE_SIDE: Record<Step["noteSide"], string> = {
  right: "left-full top-1 ml-3 w-[130px]",
  left: "right-full top-1 mr-3 w-[130px] text-right",
  down: "top-full left-1/2 mt-2 w-[130px] -translate-x-1/2 text-center",
};

export function Process() {
  return (
    <section
      aria-label="What I can do for you"
      className="relative z-10 px-4 pt-10 pb-20 lg:px-24"
    >
      <h2 className="sr-only">What I can do for you</h2>

      {/* desktop — the ring */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[680px] lg:block">
        {ARROWS.map((a, i) => (
          <span
            key={`arrow-${i}`}
            aria-hidden="true"
            className="absolute block text-paper/55"
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              transform: `translate(-50%,-50%) rotate(${a.r}deg)`,
            }}
          >
            <Arrow />
          </span>
        ))}

        <div className="absolute top-1/2 left-1/2 w-[37%] -translate-x-1/2 -translate-y-1/2">
          <Hub />
        </div>

        <ol className="contents">
          {STEPS.map((step, i) => (
            <li
              key={step.no}
              className="absolute w-[26%] max-w-[176px]"
              style={{
                left: `${SEATS[i].x}%`,
                top: `${SEATS[i].y}%`,
                transform: `translate(-50%,-50%) rotate(${NOTE_ROTATE[i]}deg)`,
              }}
            >
              <Note step={step} />
              {step.note && (
                <p
                  className={[
                    "hand absolute text-[15px] leading-tight text-pen",
                    RING_NOTE_SIDE[step.noteSide],
                  ].join(" ")}
                >
                  {step.note}
                </p>
              )}
            </li>
          ))}
        </ol>

        <span className="absolute top-[4%] left-[3%] block h-10 w-10">
          <Star />
        </span>
        <span className="absolute right-[2%] bottom-[3%] block h-9 w-12">
          <Steps />
        </span>
        <p className="hand absolute right-[1%] bottom-[9%] w-[120px] text-[15px] leading-tight text-pen">
          {CLOSING}
        </p>
      </div>

      {/* mobile — the column */}
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
                  className="my-3 block rotate-90 text-pen/55"
                >
                  <Arrow />
                </span>
              )}
              <Note
                step={step}
                className={["w-full", i % 2 ? "rotate-1" : "-rotate-1"].join(" ")}
              />
              {step.note && (
                <p className="hand mt-2 text-center text-[16px] leading-tight text-pen">
                  {step.note}
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className="hand mt-6 text-center text-[18px] text-pen">{CLOSING}</p>
      </div>
    </section>
  );
}
