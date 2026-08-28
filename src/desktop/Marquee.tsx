import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from "framer-motion";
import { useState } from "react";
import { badges } from "../lib/badges";
import { useScrollDirection } from "../lib/useScrollDirection";

/** Percent of the doubled strip travelled per second — one full loop in 30s. */
const SPEED = 50 / 30;

type MarqueeProps = { reduced: boolean };

/**
 * The badge array is rendered twice and the strip slides from 0 to -50%, so the
 * second copy takes over exactly where the first began. It parks on hover and
 * runs backwards while the visitor scrolls up.
 */
export function Marquee({ reduced }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const direction = useScrollDirection();
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced || paused) return;
    const sign = direction === "up" ? 1 : -1;
    baseX.set(baseX.get() + (sign * SPEED * delta) / 1000);
  });

  const items = [...badges, ...badges];

  return (
    <section id="ch-stack" className="relative border-b rule bg-ink py-16 text-paper">
      <div className="mb-10 flex items-baseline justify-between px-14 xl:pr-40">
        <p className="kicker text-paper/60">03 — The stack I actually run</p>
        <p className="kicker text-paper/40">
          {reduced ? "static" : paused ? "paused" : direction === "up" ? "reverse ←" : "running →"}
        </p>
      </div>

      <div
        className={`flex ${reduced ? "overflow-x-auto px-14" : "overflow-hidden"}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div className="flex shrink-0" style={reduced ? undefined : { x }}>
          {items.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              className="flex w-44 shrink-0 flex-col items-center gap-3 pr-10"
              aria-hidden={i >= badges.length ? "true" : undefined}
            >
              <img
                src={item.src}
                alt={i >= badges.length ? "" : `${item.label} badge`}
                className="h-24 w-24 rounded-full ring-1 ring-paper/25 transition-transform duration-[400ms] ease-out hover:scale-[1.08]"
                draggable={false}
              />
              <span className="kicker whitespace-nowrap text-paper/70">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="mt-10 px-14 text-sm text-paper/45 xl:pr-40">
        Hover to hold the strip · it reverses when you scroll back up.
      </p>
    </section>
  );
}
