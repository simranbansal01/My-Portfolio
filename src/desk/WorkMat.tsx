import { useRef, useState } from "react";
import { credix, investigations, stories, type Story } from "../data/portfolio";
import { mix, range, useScrub } from "../lib/scrub";

/**
 * The cutting mat.
 *
 * A self-healing mat, ruled and numbered down its edge, with the work laid out
 * on it. The mat is a plane in perspective: it comes in steeply tilted, lies
 * flat through the middle of the scroll — which is where everything on it is
 * meant to be read — and tilts away again as it leaves.
 *
 * The whole thing is one scrubbed pin. Scroll position is the playhead: the
 * plane's travel and its tilt are both read straight off progress.
 */

const PLANE_HEIGHT = 2260;
const RULER_MARKS = 26;

export function WorkMat({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(reduced ? 0.5 : 0);

  useScrub(section, setP, {
    start: "top top",
    end: `+=${PLANE_HEIGHT}`,
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

  // The plane travels from just below the stage's top edge to the point where
  // its own bottom edge sits mid-stage — so it leaves the frame as an object
  // with an edge, not by running out of content.
  const y = mix(110, -(PLANE_HEIGHT - 620), p);

  return (
    <section
      id="work"
      ref={section}
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
        <MatSurface />
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

/** Everything pinned to the mat, positioned on the plane. */
function MatSurface() {
  return (
    <div className="absolute inset-y-0 right-0 left-14">
      <SectionTab top={40} label="Things I noticed. Directions I took." note="Selected product stories · 04" />

      {stories.map((story, i) => (
        <StoryCard key={story.no} story={story} index={i} />
      ))}

      <SectionTab
        top={1520}
        label="Currently investigating."
        note="The next stories aren't finished yet"
      />

      {/* Printed on the mat itself, bottom right, the way a maker's mark is. */}
      <p className="hand absolute right-8 bottom-8 text-[22px] text-chalk/55">
        everything you do, do it with care.
      </p>

      <CredixCard />
      {investigations.map((item, i) => (
        <InvestigationCard key={item.title} item={item} index={i} />
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

/** Where each story card sits on the plane, and how far off-square it landed. */
const STORY_SEATS = [
  { top: 120, left: "1%", width: "44%", rotate: -1.4 },
  { top: 400, left: "52%", width: "44%", rotate: 1.1 },
  { top: 760, left: "3%", width: "43%", rotate: 0.8 },
  { top: 1010, left: "51%", width: "45%", rotate: -0.9 },
];

function StoryCard({ story, index }: { story: Story; index: number }) {
  const seat = STORY_SEATS[index];
  return (
    <article
      className="paper-plain absolute rounded-[6px] p-7 text-ink shadow-[0_26px_60px_-24px_rgba(0,0,0,.85)]"
      style={{
        top: seat.top,
        left: seat.left,
        width: seat.width,
        transform: `rotate(${seat.rotate}deg)`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="font-display text-[52px] leading-none font-extrabold text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-rule)" }}
        >
          {story.no}
        </span>
        <span className="mono pt-3 text-right text-ink-soft">
          {story.category}
        </span>
      </div>

      <h3 className="mt-1 font-display text-[clamp(21px,2.3vw,32px)] leading-[1.05] font-bold tracking-[-0.014em]">
        {story.title}
      </h3>

      <p className="mt-3 max-w-[46ch] font-body text-[17px] text-ink-soft italic">
        {story.teaser}
      </p>

      <dl className="mt-5">
        <Beat term="I noticed" value={story.noticed} />
        <Beat term="I questioned" value={story.questioned} />
        <Beat term="I built" value={story.built} />
      </dl>

      <p className="mono mt-5 text-ink-soft">
        {story.links.map((l) => l.label).join(" · ")}
      </p>
    </article>
  );
}

/** One line of the I NOTICED → I QUESTIONED → I BUILT spine. */
function Beat({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-[104px_1fr] items-start gap-4 border-t border-rule py-2.5">
      <dt className="mono pt-1 text-pen">{term}</dt>
      <dd className="font-body text-[15px] leading-[1.5]">{value}</dd>
    </div>
  );
}

function CredixCard() {
  return (
    <article
      className="paper-plain absolute rounded-[6px] p-7 text-ink shadow-[0_26px_60px_-24px_rgba(0,0,0,.85)]"
      style={{ top: 1610, left: "1%", width: "50%", transform: "rotate(0.7deg)" }}
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
  );
}

const INVESTIGATION_SEATS = [
  { top: 1610, left: "55%", rotate: -1.2 },
  { top: 1880, left: "55%", rotate: 1.4 },
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
    <section id="work" className="mat relative mx-[3%] rounded-[10px] px-6 py-16">
      <StaticTab
        label="Things I noticed. Directions I took."
        note="Selected product stories · 04"
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {stories.map((story) => (
          <article
            key={story.no}
            className="paper-plain rounded-[6px] p-7 text-ink"
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className="font-display text-[52px] leading-none font-extrabold text-transparent"
                style={{ WebkitTextStroke: "1px var(--color-rule)" }}
              >
                {story.no}
              </span>
              <span className="mono pt-3 text-right text-ink-soft">
                {story.category}
              </span>
            </div>
            <h3 className="mt-1 font-display text-[28px] leading-[1.05] font-bold">
              {story.title}
            </h3>
            <p className="mt-3 font-body text-[17px] text-ink-soft italic">
              {story.teaser}
            </p>
            <dl className="mt-5">
              <Beat term="I noticed" value={story.noticed} />
              <Beat term="I questioned" value={story.questioned} />
              <Beat term="I built" value={story.built} />
            </dl>
            <p className="mono mt-5 text-ink-soft">
              {story.links.map((l) => l.label).join(" · ")}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <StaticTab
          label="Currently investigating."
          note="The next stories aren't finished yet"
        />
      </div>
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

/** The same heading as `SectionTab`, in flow instead of on the plane. */
function StaticTab({ label, note }: { label: string; note: string }) {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper/20 pb-3">
      <h2 className="font-display text-[clamp(20px,2.6vw,34px)] font-bold text-paper">
        {label}
      </h2>
      <span className="mono text-paper/50">{note}</span>
    </header>
  );
}
