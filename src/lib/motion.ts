/**
 * Motion tokens. Every scripted transition on the site sits between 300ms and
 * 800ms — anything longer is a continuous loop (marquee) or spring physics
 * (sticker drift), never a one-shot transition.
 */
export const DUR = {
  fast: 0.3,
  base: 0.5,
  slow: 0.65,
  reveal: 0.8,
} as const;

/** Framer cubic-bezier for the editorial reveal (the GSAP power3.out shape). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Per-character stagger of the hero job title. */
export const CHAR_STAGGER = 0.04;

/** Word stagger of the hero statement headline. */
export const WORD_STAGGER = 0.06;

export const GSAP_EASE = "power3.out";

/** Seconds the per-character title reveal occupies, for sequencing what follows. */
export function charsDuration(text: string) {
  return text.length * CHAR_STAGGER;
}
