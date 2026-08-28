import { useEffect, useRef, useState } from "react";
import { SEALS, Seal } from "../art/Seals";
import { useScrub } from "../lib/scrub";

/**
 * The fixed margins.
 *
 * A column of stamps runs the full height of each side, drifting slowly in
 * opposite directions as the page scrolls so the margins read as a continuous
 * strip rather than a repeated tile. The left rail also carries the scroll
 * progress as a red fill, which is the one place the pen colour is allowed to
 * report a number.
 */

const REPEATS = 6;

export function Rails({ reduced }: { reduced: boolean }) {
  const page = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    page.current = document.documentElement;
  }, []);

  useScrub(page, setProgress, {
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3,
    enabled: !reduced,
  });

  // Half a tile of travel in each direction: enough to feel alive, not enough
  // to ever expose the end of the strip.
  const drift = reduced ? 0 : progress * 220;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 z-40 hidden w-full lg:block"
    >
      <RailColumn side="left" offset={-drift} progress={progress} />
      <RailColumn side="right" offset={drift} />
    </div>
  );
}

function RailColumn({
  side,
  offset,
  progress,
}: {
  side: "left" | "right";
  offset: number;
  progress?: number;
}) {
  const seals = Array.from({ length: REPEATS }, (_, r) =>
    // Reverse alternate passes so the same twelve stamps never read as a loop.
    r % 2 === 0 ? SEALS : [...SEALS].reverse(),
  ).flat();

  return (
    <div
      className={[
        "absolute inset-y-0 w-[58px] overflow-hidden",
        side === "left"
          ? "left-0 border-r border-ink-soft/40"
          : "right-0 border-l border-ink-soft/40",
      ].join(" ")}
    >
      <div
        className="flex flex-col items-center gap-2 py-2 will-change-transform"
        style={{ transform: `translate3d(0, ${offset - 260}px, 0)` }}
      >
        {seals.map((art, i) => (
          <Seal key={`${art.id}-${i}`} art={art} size={42} />
        ))}
      </div>

      {progress !== undefined && (
        <div
          className="absolute top-0 left-0 w-[3px] bg-pen"
          style={{ height: `${progress * 100}%` }}
        />
      )}
    </div>
  );
}
