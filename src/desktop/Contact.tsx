import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import { DUR, EASE_OUT } from "../lib/motion";

type Props = { reduced: boolean };

export function Contact({ reduced }: Props) {
  return (
    <footer id="ch-contact" className="bg-ink px-14 py-28 text-paper xl:pr-40">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT }}
      >
        <p className="kicker text-paper/50">08 — Say hello</p>
        <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(3rem,7vw,7rem)] leading-[0.94] tracking-[-0.03em]">
          Let&rsquo;s build something defensible.
        </h2>
        <p className="hand mt-6 text-4xl text-mustard">{profile.available}</p>

        <div className="mt-14 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="kicker rounded-full bg-red px-8 py-4 text-paper transition-transform duration-[400ms] ease-out hover:scale-[1.03]"
          >
            {profile.email} ↗
          </a>
          <a
            href={profile.credix}
            target="_blank"
            rel="noreferrer"
            className="kicker rounded-full border border-paper/40 px-8 py-4 transition-transform duration-[400ms] ease-out hover:scale-[1.03]"
          >
            The Credix ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="kicker rounded-full border border-paper/40 px-8 py-4 transition-transform duration-[400ms] ease-out hover:scale-[1.03]"
          >
            LinkedIn ↗
          </a>
        </div>

        <div className="mt-20 flex items-baseline justify-between border-t border-paper/20 pt-6">
          <span className="kicker text-paper/40">{profile.name}</span>
          <span className="kicker text-paper/40">{profile.location}</span>
          <span className="kicker text-paper/40">Set in Playfair &amp; Space Mono</span>
        </div>
      </motion.div>
    </footer>
  );
}
