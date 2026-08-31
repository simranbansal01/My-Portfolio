import { useRef, useState } from "react";
import { MOCKUP_BY_NO } from "../art/mockupIndex";
import { galleryNote, stories, type Story } from "../data/portfolio";
import { Link } from "../components/Link";
import { mix, range, useScrub } from "../lib/scrub";

/**
 * The gallery.
 *
 * Four concept mockups scattered across the desk, each drifting at its own
 * rate as the scroll passes so the wall separates into layers instead of
 * sliding as one plane. A torn note sits in the middle of them, the way a
 * pinned scrap sits in the middle of a spread.
 *
 * Every tile is a door: it opens that project's own page, where the story,
 * its interaction and its links live. The desk shows the objects; you pick
 * one up to read it.
 */

/** Where each mockup lands, and how near the viewer it reads. */
const SEATS = [
  { left: "2%", top: "3%", width: 400, rotate: -3.2, depth: 0.26, z: 4 },
  { left: "56%", top: "0%", width: 385, rotate: 2.4, depth: 0.52, z: 3 },
  { left: "4%", top: "55%", width: 385, rotate: 1.8, depth: 0.42, z: 2 },
  { left: "57%", top: "50%", width: 395, rotate: -2.2, depth: 0.18, z: 5 },
];

export function WorkGallery({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(reduced ? 0.5 : 0);

  useScrub(section, setP, {
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
    enabled: !reduced,
  });

  // Centred on 0: the section is half-passed at 0, so drift runs both ways.
  const travel = (p - 0.5) * 2;

  return (
    <section
      id="work"
      ref={section}
      aria-labelledby="work-heading"
      className="relative mx-auto mt-[22vh] hidden max-w-[1280px] px-4 lg:block lg:px-14"
    >
      <GalleryHeading />

      {/* The tiles hang off this box, so the heading above stays in flow. Its
          height is the tiles' spacing — the seats are percentages of it, and
          shrinking it slides the bottom row up into the top one rather than
          trimming any slack off the end. The gap to the next section is the
          mat's lead-in, not this. */}
      <div className="relative h-[124vh]">
        {stories.map((story, i) => {
          const seat = SEATS[i];
          return (
            <figure
              key={story.no}
              className="absolute will-change-transform"
              style={{
                left: seat.left,
                top: seat.top,
                width: seat.width,
                zIndex: seat.z,
                transform: reduced
                  ? `rotate(${seat.rotate}deg)`
                  : `translate3d(0, ${-travel * seat.depth * 260}px, 0) rotate(${seat.rotate}deg)`,
              }}
            >
              <Tile story={story} />
            </figure>
          );
        })}

        {/* The scrap pinned in the middle of the spread. */}
        <div
          className="paper-ruled torn-both absolute top-1/2 left-1/2 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 px-6 py-7 shadow-[0_18px_44px_-18px_rgba(0,0,0,.8)]"
          style={{
            transform: reduced
              ? "translate(-50%, -50%) rotate(-2deg)"
              : `translate(-50%, calc(-50% + ${mix(26, -26, range(p, 0, 1))}px)) rotate(-2deg)`,
          }}
        >
          <p className="hand text-[27px] leading-[1.2] font-semibold text-ink">
            {galleryNote}
          </p>
        </div>

        {/* A chalk sketch for the empty lower half of the wall: someone
            working a magnifier along a trail of footprints — the instinct to
            investigate, drawn on the board. */}
        <div
          aria-hidden="true"
          className="chalk absolute top-[96%] left-[18%] w-[350px] rotate-[-3deg]"
        >
          <DetectiveDoodle />
        </div>
      </div>
    </section>
  );
}

/** The detective at the foot of the wall. Loose chalk, all stroke. */
function DetectiveDoodle() {
  return (
    <svg
      viewBox="0 0 380 170"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
      style={{ filter: "url(#chalk-edge)" }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* hat */}
        <path d="M26 48 q34 -17 66 0 q-7 7 -16 8 l-34 0 q-9 -1 -16 -8 z" />
        <path d="M40 48 q3 -21 27 -21 q24 0 20 21" />
        {/* head */}
        <path d="M46 48 q3 16 20 17 q15 -1 19 -13" />
        <path d="M44 54 q-4 3 0 6" />
        <circle cx={53} cy={51} r={1.5} />
        {/* trench coat */}
        <path d="M50 64 C40 98 36 126 42 152 L92 152 C97 126 93 96 84 64" />
        <path d="M54 64 l10 9 l10 -9" />
        <path d="M58 74 l3 74" strokeWidth={1.4} />
        {/* belt */}
        <path d="M42 108 q26 8 52 0" strokeWidth={1.8} />
        {/* back arm, in the pocket */}
        <path d="M52 68 q-9 16 -3 34" />
        {/* front arm to the magnifier */}
        <path d="M82 68 C104 74 122 88 135 105" />
        {/* legs, mid-stride */}
        <path d="M52 152 l-7 22 q-1 4 -9 6" />
        <path d="M82 152 l10 18 q2 4 11 5" />
        {/* magnifier */}
        <circle cx={148} cy={113} r={18} />
        <circle cx={148} cy={113} r={14} strokeWidth={1.4} />
        <path d="M161 126 l17 17" strokeWidth={3.2} />
        {/* the footprint it has found, magnified in the lens */}
        <path
          d="M140 109 q-4 -8 4 -10 q11 -3 14 5 q2 6 -4 8 q-9 3 -12 -2 z"
          strokeWidth={1.4}
        />
        {/* the trail off to the right */}
        <path
          d="M152 140 q70 -12 150 4 q38 8 64 3"
          strokeWidth={1.6}
          strokeDasharray="1 9"
        />
        <g strokeWidth={1.6}>
          <path d="M182 140 q-4 -7 4 -9 q10 -2 12 4 q2 5 -4 7 q-8 3 -11 -2 z" />
          <path d="M222 147 q-4 -7 4 -9 q10 -2 12 4 q2 5 -4 7 q-8 3 -11 -2 z" />
          <path d="M262 139 q-4 -7 4 -9 q10 -2 12 4 q2 5 -4 7 q-8 3 -11 -2 z" />
          <path d="M302 147 q-4 -7 4 -9 q10 -2 12 4 q2 5 -4 7 q-8 3 -11 -2 z" />
        </g>
        {/* X marks the spot */}
        <path d="M338 150 l10 10 M348 150 l-10 10" strokeWidth={1.8} />
        {/* a question in the air */}
        <path
          d="M108 42 q0 -13 12 -13 q12 0 12 11 q0 8 -11 11 l0 5"
          strokeWidth={1.8}
        />
        <circle cx={121} cy={71} r={1.6} />
      </g>
    </svg>
  );
}

/**
 * The section's title. Set to match the mat's heading exactly, so the two
 * halves of the work — what is finished and what is still open — read as the
 * same kind of thing rather than as two unrelated designs.
 */
function GalleryHeading() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper/20 pb-3">
      <h2
        id="work-heading"
        className="font-display text-[clamp(20px,2.6vw,34px)] font-bold text-paper"
      >
        My work.
      </h2>
      <span className="mono text-paper/50">Pick one up to read it</span>
    </header>
  );
}

/**
 * One tile. The whole thing is the link — the mockup lifts a little on hover
 * so it reads as something you can pick up rather than a picture of one.
 */
function Tile({ story }: { story: Story }) {
  const Mock = MOCKUP_BY_NO[story.no];
  if (!Mock) return null;

  return (
    <Link
      to={`/work/${story.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-pen"
      aria-label={`${story.title} — read the story`}
    >
      <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
        <Mock />
      </span>
      <span className="mono mt-3 flex items-baseline gap-2">
        <span className="text-pen">{story.no}</span>
        <span className="text-paper/80 transition-colors duration-300 group-hover:text-pen">
          {story.title}
        </span>
      </span>
      <span className="mono mt-1 flex items-baseline justify-between gap-3">
        <span className="text-paper/35">{story.category}</span>
        <span className="shrink-0 text-pen opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Read →
        </span>
      </span>
    </Link>
  );
}

/**
 * The phone gets the same four tiles, stacked and slightly off-square, with
 * no drift — there is no room to scatter and nothing to parallax against.
 * The "Read →" mark shows unconditionally here, since there is no hover.
 */
export function WorkGalleryMobile() {
  return (
    <section id="work" aria-labelledby="work-heading-m" className="px-6 py-4">
      {/* Stacked rather than side by side — there is no room for a right
          column on a phone, and the note reads as a caption under the title. */}
      <header className="mb-8 border-b border-paper/20 pb-3">
        <h2
          id="work-heading-m"
          className="font-display text-[24px] leading-tight font-bold text-paper"
        >
          My work.
        </h2>
        <span className="mono mt-2 block text-paper/50">
          Tap one to read it
        </span>
      </header>

      <div className="mx-auto flex max-w-[400px] flex-col gap-9">
        {stories.map((story, i) => (
          <figure
            key={story.no}
            style={{ transform: `rotate(${[-1.6, 1.4, -1, 1.2][i]}deg)` }}
          >
            <Link
              to={`/work/${story.slug}`}
              className="block focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-pen"
            >
              <MobileTileBody story={story} />
            </Link>
          </figure>
        ))}
      </div>
    </section>
  );
}

function MobileTileBody({ story }: { story: Story }) {
  const Mock = MOCKUP_BY_NO[story.no];
  if (!Mock) return null;
  return (
    <>
      <Mock />
      <span className="mono mt-2.5 flex items-baseline gap-2">
        <span className="text-pen">{story.no}</span>
        <span className="text-paper/80">{story.title}</span>
      </span>
      <span className="mono mt-1 flex items-baseline justify-between gap-3">
        <span className="text-paper/35">{story.category}</span>
        <span className="shrink-0 text-pen">Read →</span>
      </span>
    </>
  );
}
