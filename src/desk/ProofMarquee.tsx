import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { proof } from "../data/portfolio";

/**
 * The verified numbers, run as a printed band across the board.
 *
 * These are the only figures on the site, so they get the only continuous
 * loop — it never stops, and it is the one place the pen colour reports on
 * something Simran actually did. Currencies are printed as sourced: CAD is
 * CAD, and nothing here is converted.
 */
export function ProofMarquee({ reduced }: { reduced: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || reduced) return;
    // Three copies are rendered; travelling exactly one third puts copy two
    // where copy one started, so the loop has no seam.
    const tween = gsap.to(el, {
      xPercent: -33.333,
      duration: 34,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
      gsap.set(el, { xPercent: 0 });
    };
  }, [reduced]);

  const items = [...proof, ...proof, ...proof];

  return (
    <section
      aria-label="Verified figures"
      className="relative z-10 overflow-hidden border-y border-paper/25 py-4"
    >
      <div ref={track} className="flex w-max gap-14" aria-hidden="true">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display text-[22px] whitespace-nowrap text-paper"
          >
            {item.before}
            {item.figure && (
              <b className="font-bold text-pen">{item.figure}</b>
            )}
            {item.after}
          </span>
        ))}
      </div>

      {/* The same figures, once, for anything that reads rather than watches. */}
      <ul className="sr-only">
        {proof.map((item, i) => (
          <li key={i}>
            {item.before}
            {item.figure}
            {item.after}
          </li>
        ))}
      </ul>
    </section>
  );
}
