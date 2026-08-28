/**
 * The red line drawings.
 *
 * The reference sets a loose pen illustration into the right side of the hero
 * page and another inside the hand-drawn frame near the end. Simran's are the
 * two scenes her copy describes: someone tracing a number through a system,
 * and the desk it got traced on.
 *
 * Drawn as open strokes with plants crowding the foreground, so the drawing
 * sits *on* the page rather than being placed in a box on it.
 */

const PEN = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2.2,
};

/**
 * Hero: a figure at a window-sized panel, holding up a reconciled page. The
 * panel behind shows the shape of the thing being followed — a run of bars
 * with one exception marked.
 */
export function DeskScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 430"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ filter: "url(#wobble-soft)" }}
    >
      <g {...PEN}>
        {/* the panel */}
        <path d="M150 40 h250 v250 h-250 z" />
        <path d="M150 70 h250" />
        <path d="M162 55 h10" strokeWidth={1.6} />
        <path d="M380 48 v14" strokeWidth={1.6} />
        <path d="M392 48 v14" strokeWidth={1.6} />
        <path d="M356 50 h14 v12 h-14 z" strokeWidth={1.6} />

        {/* search field */}
        <path d="M186 92 h150 v26 h-150 z" strokeWidth={1.8} />
        <path d="M200 105 q8 -8 16 0 q8 8 16 0" strokeWidth={1.6} />
        <path d="M318 105 l8 0 -4 -5 m4 5 -4 5" strokeWidth={1.6} />

        {/* the run of bars, one flagged */}
        <g strokeWidth={1.8}>
          <path d="M190 240 v-40" />
          <path d="M212 240 v-66" />
          <path d="M234 240 v-28" />
          <path d="M256 240 v-84" />
          <path d="M278 240 v-52" />
          <path d="M300 240 v-96" />
          <path d="M322 240 v-34" />
          <path d="M190 240 h150" />
        </g>
        {/* the exception, circled */}
        <path d="M300 128 c14 -2 22 4 20 12 c-2 8 -14 12 -24 9 c-10 -3 -12 -13 -4 -18 c4 -3 8 -4 12 -3" />

        {/* zigzag under the panel — the manual follow-up */}
        <path d="M188 268 l10 -10 10 10 10 -10 10 10 10 -10 10 10" strokeWidth={1.8} />

        {/* the figure */}
        <path d="M240 400 c0 -40 12 -58 34 -58 c22 0 34 18 34 58" />
        <circle cx={274} cy={318} r={20} />
        <path d="M266 314 a3 3 0 0 1 6 0" strokeWidth={1.8} />
        <path d="M278 314 a3 3 0 0 1 6 0" strokeWidth={1.8} />
        <path d="M268 326 q6 6 12 0" strokeWidth={1.8} />
        <path d="M254 300 c4 -10 16 -14 24 -12 c10 2 16 8 16 14 c-8 -6 -28 -8 -40 -2 z" />
        {/* the page held up */}
        <path d="M240 356 l-42 -6 v-56 h52" />
        <g strokeWidth={1.5}>
          <path d="M208 306 h32" />
          <path d="M208 318 h24" />
          <path d="M208 330 h30" />
        </g>
        <path d="M226 340 l6 6 12 -16" strokeWidth={2.4} />
        <path d="M308 356 l24 -14" />

        {/* plants crowding the foreground */}
        <g>
          <path d="M84 430 c0 -60 18 -92 42 -104" />
          <path d="M126 326 c-22 -6 -32 -26 -26 -46 c22 0 36 16 34 40" />
          <path d="M126 340 c20 -12 26 -34 16 -52 c-18 10 -24 30 -18 48" />
          <path d="M102 384 c-18 -4 -28 -18 -26 -34 c18 0 30 12 30 30" />
          <path d="M100 400 c16 -8 22 -24 14 -38 c-14 8 -20 24 -16 36" />
          <path d="M40 430 c-4 -28 8 -46 26 -50" />
          <path d="M66 386 c-14 -6 -20 -20 -14 -32 c14 4 22 18 18 30" />
        </g>
        <g>
          <path d="M404 430 c-4 -66 12 -100 40 -112" />
          <path d="M444 322 c-22 -8 -30 -28 -22 -48 c22 2 34 20 30 44" />
          <path d="M446 336 c22 -10 30 -32 20 -50 c-18 8 -26 28 -22 46" />
          <path d="M420 386 c-18 -6 -26 -20 -22 -36 c18 2 28 16 26 34" />
          <path d="M470 430 c0 -30 12 -46 28 -50" />
        </g>

        {/* ground */}
        <path d="M0 430 c60 -12 120 -6 180 -8" strokeWidth={1.6} />
        <path d="M340 424 c60 -8 120 -2 180 -10" strokeWidth={1.6} />
      </g>
    </svg>
  );
}

/**
 * The drawing inside the hand-drawn frame on the closing card: a desk at
 * night, the lamp still on, one page still open.
 */
export function NightDeskScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 240"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ filter: "url(#wobble-soft)" }}
    >
      <g {...PEN}>
        {/* the desk */}
        <path d="M22 196 h296" />
        <path d="M44 196 v34" />
        <path d="M296 196 v34" />

        {/* the lamp, still on */}
        <path d="M62 196 v-46" />
        <path d="M48 196 h28" />
        <path d="M62 150 l26 -30" />
        <path d="M80 112 l32 12 -22 24 z" />
        <g strokeWidth={1.4}>
          <path d="M96 148 l10 20" />
          <path d="M82 152 l0 22" />
          <path d="M114 132 l20 10" />
        </g>

        {/* the open ledger, one line ticked */}
        <path d="M118 196 c30 -12 58 -12 88 0 c-30 8 -58 8 -88 0 z" />
        <path d="M162 192 v-20" />
        <g strokeWidth={1.3}>
          <path d="M130 186 h24" />
          <path d="M130 180 h20" />
          <path d="M172 186 h24" />
          <path d="M172 180 h18" />
        </g>
        <path d="M136 174 l5 5 9 -12" strokeWidth={2.4} />

        {/* the mug */}
        <path d="M224 196 h30 v-22 h-30 z" />
        <path d="M254 180 a7 7 0 0 1 0 12" />
        <path d="M232 166 c3 -6 -3 -8 0 -14" strokeWidth={1.5} />
        <path d="M243 164 c3 -6 -3 -8 0 -14" strokeWidth={1.5} />

        {/* a shelf of files above the desk */}
        <path d="M196 96 h122" />
        <g>
          <path d="M204 96 v-34 h14 v34" />
          <path d="M222 96 v-28 h12 v28" />
          <path d="M238 96 v-38 h16 v38" />
          <path d="M258 96 v-24 h11 v24" />
          <path d="M273 92 l30 -8 6 12 -30 8 z" />
        </g>
        <g strokeWidth={1.3}>
          <path d="M207 76 h8" />
          <path d="M241 74 h10" />
        </g>

        {/* a plant on the near corner */}
        <path d="M300 196 c0 -30 8 -46 20 -52" />
        <path d="M320 144 c-14 -4 -19 -16 -15 -28 c14 2 22 12 21 26" />
        <path d="M322 152 c13 -8 16 -22 10 -32 c-11 6 -16 20 -13 30" />

        {/* the chair, pushed back */}
        <path d="M56 230 h44" />
        <path d="M62 230 v-24 h32 v24" />
        <path d="M62 206 v-38 h32 v38" strokeWidth={1.6} />
      </g>
    </svg>
  );
}

/**
 * The polaroid's picture. A portrait is a real photograph and there isn't one
 * to use, so the frame holds the site's own object instead: a page under a
 * magnifier with one line ticked.
 */
export function PolaroidArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ filter: "url(#wobble-soft)" }}
    >
      <g {...PEN} strokeWidth={2.4}>
        <path d="M46 24 h108 v152 h-108 z" />
        <g strokeWidth={1.8}>
          <path d="M64 52 h72" />
          <path d="M64 70 h58" />
          <path d="M64 88 h72" />
          <path d="M64 106 h44" />
          <path d="M64 124 h64" />
          <path d="M64 142 h38" />
        </g>
        <path d="M104 96 l10 10 22 -28" strokeWidth={4} />
        <circle cx={122} cy={128} r={30} strokeWidth={3} />
        <path d="M144 150 l22 22" strokeWidth={4} />
      </g>
    </svg>
  );
}
