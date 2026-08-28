import { motion } from "framer-motion";
import { education } from "../data/portfolio";
import { DUR, EASE_OUT } from "../lib/motion";

type Props = { reduced: boolean };

export function Studies({ reduced }: Props) {
  return (
    <section id="ch-education" className="border-t rule bg-teal px-14 py-24 text-paper xl:pr-40">
      <div className="flex items-end justify-between border-b border-paper/25 pb-6">
        <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none">Studies &amp; letters</h2>
        <p className="kicker text-paper/60">07 — Credentials</p>
      </div>

      <div className="mt-12 flex flex-col">
        {education.map((item, i) => (
          <motion.div
            key={item.title}
            className="grid grid-cols-[1fr_1fr_auto] items-baseline gap-8 border-b border-paper/20 py-8"
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: DUR.base, ease: EASE_OUT, delay: i * 0.06 }}
          >
            <p className="font-display text-2xl">{item.title}</p>
            <p className="text-sm text-paper/70">{item.school}</p>
            <p className="kicker text-paper/70">{item.year}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
