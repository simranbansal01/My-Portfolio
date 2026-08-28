/**
 * The SVG filters that give every straight path a pen wobble. Mounted once at
 * the root; art elsewhere refers to them by id through the `.wobble` classes.
 *
 * `baseFrequency` sets the size of the wiggle and `scale` its amplitude. Kept
 * small — the intent is "drawn by a hand", not "melted".
 */
export function Filters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      <defs>
        <filter id="wobble">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.024"
            numOctaves={3}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={2.4}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="wobble-soft">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves={2}
            seed={19}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={1.3}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Chalk: a wobble plus a grainy erosion, for the margin doodles. */}
        <filter id="chalk-edge">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={3}
            seed={3}
            result="grain"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            scale={1.6}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Rubber stamp: ink that did not take evenly across the paper. */}
        <filter id="stamp-ink">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55"
            numOctaves={4}
            seed={11}
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0.9 0 0 0 -0.18"
            result="mask"
          />
          <feComposite
            in="SourceGraphic"
            in2="mask"
            operator="out"
            result="eroded"
          />
          <feDisplacementMap
            in="eroded"
            in2="grain"
            scale={1.1}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
