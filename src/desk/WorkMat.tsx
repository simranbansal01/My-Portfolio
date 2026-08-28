import { useRef, useState } from "react";
import { credix, investigations } from "../data/portfolio";
import { mix, range, useScrub } from "../lib/scrub";

/**
 * The cutting mat.
 *
 * A self-healing mat, ruled and numbered down its edge, carrying the work that
 * is still open. It is a plane in perspective: it comes in steeply tilted,
 * lies flat through the middle of the scroll — which is where everything on it
 * is meant to be read — and tilts away again as it leaves.
 *
 * The four finished stories used to sit here too. They moved into normal flow
 * once they carried interactions, because a control on a plane that is tilting
 * and travelling under the cursor is a thing to fight rather than use. What is
 * left is the unfinished half, which suits the surface: nothing on the mat has
 * been cut out yet.
 *
 * The whole thing is one scrubbed pin. Scroll position is the playhead.
 */

const PLANE_HEIGHT = 690;
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

  // Tilt in over the first fifth, hold flat while the work is read, tilt out
  // over the last fifth.
  const tiltIn = range(p, 0, 0.18);
  const tiltOut = range(p, 0.82, 1);
  const rotateX = mix(24, 0, tiltIn) + mix(0, -15, tiltOut);

  // Now that the plane is shorter than the stage it passes through rather than
  // scrolling past: it enters from below with its top edge showing, sits
  // centred while it is flat, and leaves with its bottom edge showing. Both
  // edges are visible at some point, which is what makes it read as an object.
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
          <SectionTab
            top={40}
            label="Currently investigating."
            note="The next stories aren't finished yet"
          />

          <CredixCard />
          {investigations.map((item, i) => (
            <InvestigationCard key={item.title} item={item} index={i} />
          ))}

          {/* Printed on the mat itself, bottom right, the way a maker's mark is. */}
          <p className="hand absolute right-8 bottom-8 text-[22px] text-chalk/55">
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

function SectionTab({
  top,
  label,
  note,
}: {
  top: number;
  label: string;
  note: string;
}) {
  return (
    <header
      className="absolute right-8 left-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-paper/20 pb-3"
      style={{ top }}
    >
      <h2 className="font-display text-[clamp(20px,2.6vw,34px)] font-bold text-paper">
        {label}
      </h2>
      <span className="mono text-paper/50">{note}</span>
    </header>
  );
}

function CredixCard() {
  return (
    <article
      className="paper-plain absolute rounded-[6px] p-7 text-ink shadow-[0_26px_60px_-24px_rgba(0,0,0,.85)]"
      style={{ top: 150, left: "1%", width: "50%", transform: "rotate(0.7deg)" }}
    >
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
          <div key={pillar.no} className="flex gap-4 border-t border-rule py-2.5">
            <b className="mono pt-1 text-pen">{pillar.no}</b>
            <span className="font-body text-[15px]">{pillar.text}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

const INVESTIGATION_SEATS = [
  { top: 150, left: "55%", rotate: -1.2 },
  { top: 430, left: "55%", rotate: 1.4 },
];

function InvestigationCard({
  item,
  index,
}: {
  item: (typeof investigations)[number];
  index: number;
}) {
  const seat = INVESTIGATION_SEATS[index];
  return (
    <article
      className="paper-kraft absolute rounded-[4px] p-6 text-ink shadow-[0_22px_50px_-22px_rgba(0,0,0,.85)]"
      style={{
        top: seat.top,
        left: seat.left,
        width: "41%",
        transform: `rotate(${seat.rotate}deg)`,
      }}
    >
      <span className="mono inline-block border border-pen px-2 py-1 text-pen">
        {item.status}
      </span>
      <h3 className="mt-3 font-display text-[clamp(19px,2.1vw,26px)] font-bold">
        {item.title}
      </h3>
      <p className="mt-2 font-body text-[16px] text-ink-soft">{item.body}</p>
    </article>
  );
}

/**
 * Reduced motion: the same mat, laid out flat in document order, with the
 * plane's travel and tilt removed rather than reproduced with transitions.
 */
function WorkMatStatic() {
  return (
    <section
      aria-label="Currently investigating"
      className="mat relative mx-[3%] rounded-[10px] px-6 py-16"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper/20 pb-3">
        <h2 className="font-display text-[clamp(20px,2.6vw,34px)] font-bold text-paper">
          Currently investigating.
        </h2>
        <span className="mono text-paper/50">
          The next stories aren't finished yet
        </span>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="paper-plain rounded-[6px] p-7 text-ink">
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
        </article>
        <div className="grid content-start gap-8">
          {investigations.map((item) => (
            <article
              key={item.title}
              className="paper-kraft rounded-[4px] p-6 text-ink"
            >
              <span className="mono inline-block border border-pen px-2 py-1 text-pen">
                {item.status}
              </span>
              <h3 className="mt-3 font-display text-[24px] font-bold">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-[16px] text-ink-soft">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <p className="hand mt-12 text-right text-[22px] text-chalk/55">
        everything you do, do it with care.
      </p>
    </section>
  );
}
