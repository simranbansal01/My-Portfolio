import { motion } from "framer-motion";
import { SplitChars, SplitWords } from "../components/SplitText";
import { profile } from "../data/portfolio";
import { useLocalTime } from "../lib/hooks";
import { charsDuration, DUR, EASE_OUT } from "../lib/motion";
import { stickerCollage } from "../lib/stickers";

const STATEMENT_DELAY = charsDuration(profile.jobTitle) + 0.1;

type Props = { reduced: boolean };

/**
 * Phone hero: a stacked card, not a scaled-down desktop stage. The stickers sit
 * in a tidy strip along the bottom instead of drifting behind the type — there
 * is no cursor to drift from.
 */
export function MobileHero({ reduced }: Props) {
  const time = useLocalTime(profile.timeZone);

  return (
    <section id="m-index" className="flex min-h-[100svh] flex-col justify-between px-5 pt-6 pb-28">
      <div className="flex items-center justify-between border-b rule pb-3">
        <span className="kicker">{profile.name}</span>
        <span className="kicker text-ink-soft tabular-nums">
          {time} {profile.timeZoneLabel}
        </span>
      </div>

      <div className="py-10">
        <p className="hand mb-1 text-2xl text-red">currently building —</p>
        <h1 className="text-[15vw] leading-[0.95] tracking-[-0.03em]">
          <SplitChars text={profile.jobTitle} reduced={reduced} />
        </h1>

        <p className="mt-6 font-display text-xl leading-snug text-ink-soft">
          <SplitWords text={profile.statement} reduced={reduced} baseDelay={STATEMENT_DELAY} />
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="kicker mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-paper active:scale-[0.97] transition-transform duration-[300ms] ease-out"
        >
          Start a conversation ↗
        </a>
      </div>

      <div>
        <div className="flex items-end gap-3 overflow-hidden">
          {stickerCollage.slice(0, 5).map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className="sticker-shadow h-16 w-16 object-contain"
              style={{ rotate: i % 2 === 0 ? -6 : 7 }}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: DUR.base, ease: EASE_OUT }}
            />
          ))}
        </div>
        <p className="kicker mt-5 border-t rule pt-3 text-ink-soft">
          {profile.location} · {profile.available}
        </p>
      </div>
    </section>
  );
}
