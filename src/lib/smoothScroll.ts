import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Lenis smooth scroll, driven off the GSAP ticker so ScrollTrigger and Lenis
 * agree on one scroll position. Skipped entirely for reduced motion — the page
 * then uses the browser's own scrolling.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const instance = new Lenis({
      // The smooth scroll should track the input, not coast after it: a short
      // glide, and a wheel step that covers a little more than native distance
      // rather than less.
      duration: 0.8,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    lenis = instance;

    const update = () => ScrollTrigger.update();
    instance.on("scroll", update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.off("scroll", update);
      gsap.ticker.remove(raf);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, [enabled]);
}

/**
 * Jumps to an absolute position, through Lenis when it is running.
 *
 * A native `window.scrollTo` issued while Lenis is driving gets overridden on
 * its next frame, because Lenis restores its own internal target. Route
 * restoration has to go through it or it does not stick.
 */
export function scrollToY(y: number, immediate = true) {
  if (lenis) {
    lenis.scrollTo(y, { immediate });
    return;
  }
  window.scrollTo(0, y);
}

/** Scrolls to an element id through Lenis when it is running, natively otherwise. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = targetFor(el);
  if (lenis) {
    lenis.scrollTo(top, { duration: 0.8 });
    return;
  }
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Vertical scroll position that brings an anchor into view. Cards inside a
 * pinned, horizontally-scrolling section don't have their own vertical
 * position, so their target is derived from how far along the pin they sit:
 * inside the pin, one pixel of scroll moves the track one pixel sideways.
 */
function targetFor(el: HTMLElement): number {
  const section = el.closest<HTMLElement>("[data-pin-section]");

  if (el.dataset.railX !== undefined && section) {
    const spacer = section.parentElement?.classList.contains("pin-spacer")
      ? section.parentElement
      : section;
    const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, spacer.offsetHeight - window.innerHeight);
    const travel = el.offsetLeft - window.innerWidth * 0.1;
    return spacerTop + Math.min(distance, Math.max(0, travel));
  }

  return el.getBoundingClientRect().top + window.scrollY - 80;
}
