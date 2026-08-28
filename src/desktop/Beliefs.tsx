import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { beliefs } from "../data/portfolio";
import type { Belief } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const TINT: Record<Belief["tint"], { card: string; ink: string; wash: string }> = {
  red: { card: "bg-red", ink: "text-paper", wash: "bg-[repeating-linear-gradient(0deg,transparent,transparent_38px,rgba(242,233,216,0.28)_38px,rgba(242,233,216,0.28)_39px)]" },
  mustard: { card: "bg-mustard", ink: "text-ink", wash: "bg-[repeating-linear-gradient(90deg,transparent,transparent_38px,rgba(23,21,15,0.12)_38px,rgba(23,21,15,0.12)_39px)]" },
  teal: { card: "bg-teal", ink: "text-paper", wash: "bg-[radial-gradient(rgba(242,233,216,0.32)_1.5px,transparent_1.5px)] bg-[length:22px_22px]" },
};

type BeliefsProps = { reduced: boolean };

/**
 * The section pins while the three cards translate on the x-axis, then unpins.
 */
export function Beliefs({ reduced }: BeliefsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      data-pin-section
      className="relative h-screen min-h-[44rem] overflow-hidden border-y rule bg-paper-deep"
    >
      <div className="pointer-events-none absolute top-10 left-14 z-10">
        <p className="kicker text-ink-soft">02 — What I hold to</p>
      </div>

      <div
        ref={trackRef}
        className={
          reduced
            ? "flex h-full items-center gap-10 overflow-x-auto px-14"
            : "flex h-full items-center gap-16 px-[8vw] pr-[26vw] will-change-transform"
        }
      >
        {beliefs.map((belief, i) => (
          <article
            key={belief.index}
            id={`ch-belief-${belief.index}`}
            data-rail-x
            className={`relative flex h-[30rem] w-[40rem] shrink-0 flex-col justify-between border-2 border-ink p-12 card-edge ${TINT[belief.tint].card} ${TINT[belief.tint].ink}`}
            style={{ rotate: `${i % 2 === 0 ? -1.4 : 1.6}deg` }}
          >
            <div className={`pointer-events-none absolute inset-0 ${TINT[belief.tint].wash}`} />
            <div className="relative flex items-start justify-between">
              <span className="kicker opacity-80">Belief {belief.index}</span>
              <span className="hand text-4xl leading-none opacity-90">no.{belief.index}</span>
            </div>
            <h2 className="relative max-w-[18ch] font-display text-[clamp(1.9rem,2.6vw,2.7rem)] leading-[1.06] tracking-[-0.02em]">
              {belief.title}
            </h2>
            <p className="relative max-w-[52ch] text-sm leading-relaxed opacity-90">{belief.body}</p>
          </article>
        ))}

        <div className="hidden h-[30rem] w-[26rem] shrink-0 items-center justify-center lg:flex">
          <p className="hand max-w-[16ch] text-center text-5xl leading-tight text-ink">
            …and then we get to the receipts.
          </p>
        </div>
      </div>
    </section>
  );
}
