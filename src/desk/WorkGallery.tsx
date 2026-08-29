import { useRef, useState } from "react";
import { MOCKUP_BY_NO } from "../art/mockupIndex";
import { stories, type Story } from "../data/portfolio";
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
      aria-label="Selected product stories"
      className="relative mx-auto mt-[22vh] hidden h-[124vh] max-w-[1280px] px-4 lg:block lg:px-14"
    >
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
          Four concepts. None of them shipped. All of them started as a
          question.
        </p>
      </div>
    </section>
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
    <section
      id="work"
      aria-label="Selected product stories"
      className="px-6 py-4"
    >
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
