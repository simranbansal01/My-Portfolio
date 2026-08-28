import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projects } from "../data/portfolio";
import { DUR, EASE_OUT } from "../lib/motion";

type Props = { reduced: boolean };

/**
 * Mobile work: a tap-to-open ledger list. Full-bleed hover cards can't work
 * without a pointer, so detail is disclosed on tap instead.
 */
export function WorkList({ reduced }: Props) {
  const [open, setOpen] = useState<string | null>(projects[0].id);

  return (
    <section id="m-work" className="bg-paper px-5 py-12">
      <div className="mb-8 border-b rule pb-4">
        <p className="kicker text-ink-soft">Selected work</p>
        <h2 className="mt-2 font-display text-4xl leading-none tracking-[-0.02em]">
          Ledgers I have <span className="hand text-red">put back together</span>
        </h2>
      </div>

      <ul className="flex flex-col gap-3">
        {projects.map((project) => {
          const isOpen = open === project.id;
          return (
            <li key={project.id} className="border-2 border-ink bg-paper-deep">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : project.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span>
                  <span className="kicker text-red">{project.index}</span>
                  <span className="mt-1 block font-display text-2xl leading-tight">{project.title}</span>
                  <span className="kicker mt-1 block text-ink-soft">{project.period}</span>
                </span>
                <span
                  className={`text-2xl transition-transform duration-[300ms] ease-out ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: DUR.base, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="border-t rule px-5 pt-5 pb-6">
                      <p className="kicker mb-3 text-ink-soft">{project.role}</p>
                      <p className="text-sm leading-relaxed text-ink-soft">{project.summary}</p>
                      <ul className="mt-4 flex flex-col gap-3">
                        {project.points.map((point) => (
                          <li key={point} className="flex gap-2 text-sm leading-relaxed">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-col items-start gap-4">
                        <p className="font-display text-3xl leading-none">
                          {project.metric.value}{" "}
                          <span className="kicker text-ink-soft">{project.metric.label}</span>
                        </p>
                        {project.link && (
                          <a
                            href={project.link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="kicker rounded-full bg-ink px-4 py-2 text-paper"
                          >
                            {project.link.label} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
