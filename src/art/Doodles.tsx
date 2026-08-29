/**
 * Chalk margin doodles.
 *
 * The reference scatters white chalk objects across the dark board on either
 * side of the page. These are the objects from Simran's desk and her route:
 * a calculator, a stamp, a coffee ring, a paperclip, a filing tray, a desk
 * lamp, a spiral pad, a paper plane, a ruler, a cursor.
 *
 * All stroke, no fill — chalk has no interior.
 */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export type DoodleId =
  | "calculator"
  | "stamp"
  | "coffee"
  | "paperclip"
  | "tray"
  | "lamp"
  | "notepad"
  | "plane"
  | "ruler"
  | "cursor"
  | "computer"
  | "clip";

const ART: Record<DoodleId, React.ReactNode> = {
  calculator: (
    <g {...S}>
      <rect x={22} y={12} width={56} height={76} rx={6} />
      <rect x={30} y={20} width={40} height={16} rx={2} />
      <g strokeWidth={2.2}>
        <circle cx={34} cy={48} r={3.6} />
        <circle cx={46} cy={48} r={3.6} />
        <circle cx={58} cy={48} r={3.6} />
        <circle cx={34} cy={62} r={3.6} />
        <circle cx={46} cy={62} r={3.6} />
        <circle cx={58} cy={62} r={3.6} />
        <circle cx={34} cy={76} r={3.6} />
        <circle cx={46} cy={76} r={3.6} />
      </g>
      <path d="M64 56 v22" />
      <path d="M58 76 h12" />
    </g>
  ),

  stamp: (
    <g {...S}>
      <path d="M18 76 h64 v10 h-64 z" />
      <path d="M26 76 v-14 h48 v14" />
      <path d="M38 62 v-16 a12 12 0 0 1 24 0 v16" />
      <path d="M44 30 h12" />
    </g>
  ),

  coffee: (
    <g {...S}>
      <path d="M22 34 h48 v28 a24 24 0 0 1 -48 0 z" />
      <path d="M70 40 a12 12 0 0 1 0 20" />
      <path d="M34 24 c4 -6 -4 -8 0 -14" />
      <path d="M48 22 c4 -6 -4 -8 0 -14" />
      <path d="M16 88 h68" strokeWidth={2} />
    </g>
  ),

  paperclip: (
    <g {...S} strokeWidth={3}>
      <path d="M38 84 v-56 a12 12 0 0 1 24 0 v50 a7 7 0 0 1 -14 0 v-44 a5 5 0 0 1 10 0 v40" />
    </g>
  ),

  tray: (
    <g {...S}>
      <path d="M14 60 h20 l6 8 h20 l6 -8 h20 v24 h-72 z" />
      <path d="M26 60 v-14 h48 v14" />
      <path d="M34 46 v-14 h32 v14" />
      <path d="M40 38 h20" strokeWidth={2} />
    </g>
  ),

  lamp: (
    <g {...S}>
      <path d="M20 88 h34" />
      <path d="M37 88 v-30" />
      <path d="M37 58 l22 -24" />
      <path d="M50 26 l22 8 -14 18 z" />
      <path d="M64 56 l6 12" strokeWidth={2} />
      <path d="M56 60 l0 14" strokeWidth={2} />
      <path d="M72 50 l12 6" strokeWidth={2} />
    </g>
  ),

  notepad: (
    <g {...S}>
      <rect x={22} y={22} width={56} height={66} rx={3} />
      <g strokeWidth={2.2}>
        <path d="M32 22 v-8" />
        <path d="M44 22 v-8" />
        <path d="M56 22 v-8" />
        <path d="M68 22 v-8" />
        <path d="M32 40 h36" />
        <path d="M32 52 h36" />
        <path d="M32 64 h24" />
      </g>
    </g>
  ),

  plane: (
    <g {...S}>
      <path d="M12 46 l76 -22 -30 62 -12 -24 z" />
      <path d="M46 62 l42 -38" />
      <path d="M46 62 l-8 20 12 -10" />
    </g>
  ),

  ruler: (
    <g {...S}>
      <path d="M10 62 L74 12 L90 34 L26 84 Z" />
      <g strokeWidth={1.6}>
        <path d="M20 60 l6 8" />
        <path d="M29 53 l9 12" />
        <path d="M38 46 l6 8" />
        <path d="M47 39 l9 12" />
        <path d="M56 32 l6 8" />
        <path d="M65 25 l9 12" />
      </g>
    </g>
  ),

  cursor: (
    <g {...S}>
      <path d="M32 18 l40 34 -18 4 10 22 -8 4 -10 -22 -14 12 z" />
    </g>
  ),

  computer: (
    <g {...S}>
      <path d="M20 24 h58 v42 h-58 z" />
      <path d="M28 32 h42 v26 h-42 z" />
      <path d="M14 66 h70 v16 h-70 z" />
      <g strokeWidth={2.2}>
        <circle cx={42} cy={44} r={2} />
        <circle cx={58} cy={44} r={2} />
        <path d="M42 52 q8 6 16 0" />
        <path d="M24 74 h22" />
        <circle cx={66} cy={74} r={3} />
      </g>
    </g>
  ),

  clip: (
    <g {...S}>
      <path d="M30 84 c-14 -14 -14 -40 0 -54 s34 -14 44 2" />
      <path d="M74 32 l-8 -4 4 10" />
      <path d="M70 24 c14 14 14 40 0 54" strokeWidth={2} />
    </g>
  ),
};

export function Doodle({
  id,
  size = 90,
  className,
  style,
}: {
  id: DoodleId;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ filter: "url(#chalk-edge)", ...style }}
    >
      {ART[id]}
    </svg>
  );
}
