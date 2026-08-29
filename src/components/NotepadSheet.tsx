/**
 * A sheet off a notepad.
 *
 * The notepad reads from three things, in this order: the wire binding along
 * the top, the torn bottom edge where the sheet came away, and the stock it is
 * printed on. Ruling is deliberately faint and only used on the smaller
 * sheets — behind a paragraph of body copy it fights the text, and a notepad
 * that is hard to read is a costume rather than a design.
 */

type Stock = "plain" | "ruled" | "kraft";

const STOCK: Record<Stock, string> = {
  plain: "paper-plain",
  ruled: "notepad-ruled",
  kraft: "paper-kraft",
};

export function NotepadSheet({
  children,
  stock = "plain",
  /** Wire loops along the top edge. Off for a scrap that was torn free. */
  bound = true,
  className,
  style,
}: {
  children: React.ReactNode;
  stock?: Stock;
  bound?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={["relative", className ?? ""].join(" ")} style={style}>
      <div
        className={[
          "torn-bottom relative text-ink shadow-[0_26px_60px_-24px_rgba(0,0,0,.85)]",
          STOCK[stock],
          bound ? "pt-9" : "pt-6",
        ].join(" ")}
      >
        {bound && <Punches />}
        {children}
      </div>
      {bound && <Wire />}
    </div>
  );
}

/** Where the binding sits: nine positions, evenly spread inside a 6% inset. */
const LOOPS = 9;
const loopX = (i: number) => 6 + ((100 - 12) / (LOOPS - 1)) * i;

/** The hole centre, measured down from the sheet's top edge. */
const HOLE_TOP = 13;
const HOLE_SIZE = 9;

/**
 * The holes, punched out of the sheet. Board-coloured with an inset shadow, so
 * the paper reads as having thickness around the cut.
 */
function Punches() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
      {Array.from({ length: LOOPS }, (_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-board shadow-[inset_0_1px_1.5px_rgba(0,0,0,.55)]"
          style={{
            top: HOLE_TOP,
            left: `${loopX(i)}%`,
            width: HOLE_SIZE,
            height: HOLE_SIZE,
            marginLeft: -HOLE_SIZE / 2,
          }}
        />
      ))}
    </div>
  );
}

/**
 * The wire. Each loop runs from inside its hole, up over the sheet's top edge
 * and back down behind it — so the stroke has to start below the edge and
 * finish above it, through the same x the hole sits at.
 */
function Wire() {
  // The svg starts 9px above the sheet, so the sheet's edge is y=9 and the
  // hole centre is y = 9 + HOLE_TOP + HOLE_SIZE / 2.
  const holeY = 9 + HOLE_TOP + HOLE_SIZE / 2;
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-[9px] h-[32px] w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 32"
    >
      {Array.from({ length: LOOPS }, (_, i) => {
        const x = loopX(i);
        return (
          <path
            key={i}
            d={`M${x} ${holeY} C${x - 1.2} ${holeY - 8} ${x - 1.4} 5 ${x + 1.4} 1.5`}
            fill="none"
            stroke="var(--color-rule)"
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

/* ── the things that hold a board together ───────────────────────────── */

/** A pushpin. The only colour on the board, so it is used sparingly. */
export function Pushpin({
  size = 20,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* the shadow it throws on the paper */}
      <ellipse cx={13} cy={16} rx={7.5} ry={3.4} fill="rgba(20,19,14,.28)" />
      <circle cx={12} cy={11} r={7.4} fill="var(--color-pen)" />
      <circle cx={12} cy={11} r={7.4} fill="none" stroke="rgba(20,19,14,.35)" strokeWidth={0.8} />
      {/* specular, so it reads as domed rather than flat */}
      <ellipse cx={9.6} cy={8.4} rx={2.4} ry={1.7} fill="rgba(255,255,255,.5)" />
    </svg>
  );
}

/**
 * A strip of paper tape. Slightly cloudy and slightly darker at the torn ends,
 * which is what stops it reading as a grey rectangle.
 */
export function TapeStrip({
  width = 92,
  className,
  style,
}: {
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={["block h-[22px]", className ?? ""].join(" ")}
      style={{
        width,
        background:
          "linear-gradient(90deg, rgba(240,238,231,.06) 0%, rgba(240,238,231,.42) 14%, rgba(240,238,231,.34) 50%, rgba(240,238,231,.42) 86%, rgba(240,238,231,.06) 100%)",
        boxShadow: "0 2px 7px -4px rgba(0,0,0,.55)",
        ...style,
      }}
    />
  );
}
