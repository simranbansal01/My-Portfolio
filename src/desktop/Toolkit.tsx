import { motion } from "framer-motion";
import { toolkit } from "../data/portfolio";
import { DUR, EASE_OUT } from "../lib/motion";

type Props = { reduced: boolean };

/**
 * An index-style list rather than a grid: each group owns its own band of the
 * scroll, which is what the numbered rail on the right is pointing at.
 */
export function Toolkit({ reduced }: Props) {
  return (
    <section className="bg-paper px-14 py-28 xl:pr-40">
      <div className="mb-6 flex items-end justify-between border-b rule pb-6">
        <h2 className="font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-none tracking-[-0.03em]">
          The toolkit
        </h2>
        <p className="kicker text-ink-soft">06 — Systems, standards, sharp edges</p>
      </div>

      <div className="flex flex-col">
        {toolkit.map((group, i) => (
          <motion.div
            key={group.id}
            id={`ch-${group.id}`}
            className="grid min-h-[15rem] grid-cols-[auto_1fr] items-center gap-12 border-b rule py-10"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: DUR.slow, ease: EASE_OUT }}
          >
            <div className="flex items-baseline gap-6">
              <span className="font-display text-3xl text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="w-[16ch] font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-none tracking-[-0.02em]">
                {group.category}
              </h3>
            </div>

            <ul className="flex flex-wrap justify-end gap-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-2 border-ink bg-paper-deep px-5 py-3 font-display text-xl transition-transform duration-[400ms] ease-out hover:scale-[1.03] card-edge-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
