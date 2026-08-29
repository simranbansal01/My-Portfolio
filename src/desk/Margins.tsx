import { useEffect, useRef, useState } from "react";
import { Doodle, type DoodleId } from "../art/Doodles";
import { Leader } from "../art/Marks";
import { annotations } from "../data/portfolio";
import { useCursorDrift, useScrub } from "../lib/scrub";

/**
 * The margins.
 *
 * Two layers live outside the page's content column: chalk objects on the
 * desk, which drift on scroll, and red annotations, which drift on the cursor.
 * Both are decoration and both are hidden from assistive tech; the
 * annotations' text also appears in the copy proper, so nothing is lost.
 *
 * Below the desktop breakpoint neither layer renders at all. There is no room
 * for a margin on a phone, and faking one is worse than not having one.
 */

type Placement = {
  id: DoodleId;
  /** Vertical seat as a percentage of total page height. */
  top: number;
  side: "left" | "right";
  /** Distance from that edge, in px, inside the rail. */
  inset: number;
  size: number;
  /** Parallax multiplier. Larger reads as nearer the viewer. */
  depth: number;
};

const DOODLES: Placement[] = [
  { id: "coffee", top: 6, side: "left", inset: 72, size: 104, depth: 0.05 },
  { id: "paperclip", top: 11, side: "right", inset: 78, size: 88, depth: 0.09 },
  { id: "notepad", top: 19, side: "left", inset: 66, size: 96, depth: 0.07 },
  { id: "ruler", top: 25, side: "right", inset: 70, size: 108, depth: 0.04 },
  { id: "calculator", top: 36, side: "left", inset: 76, size: 100, depth: 0.08 },
  { id: "stamp", top: 47, side: "right", inset: 68, size: 104, depth: 0.06 },
  { id: "lamp", top: 58, side: "left", inset: 70, size: 116, depth: 0.05 },
  { id: "tray", top: 66, side: "right", inset: 74, size: 108, depth: 0.09 },
  { id: "plane", top: 76, side: "left", inset: 68, size: 100, depth: 0.07 },
  { id: "clip", top: 84, side: "right", inset: 72, size: 92, depth: 0.05 },
  { id: "cursor", top: 92, side: "left", inset: 74, size: 84, depth: 0.06 },
];

export function MarginDoodles({ reduced }: { reduced: boolean }) {
  const page = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    page.current = document.documentElement;
  }, []);

  useScrub(page, setP, {
    start: "top top",
    end: "bottom bottom",
    scrub: 0.6,
    enabled: !reduced,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden lg:block"
    >
      {DOODLES.map((d) => (
        <span
          key={`${d.id}-${d.top}`}
          className="absolute will-change-transform"
          style={{
            top: `${d.top}%`,
            [d.side]: d.inset,
            // Everything drifts up as the page goes down; the multiplier is
            // what separates near from far.
            transform: reduced
              ? undefined
              : `translate3d(0, ${-p * d.depth * 2200}px, 0)`,
          }}
        >
          <Doodle id={d.id} size={d.size} className="chalk" />
        </span>
      ))}
    </div>
  );
}

/**
 * Where each red note is pinned. The gutter between the content column and
 * the rail is only about 200px even on a wide screen, so the notes are narrow
 * and the tops are chosen to land beside a section that does not fill it.
 */
const NOTES = [
  { top: 9, side: "right" as const, inset: 68, depth: 0.02 },
  { top: 41, side: "left" as const, inset: 68, depth: 0.03 },
  { top: 87, side: "right" as const, inset: 68, depth: 0.026 },
];

export function Annotations({ reduced }: { reduced: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden 2xl:block"
    >
      {annotations.map((text, i) => (
        <Annotation
          key={text}
          text={text}
          seat={NOTES[i]}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

function Annotation({
  text,
  seat,
  reduced,
}: {
  text: string;
  seat: (typeof NOTES)[number];
  reduced: boolean;
}) {
  const el = useRef<HTMLDivElement>(null);
  useCursorDrift(el, seat.depth, !reduced);

  return (
    <div
      ref={el}
      className="absolute flex w-[168px] items-start gap-1.5 will-change-transform"
      style={{ top: `${seat.top}%`, [seat.side]: seat.inset }}
    >
      {seat.side === "right" && (
        <span className="mt-3 shrink-0 text-pen opacity-70">
          <Leader side="right" />
        </span>
      )}
      <p className="hand text-[20px] leading-[1.15] text-pen">{text}</p>
      {seat.side === "left" && (
        <span className="mt-3 shrink-0 text-pen opacity-70">
          <Leader side="left" />
        </span>
      )}
    </div>
  );
}
