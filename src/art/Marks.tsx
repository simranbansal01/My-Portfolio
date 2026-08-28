/**
 * Red-pen marks. Everything a hand adds on top of a printed page: the ellipse
 * a nav item gets on hover, an empty checkbox and the tick that lands in it,
 * the strike-through, an underline, and the rough rectangle that frames a
 * drawing.
 *
 * Each is drawn as an unclosed, slightly-overshooting stroke — a pen does not
 * meet its own start point.
 */

const PEN = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Dash length for the drawn-on marks, in screen pixels — comfortably longer
 * than the ring is ever rendered, so offsetting by it hides the stroke
 * completely at progress 0.
 */
const DRAW_LEN = 460;

/** Circled-in-pen. `progress` 0→1 draws it, for hover and scrub alike. */
export function Ellipse({ progress = 1 }: { progress?: number }) {
  const d =
    "M96 8 C58 -1 14 4 6 17 C-2 30 26 41 60 41 C94 41 118 32 112 20 C108 12 88 6 66 6";
  return (
    <svg
      viewBox="0 0 120 46"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <path
        d={d}
        {...PEN}
        strokeWidth={2.4}
        strokeDasharray={DRAW_LEN}
        strokeDashoffset={DRAW_LEN * (1 - progress)}
        vectorEffect="non-scaling-stroke"
        style={{ transition: "stroke-dashoffset 420ms cubic-bezier(.22,1,.36,1)" }}
      />
    </svg>
  );
}

/** The empty box. The tick is a separate component so it can land later. */
export function CheckBox({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="wobble-soft shrink-0"
    >
      <path
        d="M3.5 4 L20.5 3.2 L21 20.4 L3.2 21 L3.6 5"
        {...PEN}
        strokeWidth={1.8}
      />
    </svg>
  );
}

/** The tick that lands in the box. Scaled from nothing on state change. */
export function Tick({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="wobble"
    >
      <path d="M3 12.5 L9 19 L21.5 3.5" {...PEN} strokeWidth={2.6} />
    </svg>
  );
}

/** Struck through, once an item is ticked. `progress` 0→1 draws the stroke. */
export function Strike({ progress = 1 }: { progress?: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 block origin-left transition-transform duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)]"
      style={{ transform: `scaleX(${progress})` }}
    >
      <svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        focusable="false"
        className="h-full w-full overflow-visible"
      >
        <path
          d="M1 7 C40 4 70 9 104 5 C138 1 170 8 199 5"
          {...PEN}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** A ruled-under line, for section headings. */
export function Underline() {
  return (
    <svg
      viewBox="0 0 300 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="block h-2 w-full overflow-visible"
    >
      <path
        d="M2 4 C60 1 110 7 160 3 C210 -1 260 6 298 3"
        {...PEN}
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The rough rectangle drawn around a button or a drawing. */
export function Frame({ radius = 10 }: { radius?: number }) {
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="wobble-soft pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      <path
        d={`M${radius} 4 H190 C196 4 197 8 196 ${radius}
            V92 C196 96 192 97 186 96
            H12 C6 96 3 92 4 86 V12 C4 7 7 4 14 5`}
        {...PEN}
        strokeWidth={2.2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The dashed thread a polaroid hangs from. */
export function Thread({
  width = 190,
  height = 90,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className="overflow-visible"
    >
      <path
        d={`M3 0 V${height - 12} Q3 ${height - 3} 12 ${height - 3}
            H${width - 12} Q${width - 3} ${height - 3} ${width - 3} ${height - 12} V0`}
        {...PEN}
        strokeWidth={1.6}
        strokeDasharray="5 6"
      />
    </svg>
  );
}

/** A pen arrow, for pointing an annotation at the thing it annotates. */
export function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width={72}
      height={40}
      viewBox="0 0 72 40"
      aria-hidden="true"
      focusable="false"
      className="overflow-visible"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g {...PEN} strokeWidth={2}>
        <path d="M4 6 C22 4 44 12 62 30" />
        <path d="M62 30 L48 29" />
        <path d="M62 30 L58 17" />
      </g>
    </svg>
  );
}

/** The short rule that ties a margin note to the column it comments on. */
export function Leader({ side }: { side: "left" | "right" }) {
  return (
    <svg
      width={26}
      height={10}
      viewBox="0 0 26 10"
      aria-hidden="true"
      focusable="false"
      style={side === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M25 5 C18 3 10 7 1 4" {...PEN} strokeWidth={1.6} />
    </svg>
  );
}
