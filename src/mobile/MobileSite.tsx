import { useEffect, useState } from "react";
import { Filters } from "../art/Filters";
import { Doodle } from "../art/Doodles";
import { DeskScene } from "../art/Scenes";
import { Underline } from "../art/Marks";
import {
  beliefs,
  credix,
  identity,
  intro,
  investigations,
  nav,
  stories,
  type Story,
} from "../data/portfolio";
import { scrollToId } from "../lib/smoothScroll";
import { useLocalTime } from "../lib/hooks";
import { useRefreshOnFonts } from "../lib/scrub";
import { Footer } from "../desk/Footer";
import { Ledger } from "../desk/Ledger";
import { LookingFor } from "../desk/LookingFor";
import { Polaroid } from "../desk/Polaroid";
import { ProofMarquee } from "../desk/ProofMarquee";

/**
 * The phone edition.
 *
 * Not the desktop layout squeezed. There are no margins on a phone, so the
 * margin furniture — rails, chalk objects, red annotations, the cursor
 * parallax — is not rendered at all rather than crammed in. What survives is
 * the thing itself: the notebook, the notes, the work, and the ask, stacked.
 *
 * Nothing here is pinned. Vertical scroll is the only gesture the page asks
 * for, and it does exactly what the phone's own scrolling does.
 */
export function MobileSite({ reduced }: { reduced: boolean }) {
  useRefreshOnFonts();

  return (
    <div className="board grain relative min-h-screen overflow-clip">
      <Filters />
      <div className="mx-auto w-full max-w-[560px]">
        <MobileNav />
        <main>
          <MobileHero reduced={reduced} />
          <MobileBeliefs />
          <MobileWork />
          <Polaroid reduced={reduced} />
          <Ledger reduced={reduced} />
          <ProofMarquee reduced={reduced} />
          <LookingFor />
        </main>
        <Footer />
      </div>
    </div>
  );
}

/**
 * The phone's nav: the same three words, set as a row of tabs across the top
 * of the board. No hover ring and no doodle — there is no hover on a phone,
 * and a tap target wants a box, not a drawn circle.
 */
function MobileNav() {
  return (
    <nav
      aria-label="Sections"
      className="flex justify-center gap-2 px-3 pt-5"
    >
      {nav.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => scrollToId(item.id)}
          className="hand rounded-full border border-paper/25 px-5 py-1.5 text-[21px] text-paper active:border-pen active:text-pen"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

/* ── hero ─────────────────────────────────────────────────────────────── */

function MobileHero({ reduced }: { reduced: boolean }) {
  const time = useLocalTime(identity.timezone);

  return (
    <section id="about" className="px-3 pt-5">
      <div className="bezel rounded-[26px] p-2.5 pb-4">
        <div className="paper-grid overflow-hidden rounded-[18px] px-6 pt-9 pb-7">
          <p className="hand text-[42px] leading-none font-bold text-pen">
            {identity.signature}
          </p>
          <div className="mt-1 w-32 text-pen">
            <Underline />
          </div>

          <p className="hand mt-3 text-[21px] leading-tight text-pen">
            {identity.roleStrip}
          </p>

          <h1 className="mt-5 font-display text-[38px] leading-[1.02] font-bold tracking-[-0.02em] text-ink">
            {identity.name}
          </h1>

          <MobileRole reduced={reduced} />

          <p className="mt-5 font-body text-[17px] text-ink-soft">
            {identity.deck}
          </p>

          <p className="mono mt-6 text-ink-soft">
            {identity.route} · <span className="tabular-nums">{time}</span>
          </p>

          <DeskScene className="mt-6 -mb-7 w-full text-pen" />
        </div>

        <div className="paper-plain mt-2.5 rounded-[18px] px-6 py-8 text-ink">
          {intro.map((para, i) => (
            <p
              key={para}
              className={[
                "mb-3 font-body text-[16px] last:mb-0",
                i === 0
                  ? "first-letter:float-left first-letter:pt-1 first-letter:pr-2 first-letter:font-display first-letter:text-[54px] first-letter:leading-[0.76] first-letter:font-bold"
                  : "",
              ].join(" ")}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileRole({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = useState(0);
  const roles = identity.roles;

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [reduced, roles.length]);

  if (reduced) {
    return (
      <p className="mt-1 font-display text-[26px] leading-tight text-pen italic">
        {roles[0]}
      </p>
    );
  }

  return (
    <div className="relative mt-1 h-[1.2em] overflow-hidden font-display text-[26px] leading-[1.15] text-pen italic">
      {roles.map((role, i) => (
        <span
          key={role}
          aria-hidden={i !== index}
          className="absolute inset-x-0 top-0 transition-transform duration-[620ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateY(${(i - index) * 120}%)` }}
        >
          {role}
        </span>
      ))}
    </div>
  );
}

/* ── beliefs ──────────────────────────────────────────────────────────── */

const PAPER_CLASS: Record<string, string> = {
  ruled: "paper-ruled torn-both",
  graph: "paper-graph torn-top",
  kraft: "paper-kraft torn-bottom",
};

/**
 * The three notes, dealt down the page rather than spread across a desk. Each
 * keeps its own paper and its own crooked angle — a stack someone put down,
 * not a list.
 */
function MobileBeliefs() {
  return (
    <section className="relative px-6 py-16">
      <h2 className="hand mb-8 text-center text-[26px] text-pen">
        3 things I strongly believe in
      </h2>
      <div className="mx-auto flex max-w-[310px] flex-col gap-7">
        {beliefs.map((belief, i) => (
          <article
            key={belief.id}
            className={[
              "px-6 py-7 shadow-[0_16px_36px_-16px_rgba(0,0,0,.8)]",
              PAPER_CLASS[belief.paper],
            ].join(" ")}
            style={{ transform: `rotate(${[-2.4, 1.8, -1.2][i]}deg)` }}
          >
            <p className="hand text-[26px] leading-[1.2] font-semibold text-ink">
              {belief.text}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Doodle id="paperclip" size={76} className="chalk" />
      </div>
    </section>
  );
}

/* ── work ─────────────────────────────────────────────────────────────── */

/**
 * The mat, narrowed to a strip. The ruler stays — it is what makes the surface
 * a mat — and the work sits on it as a single readable column.
 */
function MobileWork() {
  return (
    <section id="work" className="mat mx-3 rounded-[14px] px-3 py-10">
      <header className="mb-8 border-b border-paper/20 pb-3 pl-9">
        <h2 className="font-display text-[24px] leading-tight font-bold text-paper">
          Things I noticed. Directions I took.
        </h2>
        <span className="mono mt-2 block text-paper/50">
          Selected product stories · 04
        </span>
      </header>

      <div className="relative pl-9">
        <MatRuler />
        <div className="flex flex-col gap-6">
          {stories.map((story, i) => (
            <MobileStory key={story.no} story={story} tilt={[-0.8, 0.9, -0.6, 0.7][i]} />
          ))}
        </div>
      </div>

      <header className="mt-14 mb-8 border-b border-paper/20 pb-3 pl-9">
        <h2 className="font-display text-[24px] leading-tight font-bold text-paper">
          Currently investigating.
        </h2>
        <span className="mono mt-2 block text-paper/50">
          The next stories aren't finished yet
        </span>
      </header>

      <div className="relative flex flex-col gap-6 pl-9">
        <MatRuler />
        <article className="paper-plain rounded-[5px] p-6 text-ink shadow-[0_20px_44px_-20px_rgba(0,0,0,.85)]">
          <span className="mono inline-block border border-pen px-2 py-1 text-pen">
            {credix.status}
          </span>
          <h3 className="mt-3 font-display text-[24px] font-bold">
            {credix.title}
          </h3>
          <p className="mt-3 font-body text-[16px] text-ink-soft">
            {credix.lede}
          </p>
          <p className="mt-3 font-body text-[15px]">{credix.body}</p>
          <div className="mt-4">
            {credix.pillars.map((pillar) => (
              <div key={pillar.no} className="flex gap-3 border-t border-rule py-2.5">
                <b className="mono pt-1 text-pen">{pillar.no}</b>
                <span className="font-body text-[15px]">{pillar.text}</span>
              </div>
            ))}
          </div>
        </article>

        {investigations.map((item, i) => (
          <article
            key={item.title}
            className="paper-kraft rounded-[4px] p-6 text-ink shadow-[0_20px_44px_-20px_rgba(0,0,0,.85)]"
            style={{ transform: `rotate(${i === 0 ? -0.7 : 0.8}deg)` }}
          >
            <span className="mono inline-block border border-pen px-2 py-1 text-pen">
              {item.status}
            </span>
            <h3 className="mt-3 font-display text-[21px] font-bold">
              {item.title}
            </h3>
            <p className="mt-2 font-body text-[15px] text-ink-soft">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** The mat's numbered edge, running beside the column. */
function MatRuler() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-7 border-r border-paper/15"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute right-0 left-0 flex items-center justify-between pr-1"
          style={{ top: `${(i / 20) * 100}%` }}
        >
          <span className="mono text-[8px] text-paper/40">{i + 1}</span>
          <span className="h-px w-2 bg-paper/25" />
        </div>
      ))}
    </div>
  );
}

function MobileStory({ story, tilt }: { story: Story; tilt: number }) {
  return (
    <article
      className="paper-plain rounded-[5px] p-6 text-ink shadow-[0_20px_44px_-20px_rgba(0,0,0,.85)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="font-display text-[40px] leading-none font-extrabold text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-rule)" }}
        >
          {story.no}
        </span>
        <span className="mono max-w-[55%] pt-2 text-right text-ink-soft">
          {story.category}
        </span>
      </div>

      <h3 className="mt-1 font-display text-[24px] leading-[1.08] font-bold">
        {story.title}
      </h3>
      <p className="mt-2 font-body text-[16px] text-ink-soft italic">
        {story.teaser}
      </p>

      <dl className="mt-4">
        {(
          [
            ["I noticed", story.noticed],
            ["I questioned", story.questioned],
            ["I built", story.built],
          ] as const
        ).map(([term, value]) => (
          <div key={term} className="border-t border-rule py-2.5">
            <dt className="mono text-pen">{term}</dt>
            <dd className="mt-1 font-body text-[15px] leading-[1.5]">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mono mt-4 text-ink-soft">
        {story.links.map((l) => l.label).join(" · ")}
      </p>
    </article>
  );
}
