import { useRef, useState } from "react";
import { beliefs } from "../data/portfolio";

/**
 * Mobile beliefs: a native scroll-snap belt the thumb drives directly. No pin,
 * no scrubbing — hijacking a phone's scroll to move cards sideways feels broken.
 */
export function BeliefBelt() {
  const beltRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const belt = beltRef.current;
    if (!belt) return;
    const card = belt.scrollWidth / beliefs.length;
    setIndex(Math.min(beliefs.length - 1, Math.round(belt.scrollLeft / card)));
  };

  return (
    <section id="m-beliefs" className="border-y rule bg-paper-deep py-12">
      <div className="mb-6 flex items-baseline justify-between px-5">
        <p className="kicker text-ink-soft">What I hold to</p>
        <p className="kicker text-red tabular-nums">
          {index + 1}/{beliefs.length}
        </p>
      </div>

      <div
        ref={beltRef}
        onScroll={onScroll}
        className="snap-belt flex gap-4 overflow-x-auto px-5 pb-4"
      >
        {beliefs.map((belief) => (
          <article
            key={belief.index}
            className={`snap-item flex min-h-[19rem] w-[82vw] shrink-0 flex-col justify-between border-2 border-ink p-6 card-edge-soft ${
              belief.tint === "red"
                ? "bg-red text-paper"
                : belief.tint === "mustard"
                  ? "bg-mustard text-ink"
                  : "bg-teal text-paper"
            }`}
          >
            <span className="kicker opacity-80">Belief {belief.index}</span>
            <h2 className="font-display text-3xl leading-tight">{belief.title}</h2>
            <p className="text-sm leading-relaxed opacity-90">{belief.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {beliefs.map((belief, i) => (
          <span
            key={belief.index}
            className={`h-1.5 rounded-full transition-all duration-[300ms] ease-out ${
              i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
