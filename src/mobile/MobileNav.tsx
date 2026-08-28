import { useEffect, useRef, useState } from "react";

const STOPS = [
  { id: "m-index", label: "Index" },
  { id: "m-beliefs", label: "Beliefs" },
  { id: "m-stack", label: "Stack" },
  { id: "m-work", label: "Work" },
  { id: "m-numbers", label: "Numbers" },
  { id: "m-toolkit", label: "Toolkit" },
  { id: "m-studies", label: "Studies" },
  { id: "m-contact", label: "Contact" },
];

/**
 * The phone equivalent of the desktop rail: a thumb-reachable bar with a
 * progress line and chapter chips, rather than eighteen 10px numbers.
 */
export function MobileNav() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const beltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = 0;
      STOPS.forEach((stop, i) => {
        const el = document.getElementById(stop.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);

      const scrollable = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the current chip in view as the page moves under the reader.
  useEffect(() => {
    beltRef.current?.children[active]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  return (
    <nav
      aria-label="Section progress"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/15 bg-paper/95 backdrop-blur"
    >
      <div className="h-0.5 w-full bg-ink/10">
        <div
          className="h-0.5 bg-red transition-[width] duration-[300ms] ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div ref={beltRef} className="snap-belt flex items-center gap-2 overflow-x-auto px-4 py-3">
        {STOPS.map((stop, i) => (
          <a
            key={stop.id}
            href={`#${stop.id}`}
            aria-current={i === active ? "true" : undefined}
            className={`kicker shrink-0 rounded-full border px-3 py-2 transition-colors duration-[300ms] ease-out ${
              i === active ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink-soft"
            }`}
          >
            <span className="tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>{" "}
            {stop.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
