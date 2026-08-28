import { motion } from "framer-motion";
import { numbers } from "../data/portfolio";
import { DUR, EASE_OUT } from "../lib/motion";

type Props = { reduced: boolean };

export function Numbers({ reduced }: Props) {
  return (
    <section id="ch-numbers" className="border-y rule bg-mustard px-14 py-24 text-ink xl:pr-40">
      <p className="kicker mb-12">05 — Receipts</p>
      <div className="grid grid-cols-4 gap-10">
        {numbers.map((item, i) => (
          <motion.div
            key={item.label}
            className="border-t-2 border-ink pt-6"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: DUR.slow, ease: EASE_OUT, delay: i * 0.06 }}
          >
            <p className="font-display text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.04em]">
              {item.value}
            </p>
            <p className="mt-4 max-w-[18ch] text-sm leading-relaxed">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
