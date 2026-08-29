import { useState } from "react";
import { Doodle, type DoodleId } from "../art/Doodles";
import { Ellipse } from "../art/Marks";
import { nav } from "../data/portfolio";
import { scrollToId } from "../lib/smoothScroll";

/**
 * The nav.
 *
 * Three words in pen, centred. Hovering one draws a ring around it and pops
 * the doodle that belongs to that section up above the bar — the section
 * announces itself with an object rather than a label.
 */

const DOODLE_FOR: Record<string, DoodleId> = {
  about: "notepad",
  work: "calculator",
  connect: "plane",
};

export function Nav({ reduced }: { reduced: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      aria-label="Sections"
      className="absolute inset-x-0 top-0 z-50 flex justify-center pt-[76px]"
    >
      <div className="relative flex items-end gap-8 sm:gap-12">
        {/* The doodle that rises over whichever item is hovered. */}
        <div className="pointer-events-none absolute bottom-full left-0 w-full">
          {nav.map((item) => (
            <span
              key={item.id}
              className="absolute bottom-1 flex w-24 justify-center transition-[opacity,transform] duration-300 ease-out"
              style={{
                left: `${(nav.findIndex((n) => n.id === item.id) + 0.5) * (100 / nav.length)}%`,
                marginLeft: "-3rem",
                opacity: hovered === item.id ? 0.65 : 0,
                transform:
                  hovered === item.id && !reduced
                    ? "translateY(0) rotate(-4deg)"
                    : "translateY(14px) rotate(-4deg)",
              }}
            >
              <Doodle id={DOODLE_FOR[item.id]} size={58} className="chalk" />
            </span>
          ))}
        </div>

        {nav.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToId(item.id)}
            onPointerEnter={() => setHovered(item.id)}
            onPointerLeave={() => setHovered(null)}
            onFocus={() => setHovered(item.id)}
            onBlur={() => setHovered(null)}
            className="hand relative cursor-pointer px-3 py-1 text-[26px] text-paper transition-colors duration-300 hover:text-pen focus-visible:text-pen focus-visible:outline-none"
          >
            <span className="relative z-10">{item.label}</span>
            <span
              className="absolute inset-0 -m-1 text-pen"
              style={{ opacity: hovered === item.id ? 1 : 0 }}
            >
              <Ellipse
                progress={hovered === item.id || reduced ? 1 : 0}
              />
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
