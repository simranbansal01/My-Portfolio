import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DeskScene } from "../art/Scenes";
import { identity, intro } from "../data/portfolio";
import { useLocalTime } from "../lib/hooks";

/**
 * The notebook.
 *
 * A red moulded case lying on the board, holding two paper pages separated by
 * a ribbon bookmark. It is an object, not a section: it scrolls up out of
 * frame as one piece, and the belief notes further down are positioned to
 * spill over its bottom edge onto the desk.
 */

export function Notebook({ reduced }: { reduced: boolean }) {
  return (
    <section id="about" className="relative px-4 pt-44 pb-0 lg:px-20">
      <div className="bezel relative mx-auto max-w-[1120px] rounded-[46px] p-[17px] pb-[30px]">
        <div className="overflow-hidden rounded-[32px]">
          <HeroPage reduced={reduced} />
          <Seam />
          <IntroPage />
        </div>
      </div>
    </section>
  );
}

/* ── page one ─────────────────────────────────────────────────────────── */

function HeroPage({ reduced }: { reduced: boolean }) {
  const time = useLocalTime(identity.timezone);

  return (
    <div className="paper-grid relative px-8 pt-14 pb-10 sm:px-14 md:px-20 md:pt-16 md:pb-14">
      <div className="relative z-10 max-w-[620px]">
        <Signature reduced={reduced} />

        <h1 className="sr-only">{identity.name}</h1>

        <p className="mt-6 max-w-[22rem] font-display text-[clamp(21px,3vw,36px)] leading-[1.12] font-bold tracking-[-0.01em] text-ink uppercase">
          {identity.tagline}
        </p>

        <RotatingRole reduced={reduced} />

        <p className="mt-8 max-w-[46ch] font-body text-[19px] text-ink-soft">
          {identity.deck}
        </p>

        <p className="mono mt-9 text-ink-soft">
          {identity.route} · {identity.timezoneLabel} ·{" "}
          <span className="tabular-nums">{time}</span>
        </p>
      </div>

      {/* The drawing sits in the page's right margin and is allowed to run off
          the bottom edge, the way an illustration bleeds off a printed page. */}
      <DeskScene className="pointer-events-none absolute right-[-52px] bottom-[-16px] hidden w-[52%] max-w-[640px] text-pen md:block" />
    </div>
  );
}

/** The name, written rather than typeset, with the flourish drawn under it. */
function Signature({ reduced }: { reduced: boolean }) {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    if (reduced) {
      gsap.set(el, { strokeDashoffset: 0 });
      return;
    }
    const len = el.getTotalLength();
    gsap.fromTo(
      el,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 0.8, delay: 0.5, ease: "power2.inOut" },
    );
  }, [reduced]);

  return (
    <div className="relative inline-block">
      <span className="hand block text-[52px] leading-none font-bold text-pen md:text-[64px]">
        {identity.signature}
      </span>
      <svg
        viewBox="0 0 200 26"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="absolute -bottom-1 left-0 h-5 w-[112%] overflow-visible text-pen"
      >
        <path
          ref={path}
          d="M2 16 C46 6 96 22 140 12 C158 8 176 10 186 4 C192 0 190 -3 182 1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/**
 * The rotating line. Each role slides up and out while the next slides in —
 * the one continuous loop on the page that scroll does not drive, because it
 * is a clock, not a position.
 */
function RotatingRole({ reduced }: { reduced: boolean }) {
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
      <p className="mt-3 font-display text-[clamp(24px,3.4vw,42px)] leading-[1.1] font-normal text-pen italic">
        {roles[0]}
      </p>
    );
  }

  return (
    <div className="relative mt-3 h-[1.38em] overflow-hidden font-display text-[clamp(24px,3.4vw,42px)] leading-[1.1] font-normal text-pen italic">
      {roles.map((role, i) => (
        <span
          key={role}
          aria-hidden={i !== index}
          className="absolute inset-x-0 top-0 whitespace-nowrap transition-transform duration-[620ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{
            // Each role parks a clear line outside the mask. The offset is a
            // percentage of the line box (1.1em) and the mask is 1.38em, so
            // anything under 126% leaves the next role's ascenders showing
            // along the bottom edge — which face is set decides how far they
            // reach, so the margin is taken here rather than tuned per font.
            transform: `translateY(${(i - index) * 135}%)`,
          }}
        >
          {role}
        </span>
      ))}
    </div>
  );
}

/* ── the seam between pages ───────────────────────────────────────────── */

/** A ribbon bookmark laid across the fold, its ends escaping the case. */
function Seam() {
  return (
    <div className="relative h-0">
      <div className="absolute inset-x-0 top-0 h-px bg-rule" />
      <RibbonEnd side="left" />
      <RibbonEnd side="right" />
    </div>
  );
}

function RibbonEnd({ side }: { side: "left" | "right" }) {
  return (
    <svg
      width={72}
      height={40}
      viewBox="0 0 72 40"
      aria-hidden="true"
      focusable="false"
      className={[
        "absolute -top-4 text-pen-soft",
        side === "left" ? "-left-14" : "-right-14 -scale-x-100",
      ].join(" ")}
    >
      <path
        d="M72 4 L10 16 L0 26 L14 30 L72 22 Z"
        fill="currentColor"
        opacity={0.85}
      />
      <path d="M10 16 L14 30" stroke="rgba(20,19,14,.25)" strokeWidth={1.5} />
    </svg>
  );
}

/* ── page two ─────────────────────────────────────────────────────────── */

/**
 * The editorial intro, set in columns with a drop cap, then the heading that
 * hands over to the notes on the board below.
 */
function IntroPage() {
  return (
    <div className="paper-plain relative px-8 pt-14 pb-36 sm:px-14 md:px-20 md:pb-44">
      <div className="columns-1 gap-9 text-ink md:columns-2 lg:columns-3 [&>p]:mb-4 [&>p]:break-inside-avoid [&>p]:text-justify [&>p]:hyphens-auto">
        {intro.map((para, i) => (
          <p
            key={para}
            className={
              i === 0
                ? "first-letter:float-left first-letter:pt-1.5 first-letter:pr-2 first-letter:font-display first-letter:text-[74px] first-letter:leading-[0.76] first-letter:font-bold"
                : undefined
            }
          >
            {para}
          </p>
        ))}
      </div>

      <h2 className="mt-16 text-center font-display text-[clamp(22px,3vw,34px)] font-bold text-pen">
        3 things I strongly believe in
      </h2>
    </div>
  );
}
