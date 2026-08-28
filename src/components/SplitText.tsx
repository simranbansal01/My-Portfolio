import { motion } from "framer-motion";
import { CHAR_STAGGER, DUR, EASE_OUT, WORD_STAGGER } from "../lib/motion";

type SplitProps = {
  text: string;
  reduced: boolean;
  className?: string;
  /** Seconds before the first character/word starts. */
  baseDelay?: number;
};

/**
 * Every character is its own span, revealed on a 40ms stagger from y:100% /
 * opacity 0. Characters are grouped per word so a title never breaks mid-word.
 */
export function SplitChars({ text, reduced, className = "", baseDelay = 0 }: SplitProps) {
  const words = text.split(" ");
  // Index of each word's first character in the whole string, so the stagger
  // keeps an even beat across the spaces too.
  const offsets = words.map((_, w) =>
    words.slice(0, w).reduce((total, word) => total + word.length + 1, 0),
  );

  return (
    <span className={`flex flex-wrap ${className}`}>
      {words.map((word, w) => (
        <span key={`w-${w}`} className="inline-flex whitespace-nowrap">
          {word.split("").map((char, c) => {
            const index = offsets[w] + c;
            return (
              <span key={index} className="inline-block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="inline-block"
                  initial={reduced ? false : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: baseDelay + index * CHAR_STAGGER,
                    duration: DUR.reveal,
                    ease: EASE_OUT,
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/** The statement headline: one word per span, revealed word by word on load. */
export function SplitWords({ text, reduced, className = "", baseDelay = 0 }: SplitProps) {
  const words = text.split(" ");

  return (
    <span className={`flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: baseDelay + i * WORD_STAGGER,
              duration: DUR.slow,
              ease: EASE_OUT,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
