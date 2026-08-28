import { motion } from "framer-motion";
import { badges } from "../lib/badges";
import { DUR, EASE_OUT } from "../lib/motion";

type Props = { reduced: boolean };

/**
 * Mobile stack: a legible contact-sheet grid. The desktop marquee's hover-pause
 * and scroll-reversal have no thumb equivalent, so the phone gets a grid that
 * can actually be read instead of a strip that slides past.
 */
export function StackSheet({ reduced }: Props) {
  return (
    <section id="m-stack" className="bg-ink px-5 py-12 text-paper">
      <p className="kicker mb-8 text-paper/60">The stack I actually run</p>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8">
        {badges.map((badge, i) => (
          <motion.li
            key={badge.label}
            className="flex flex-col items-center gap-2 text-center"
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: (i % 3) * 0.05 }}
          >
            <img src={badge.src} alt="" aria-hidden="true" className="h-16 w-16 rounded-full" />
            <span className="kicker text-[0.6rem] leading-tight text-paper/70">{badge.label}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
