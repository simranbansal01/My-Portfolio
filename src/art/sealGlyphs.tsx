/**
 * The rail stamps.
 *
 * The reference runs a column of carved red seals down each margin. Simran's
 * equivalent is an auditor's stamp block — the marks you actually make on a
 * page you are reconciling: ticks, T-accounts, percentages, a magnifier over a
 * line item, an exception flag, a balance. Drawn here as knock-outs so the
 * glyph is the board showing through the ink, the way a real stamp works.
 */

export type SealArt = {
  id: string;
  /** Carrier shape. Diamonds break up the column, as in the reference. */
  shape: "square" | "diamond";
  /** Knock-out glyph, drawn on a 44×44 grid, stroked unless noted. */
  glyph: React.ReactNode;
};

const S = {
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const SEALS: SealArt[] = [
  {
    id: "tick",
    shape: "square",
    glyph: <path d="M11 23.5 L19 31 L34 12.5" strokeWidth={4.2} {...S} />,
  },
  {
    id: "t-account",
    shape: "square",
    glyph: (
      <g strokeWidth={3} {...S}>
        <path d="M9 14 H35" />
        <path d="M22 14 V35" />
        <path d="M12.5 21 H18.5" />
        <path d="M12.5 27 H17" />
        <path d="M26 21 H32" />
        <path d="M26 27 H30" />
      </g>
    ),
  },
  {
    id: "percent",
    shape: "diamond",
    glyph: (
      <g strokeWidth={3} {...S}>
        <path d="M14 30 L30 14" />
        <circle cx={15.5} cy={15.5} r={3.6} />
        <circle cx={28.5} cy={28.5} r={3.6} />
      </g>
    ),
  },
  {
    id: "ledger",
    shape: "square",
    glyph: (
      <g strokeWidth={2.8} {...S}>
        <path d="M10 13 H34" />
        <path d="M10 20 H29" />
        <path d="M10 27 H34" />
        <path d="M10 34 H25" />
        <circle cx={33} cy={34} r={2.2} fill="currentColor" stroke="none" />
      </g>
    ),
  },
  {
    id: "magnifier",
    shape: "square",
    glyph: (
      <g strokeWidth={3.2} {...S}>
        <circle cx={19.5} cy={19.5} r={9} />
        <path d="M26.5 26.5 L35 35" />
      </g>
    ),
  },
  {
    id: "balance",
    shape: "diamond",
    glyph: (
      <g strokeWidth={2.8} {...S}>
        <path d="M22 11 V33" />
        <path d="M10 16 H34" />
        <path d="M10 16 L6.5 25 H13.5 Z" />
        <path d="M34 16 L30.5 25 H37.5 Z" />
        <path d="M15 33 H29" />
      </g>
    ),
  },
  {
    id: "exception",
    shape: "square",
    glyph: (
      <g strokeWidth={3.2} {...S}>
        <path d="M14 34 V10" />
        <path d="M14 11 H33 L28 18 L33 25 H14" />
      </g>
    ),
  },
  {
    id: "reconcile",
    shape: "square",
    glyph: (
      <g strokeWidth={3} {...S}>
        <path d="M12 19 A10 10 0 0 1 32 17.5" />
        <path d="M32 25 A10 10 0 0 1 12 26.5" />
        <path d="M32 11 V18 H25" />
        <path d="M12 33 V26 H19" />
      </g>
    ),
  },
  {
    id: "stack",
    shape: "diamond",
    glyph: (
      <g strokeWidth={2.8} {...S}>
        <rect x={10} y={10} width={19} height={19} rx={1.5} />
        <path d="M15 34 H34 V15" />
      </g>
    ),
  },
  {
    id: "nib",
    shape: "square",
    glyph: (
      <g strokeWidth={2.8} {...S}>
        <path d="M22 9 L31 27 L22 35 L13 27 Z" />
        <path d="M22 18 V35" />
      </g>
    ),
  },
  {
    id: "abacus",
    shape: "square",
    glyph: (
      <g strokeWidth={2.6} {...S}>
        <path d="M10 15 H34" />
        <path d="M10 22 H34" />
        <path d="M10 29 H34" />
        <circle cx={16} cy={15} r={3} fill="currentColor" stroke="none" />
        <circle cx={27} cy={22} r={3} fill="currentColor" stroke="none" />
        <circle cx={19} cy={29} r={3} fill="currentColor" stroke="none" />
      </g>
    ),
  },
  {
    id: "coin",
    shape: "diamond",
    glyph: (
      <g strokeWidth={3} {...S}>
        <circle cx={22} cy={22} r={11} />
        <path d="M22 14 V30" />
        <path d="M17 18.5 H27" />
        <path d="M17 25.5 H27" />
      </g>
    ),
  },
];

