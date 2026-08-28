import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "down" | "up";

/** Reports the current scroll direction, ignoring sub-threshold jitter. */
export function useScrollDirection(threshold = 6): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("down");
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - last.current;
        if (Math.abs(delta) < threshold) return;
        setDirection(delta > 0 ? "down" : "up");
        last.current = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return direction;
}
