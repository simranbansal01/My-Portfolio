import { useRef, useState } from "react";
import { NotepadSheet, Pushpin, TapeStrip } from "../components/NotepadSheet";
import {
  credix,
  investigatingNote,
  investigations,
} from "../data/portfolio";
import { mix, range, useScrub } from "../lib/scrub";

/**
 * Currently investigating — a moodboard.
 *
 * The finished work is filed on its own pages. What is left here is the
 * unfinished half, so it is arranged the way unfinished thinking actually sits
 * on a desk: sheets torn off a notepad, pinned and taped to the board at the
 * angles they happened to land, overlapping a little, with the content
 * master's own margin note for this section written on a scrap among them.
 *
 * Restraint is the whole job. Each sheet is held by one thing and one thing
 * only: the bound sheets hang from their own wire, the torn scrap is taped,
 * and a single pin holds down the one loose corner. Rotations stay under three
 * degrees. A board that shouts about being a board stops being one.
 *
 * The board itself is still the cutting mat in perspective: it comes in
 * tilted, lies flat where the cards are read, and tilts away as it leaves.
 * One scrubbed pin — scroll position is the playhead.
 */

const PLANE_HEIGHT = 762;
const RULER_MARKS = 8;

export function WorkMat({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(reduced ? 0.5 : 0);

  useScrub(section, setP, {
    start: "top top",
    end: `+=${PLANE_HEIGHT + 260}`,
    scrub: 1,
    pin: true,
    enabled: !reduced,
  });

  if (reduced) return <WorkMatStatic />;

  const tiltIn = range(p, 0, 0.18);
  const tiltOut = range(p, 0.82, 1);
  const rotateX = mix(24, 0, tiltIn) + mix(0, -15, tiltOut);

  // The plane is shorter than the stage, so it passes through: in from below
  // with its top edge showing, centred while flat, out with its bottom edge
  // showing. Seeing both edges is what makes it read as an object.
  const y = mix(620, -(PLANE_HEIGHT - 220), p);

  return (
    <section
      ref={section}
      aria-label="Currently investigating"
      className="relative h-screen overflow-hidden"
      style={{ perspective: "2100px", perspectiveOrigin: "50% 44%" }}
    >
      <div
        className="mat absolute inset-x-[3%] top-0 rounded-[10px] shadow-[0_-40px_120px_-40px_rgba(0,0,0,.9)] will-change-transform"
        style={{
          height: PLANE_HEIGHT,
          transform: `translate3d(0, ${y}px, 0) rotateX(${rotateX}deg)`,
          transformOrigin: "50% 40%",
        }}
      >
        <Ruler />
        <div className="absolute inset-y-0 right-0 left-14">
          <Heading />
          <Board />
          <p className="hand absolute right-8 bottom-7 text-[22px] text-chalk/55">
            everything you do, do it with care.
          </p>
        </div>
      </div>
    </section>
  );
}

/** The numbered edge, the thing that makes it a mat rather than a dark box. */
function Ruler() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-14 border-r border-paper/15"
    >
      {Array.from({ length: RULER_MARKS }, (_, i) => (
        <div
          key={i}
          className="absolute right-0 left-0 flex items-center justify-between px-2"
          style={{ top: `${(i / RULER_MARKS) * 100}%` }}
        >
          <span className="mono text-[9px] text-paper/45">{i + 1}</span>
          <span className="h-px w-3 bg-paper/25" />
        </div>
      ))}
    </div>
  );
}

function Heading() {
  return (
    <header className="absolute top-10 right-8 left-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-paper/20 pb-3">
      <h2 className="font-display text-[clamp(20px,2.6vw,34px)] font-bold text-paper">
        Currently investigating.
      </h2>
      <span className="mono text-paper/50">
        The next stories aren't finished yet
      </span>
    </header>
  );
}

/* ── the board ────────────────────────────────────────────────────────── */

/** Where each piece landed. Angles stay under three degrees on purpose. */
const SEATS = {
  credix: { top: 124, left: "0%", width: "47%", rotate: -1.1 },
  memory: { top: 118, left: "52%", width: "43%", rotate: 1.9 },
  stays: { top: 402, left: "55%", width: "37%", rotate: -2.3 },
  scrap: { top: 600, left: "37%", width: "34%", rotate: 2.4 },
} as const;

function Board() {
  const [memory, stays] = investigations;

  return (
    <>
      {/* The one still being built gets the biggest sheet. */}
      <div
        className="absolute"
        style={{
          top: SEATS.credix.top,
          left: SEATS.credix.left,
          width: SEATS.credix.width,
          transform: `rotate(${SEATS.credix.rotate}deg)`,
          zIndex: 3,
        }}
      >
        <NotepadSheet stock="plain">
          <div className="px-7 pb-8">
            <span className="mono inline-block border border-pen px-2 py-1 text-pen">
              {credix.status}
            </span>
            <h3 className="mt-3 font-display text-[clamp(22px,2.5vw,32px)] font-bold">
              {credix.title}
            </h3>
            <p className="mt-3 font-body text-ink-soft">{credix.lede}</p>
            <p className="mt-3 font-body text-[16px]">{credix.body}</p>
            <div className="mt-5">
              {credix.pillars.map((pillar) => (
                <div
                  key={pillar.no}
                  className="flex gap-4 border-t border-rule py-2.5"
                >
                  <b className="mono pt-1 text-pen">{pillar.no}</b>
                  <span className="font-body text-[15px]">{pillar.text}</span>
                </div>
              ))}
            </div>
          </div>
        </NotepadSheet>
      </div>

      <InvestigationSheet item={memory} seat={SEATS.memory} z={2} />
      <InvestigationSheet item={stays} seat={SEATS.stays} z={1} pinned />

      {/* The content master's own note for this section, on a torn scrap. */}
      <div
        className="absolute"
        style={{
          top: SEATS.scrap.top,
          left: SEATS.scrap.left,
          width: SEATS.scrap.width,
          transform: `rotate(${SEATS.scrap.rotate}deg)`,
          zIndex: 4,
        }}
      >
        <TapeStrip
          width={88}
          className="absolute -top-2.5 left-4 z-10 -rotate-[7deg]"
        />
        <NotepadSheet stock="ruled" bound={false}>
          <div className="px-6 pb-7">
            <p className="hand text-[26px] leading-[1.25] text-ink">
              {investigatingNote}
            </p>
          </div>
        </NotepadSheet>
      </div>
    </>
  );
}

function InvestigationSheet({
  item,
  seat,
  z,
  pinned = false,
}: {
  item: (typeof investigations)[number];
  seat: { top: number; left: string; width: string; rotate: number };
  z: number;
  pinned?: boolean;
}) {
  return (
    <div
      className="absolute"
      style={{
        top: seat.top,
        left: seat.left,
        width: seat.width,
        transform: `rotate(${seat.rotate}deg)`,
        zIndex: z,
      }}
    >
      <NotepadSheet stock="ruled">
        <div className="px-6 pb-7">
          <span className="mono inline-block border border-pen px-2 py-1 text-pen">
            {item.status}
          </span>
          <h3 className="mt-3 font-display text-[clamp(19px,2.1vw,26px)] font-bold">
            {item.title}
          </h3>
          <p className="mt-2 font-body text-[16px] text-ink-soft">
            {item.body}
          </p>
        </div>
      </NotepadSheet>
      {pinned && (
        <Pushpin size={18} className="absolute right-7 bottom-4 z-10" />
      )}
    </div>
  );
}

/* ── reduced motion ───────────────────────────────────────────────────── */

/**
 * The same board with the plane's travel and tilt removed rather than
 * reproduced with transitions. The sheets keep their binding and their stock —
 * that is the design, not the motion — but they sit square and in order.
 */
function WorkMatStatic() {
  return (
    <section
      aria-label="Currently investigating"
      className="mat relative mx-[3%] rounded-[10px] px-6 py-14"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper/20 pb-3">
        <h2 className="font-display text-[clamp(20px,2.6vw,34px)] font-bold text-paper">
          Currently investigating.
        </h2>
        <span className="mono text-paper/50">
          The next stories aren't finished yet
        </span>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <NotepadSheet stock="plain">
          <div className="px-7 pb-8">
            <span className="mono inline-block border border-pen px-2 py-1 text-pen">
              {credix.status}
            </span>
            <h3 className="mt-3 font-display text-[28px] font-bold">
              {credix.title}
            </h3>
            <p className="mt-3 font-body text-ink-soft">{credix.lede}</p>
            <p className="mt-3 font-body text-[16px]">{credix.body}</p>
            <div className="mt-5">
              {credix.pillars.map((pillar) => (
                <div
                  key={pillar.no}
                  className="flex gap-4 border-t border-rule py-2.5"
                >
                  <b className="mono pt-1 text-pen">{pillar.no}</b>
                  <span className="font-body text-[15px]">{pillar.text}</span>
                </div>
              ))}
            </div>
          </div>
        </NotepadSheet>

        <div className="grid content-start gap-10">
          {investigations.map((item) => (
            <NotepadSheet key={item.title} stock="ruled">
              <div className="px-6 pb-7">
                <span className="mono inline-block border border-pen px-2 py-1 text-pen">
                  {item.status}
                </span>
                <h3 className="mt-3 font-display text-[24px] font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-[16px] text-ink-soft">
                  {item.body}
                </p>
              </div>
            </NotepadSheet>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-[420px]">
        <NotepadSheet stock="ruled" bound={false}>
          <div className="px-6 pb-7">
            <p className="hand text-[26px] leading-[1.25] text-ink">
              {investigatingNote}
            </p>
          </div>
        </NotepadSheet>
      </div>

      <p className="hand mt-10 text-right text-[22px] text-chalk/55">
        everything you do, do it with care.
      </p>
    </section>
  );
}
