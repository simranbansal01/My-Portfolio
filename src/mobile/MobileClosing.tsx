import { motion } from "framer-motion";
import { education, numbers, profile, toolkit } from "../data/portfolio";
import { DUR, EASE_OUT } from "../lib/motion";

type Props = { reduced: boolean };

export function MobileClosing({ reduced }: Props) {
  return (
    <>
      <section id="m-numbers" className="border-y rule bg-mustard px-5 py-12 text-ink">
        <p className="kicker mb-6">Receipts</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {numbers.map((item, i) => (
            <motion.div
              key={item.label}
              className="border-t-2 border-ink pt-3"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: DUR.base, ease: EASE_OUT, delay: (i % 2) * 0.06 }}
            >
              <p className="font-display text-4xl leading-none tracking-[-0.03em]">{item.value}</p>
              <p className="mt-2 text-xs leading-relaxed">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="m-toolkit" className="bg-paper px-5 py-12">
        <p className="kicker mb-6 text-ink-soft">The toolkit</p>
        <div className="flex flex-col gap-6">
          {toolkit.map((group) => (
            <div key={group.id} className="border-b rule pb-5">
              <p className="kicker text-red">{group.category}</p>
              <p className="mt-3 font-display text-lg leading-relaxed">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="m-studies" className="bg-teal px-5 py-12 text-paper">
        <p className="kicker mb-6 text-paper/60">Studies &amp; letters</p>
        <ul className="flex flex-col gap-5">
          {education.map((item) => (
            <li key={item.title} className="border-b border-paper/20 pb-4">
              <p className="font-display text-xl leading-tight">{item.title}</p>
              <p className="mt-1 text-xs text-paper/70">
                {item.school} · {item.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <footer id="m-contact" className="bg-ink px-5 pt-14 pb-28 text-paper">
        <h2 className="font-display text-[13vw] leading-[0.95] tracking-[-0.03em]">
          Let&rsquo;s build something defensible.
        </h2>
        <p className="hand mt-4 text-3xl text-mustard">{profile.available}</p>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="kicker rounded-full bg-red px-6 py-4 text-center text-paper"
          >
            {profile.email} ↗
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="kicker rounded-full border border-paper/40 px-6 py-4 text-center">
            {profile.phone} ↗
          </a>
          <a
            href={profile.credix}
            target="_blank"
            rel="noreferrer"
            className="kicker rounded-full border border-paper/40 px-6 py-4 text-center"
          >
            The Credix ↗
          </a>
        </div>

        <p className="kicker mt-10 text-paper/40">
          {profile.name} · {profile.location}
        </p>
      </footer>
    </>
  );
}
