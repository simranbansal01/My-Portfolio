import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll position is the playhead.
 *
 * Everything scroll-driven on this site is scrubbed, never triggered — a
 * reveal that fires once at a threshold makes the page feel like a slideshow
 * instead of an object you are moving through. These helpers exist so no
 * component reaches for `whileInView`.
 */

type ScrubOptions = {
  start?: string;
  end?: string;
  /** Seconds of catch-up. 1 is the house default; 0 is a hard lock. */
  scrub?: number | boolean;
  pin?: boolean | Element;
  pinSpacing?: boolean;
  enabled?: boolean;
};

/**
 * Runs `onProgress` with 0→1 as the scroll passes the trigger. The callback is
 * held in a ref so a component can close over changing state without tearing
 * the ScrollTrigger down and rebuilding it on every render.
 */
export function useScrub(
  trigger: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  {
    start = "top bottom",
    end = "bottom top",
    scrub = 1,
    pin = false,
    pinSpacing = true,
    enabled = true,
  }: ScrubOptions = {},
) {
  // The latest callback is kept in a ref so a component can close over
  // changing state without the ScrollTrigger below being torn down and
  // rebuilt on every render. Written in an effect, never during render.
  const handler = useRef(onProgress);
  useLayoutEffect(() => {
    handler.current = onProgress;
  });

  useEffect(() => {
    const el = trigger.current;
    if (!el) return;

    if (!enabled) {
      // Reduced motion, or a viewport this effect does not apply to: hand the
      // component its finished state and leave.
      handler.current(1);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      scrub,
      pin,
      pinSpacing,
      anticipatePin: pin ? 1 : 0,
      invalidateOnRefresh: true,
      onUpdate: (self) => handler.current(self.progress),
      onRefresh: (self) => handler.current(self.progress),
    });

    return () => st.kill();
  }, [trigger, start, end, scrub, pin, pinSpacing, enabled]);
}

/**
 * Cursor parallax with a lerp. Never 1:1 — the annotation should feel like it
 * is floating a little above the page, not stuck to the pointer.
 *
 * `depth` is the multiplier: 0.01–0.05 is the useful range.
 */
export function useCursorDrift(
  el: RefObject<HTMLElement | null>,
  depth: number,
  enabled = true,
) {
  useEffect(() => {
    const node = el.current;
    if (!node || !enabled) return;

    const toX = gsap.quickTo(node, "x", { duration: 0.9, ease: "power3" });
    const toY = gsap.quickTo(node, "y", { duration: 0.9, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      toX((e.clientX - window.innerWidth / 2) * depth);
      toY((e.clientY - window.innerHeight / 2) * depth);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.set(node, { x: 0, y: 0 });
    };
  }, [el, depth, enabled]);
}

/** Maps `p` from [a, b] onto 0→1, clamped. The workhorse of every scrub. */
export function range(p: number, a: number, b: number): number {
  if (b === a) return p >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}

/** Linear interpolation, for driving a style value off a scrub. */
export function mix(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Refreshes ScrollTrigger once fonts land, so pinned heights are measured
 *  against the text as it will actually be set. */
export function useRefreshOnFonts() {
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
