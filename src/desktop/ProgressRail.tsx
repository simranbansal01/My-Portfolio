import { useEffect, useState } from "react";
import { chapters } from "../data/portfolio";
import { scrollToId } from "../lib/smoothScroll";

/**
 * Fixed numbered rail (1–18) on the right. The active stop is whichever chapter
 * anchor currently sits closest to the middle of the viewport — which keeps it
 * honest through the pinned, horizontally-scrolling belief section too.
 */
export function ProgressRail() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const readingLineY = window.innerHeight * 0.25;
      const readingLineX = window.innerWidth * 0.35;

      // The active stop is the last chapter whose anchor has crossed the
      // reading line, in document order — for the pinned belief cards that
      // line is vertical, because those cards arrive from the right.
      let current = 0;
      chapters.forEach((chapter, i) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();

        // Sideways chapters only start counting once their pinned section is
        // the thing on screen; after that, position along the x-axis decides.
        const sectionTop =
          el.closest<HTMLElement>("[data-pin-section]")?.getBoundingClientRect().top ?? rect.top;
        const passed =
          chapter.axis === "x"
            ? sectionTop < readingLineY && rect.left < readingLineX
            : rect.top < readingLineY;

        if (passed) current = i;
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

  const current = chapters[active];

  return (
    <nav
      aria-label="Section progress"
      className="fixed top-1/2 right-4 z-50 hidden -translate-y-1/2 flex-col items-end gap-1 rounded-2xl border border-ink/10 bg-paper/85 px-3 py-5 backdrop-blur-sm xl:flex"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="kicker text-ink-soft">{current.section}</span>
        <span className="kicker text-red">
          {String(active + 1).padStart(2, "0")}/{chapters.length}
        </span>
      </div>

      <div className="flex gap-3">
        <div className="relative w-px bg-ink/15">
          <div
            className="absolute top-0 left-0 w-px bg-red transition-[height] duration-[300ms] ease-out"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        <ol className="flex flex-col gap-1">
          {chapters.map((chapter, i) => {
            const isActive = i === active;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(chapter.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex items-center gap-2 text-right transition-colors duration-[300ms] ease-out ${
                    isActive ? "text-red" : "text-ink/35 hover:text-ink"
                  }`}
                >
                  {/* Label floats outside the rail so the resting state stays slim. */}
                  <span className="kicker absolute right-full mr-3 rounded-full bg-paper/90 px-2 py-1 whitespace-nowrap text-ink opacity-0 transition-opacity duration-[300ms] ease-out group-hover:opacity-100">
                    {chapter.label}
                  </span>
                  <span
                    className={`h-px transition-all duration-[300ms] ease-out ${
                      isActive ? "w-5 bg-red" : "w-2 bg-ink/30 group-hover:w-4"
                    }`}
                  />
                  <span className="font-mono w-6 text-[0.65rem] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
