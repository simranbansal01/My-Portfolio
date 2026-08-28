import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect } from "react";
import { SplitChars, SplitWords } from "../components/SplitText";
import { profile } from "../data/portfolio";
import { charsDuration, DUR, EASE_OUT } from "../lib/motion";
import { useLocalTime } from "../lib/hooks";
import { stickers } from "../lib/stickers";
import type { Sticker } from "../lib/stickers";

/** The statement starts stacking in once the job title has finished. */
const STATEMENT_DELAY = charsDuration(profile.jobTitle) + 0.1;
const CAPTION_DELAY = STATEMENT_DELAY + 0.5;

type HeroProps = { reduced: boolean };

export function Hero({ reduced }: HeroProps) {
  const time = useLocalTime(profile.timeZone);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      pointerX.set(event.clientX - window.innerWidth / 2);
      pointerY.set(event.clientY - window.innerHeight / 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY, reduced]);

  return (
    <section
      id="ch-index"
      className="relative flex h-screen min-h-[46rem] w-full flex-col justify-between overflow-hidden px-14 pt-10 pb-12 xl:pr-36"
    >
      {stickers.map((sticker, i) => (
        <ParallaxSticker
          key={sticker.src}
          sticker={sticker}
          index={i}
          pointerX={pointerX}
          pointerY={pointerY}
          reduced={reduced}
        />
      ))}

      <header className="relative z-10 flex items-baseline justify-between border-b rule pb-4">
        <span className="kicker text-ink">{profile.name}</span>
        <span className="kicker text-ink-soft">Revenue Operations &amp; Finance Systems</span>
        <span className="kicker text-ink-soft">Portfolio — Vol. 01</span>
      </header>

      <div className="relative z-10 w-full max-w-6xl">
        <p className="hand mb-1 text-3xl text-red">currently building —</p>

        <h1 className="text-[clamp(4rem,10vw,9rem)] leading-[0.94] tracking-[-0.03em]">
          <SplitChars text={profile.jobTitle} reduced={reduced} />
        </h1>

        <p className="mt-6 max-w-4xl font-display text-[clamp(1.4rem,2.2vw,2.3rem)] leading-[1.24] text-ink-soft">
          <SplitWords text={profile.statement} reduced={reduced} baseDelay={STATEMENT_DELAY} />
        </p>
      </div>

      <motion.div
        id="ch-now"
        className="relative z-10 flex items-center justify-between border-t rule pt-4"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: CAPTION_DELAY, duration: DUR.base, ease: EASE_OUT }}
      >
        <p className="kicker text-ink-soft">
          {profile.location} —{" "}
          <span className="tabular-nums text-ink">{time}</span> {profile.timeZoneLabel}
        </p>
        <p className="kicker text-ink-soft">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-olive align-middle" />
          {profile.available}
        </p>
        <p className="kicker text-ink-soft">Scroll ↓</p>
      </motion.div>
    </section>
  );
}

type StickerProps = {
  sticker: Sticker;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduced: boolean;
};

/**
 * A cutout that lags behind the cursor: the raw pointer offset is scaled by the
 * sticker's own depth, then run through a spring, so it eases toward the target
 * rather than tracking it exactly.
 */
function ParallaxSticker({ sticker, index, pointerX, pointerY, reduced }: StickerProps) {
  const spring = { stiffness: 60, damping: 20, mass: 0.8 };
  const x = useSpring(useTransform(pointerX, (v) => v * sticker.depth), spring);
  const y = useSpring(useTransform(pointerY, (v) => v * sticker.depth), spring);

  return (
    <motion.img
      src={sticker.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="sticker-shadow pointer-events-none absolute select-none"
      style={{
        ...sticker.style,
        rotate: sticker.rotate,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
      }}
      initial={reduced ? false : { opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.06, duration: DUR.slow, ease: EASE_OUT }}
    />
  );
}
