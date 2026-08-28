import { SEALS, type SealArt } from "./sealGlyphs";

export { SEALS };

/** One stamp: red ink block, glyph knocked out of it. */
export function Seal({ art, size = 44 }: { art: SealArt; size?: number }) {
  const diamond = art.shape === "diamond";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
      style={{ filter: "url(#stamp-ink)" }}
    >
      <mask id={`seal-${art.id}`}>
        {diamond ? (
          <rect
            x={5}
            y={5}
            width={34}
            height={34}
            rx={3}
            fill="#fff"
            transform="rotate(45 22 22)"
          />
        ) : (
          <rect x={2} y={2} width={40} height={40} rx={4} fill="#fff" />
        )}
        <g stroke="#000" color="#000">
          {art.glyph}
        </g>
      </mask>
      <rect
        width={44}
        height={44}
        fill="var(--color-pen)"
        mask={`url(#seal-${art.id})`}
      />
    </svg>
  );
}
