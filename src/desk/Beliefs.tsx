import { useRef, useState } from "react";
import { beliefs } from "../data/portfolio";
import { mix, range, useScrub } from "../lib/scrub";

/**
 * The three notes.
 *
 * They start stacked on the notebook's last page and, as the scroll passes,
 * slide out over the case's bottom edge and spread across the desk. The
 * spread is scrubbed, so scrolling back gathers them up again.
 */

const PAPER_CLASS: Record<string, string> = {
  ruled: "paper-ruled torn-both",
  graph: "paper-graph torn-top",
  kraft: "paper-kraft torn-bottom",
};

/**
 * Where each note ends up: `x` as a fraction of the track width, `y` in px
 * down from the notebook's last page. They start stacked square under the
 * heading and finish spread across the desk below the case's bottom edge.
 */
const LAYOUT = [
  { x: -0.28, y: 150, rotate: -8, z: 3 },
  { x: 0.28, y: 44, rotate: 6, z: 2 },
  { x: -0.01, y: 268, rotate: -3, z: 1 },
];

export function Beliefs({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(reduced ? 1 : 0);

  // The spread finishes while the notes are still entering the viewport, so
  // by the time they are centred on screen they are already laid out. Ending
  // the scrub at "bottom" would have them still stacked as they scrolled past.
  useScrub(section, setP, {
    start: "top bottom",
    end: "top 30%",
    scrub: 1,
    enabled: !reduced,
  });

  return (
    <div
      ref={section}
      className="relative z-20 -mt-[20vh] h-[40vh] px-4 md:-mt-[22vh] md:h-[46vh] lg:px-20"
    >
      <div className="relative mx-auto h-full max-w-[1120px]">
        {beliefs.map((belief, i) => {
          const seat = LAYOUT[i];
          // Each note leaves a beat after the one before it.
          const t = range(p, i * 0.1, 0.7 + i * 0.1);
          return (
            <article
              key={belief.id}
              className={[
                "absolute top-0 w-[230px] px-6 py-8 shadow-[0_18px_40px_-18px_rgba(0,0,0,.75)] sm:w-[270px] md:w-[300px]",
                PAPER_CLASS[belief.paper],
              ].join(" ")}
              style={{
                zIndex: seat.z,
                // `left` is a percentage of the track, so the spread scales
                // with the notebook instead of with each note's own width.
                left: `${50 + mix(0, seat.x, t) * 100}%`,
                transform: `translate3d(-50%, ${mix(-30, seat.y, t)}px, 0) rotate(${mix(0, seat.rotate, t)}deg)`,
              }}
            >
              <p className="hand text-[27px] leading-[1.2] font-semibold text-ink md:text-[31px]">
                {belief.text}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
