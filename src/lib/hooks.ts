import { useEffect, useState } from "react";

/** Tracks a media query, re-evaluating on change. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * True when the visitor asked for reduced motion. Every animated component
 * reads this and renders its resting state instead of animating.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** The desktop layout and the mobile layout are two different component trees. */
export function useIsMobileLayout(): boolean {
  return useMediaQuery("(max-width: 899px), (pointer: coarse) and (max-width: 1100px)");
}

/** Local wall-clock time in a given IANA zone, ticking once a second. */
export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(timeZone)), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

function formatTime(timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}
