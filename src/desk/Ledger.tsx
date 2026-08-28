import { useRef, useState } from "react";
import { CheckBox, Tick, Underline } from "../art/Marks";
import { ledger, routeLine } from "../data/portfolio";
import { useScrub } from "../lib/scrub";

/**
 * How I got here.
 *
 * A cream card lying on the board, ruled like a reconciliation sheet. The rows
 * tick off in red as the scroll passes through them — the career read the way
 * Simran read a ledger, one line at a time, in pen.
 *
 * The ticks are scrubbed, not triggered, so scrolling back un-ticks them.
 */
export function Ledger({ reduced }: { reduced: boolean }) {
  const section = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(reduced ? ledger.length : 0);

  useScrub(
    section,
    (p) => setDone(Math.round(p * ledger.length)),
    { start: "top 78%", end: "bottom 72%", scrub: 0.4, enabled: !reduced },
  );

  return (
    <section
      ref={section}
      className="relative z-10 px-4 pt-16 pb-24 lg:px-24"
      aria-labelledby="ledger-heading"
    >
      <div className="paper-plain relative mx-auto max-w-[940px] rounded-[26px] px-8 py-12 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)] sm:px-14">
        <div className="max-w-[420px]">
          <h2
            id="ledger-heading"
            className="font-display text-[clamp(26px,3.4vw,40px)] font-bold"
          >
            How I got here.
          </h2>
          <div className="mt-1 text-pen">
            <Underline />
          </div>
        </div>
        <p className="mono mt-3 text-ink-soft">
          Finance taught me to see the system behind the screen
        </p>

        <ul className="mt-10">
          {ledger.map((line, i) => {
            const ticked = i < done;
            return (
              <li
                key={line}
                className="grid grid-cols-[28px_1fr_auto] items-center gap-5 border-b border-dashed border-pen/35 py-4"
              >
                <span className="relative block h-5 w-5 text-pen">
                  <CheckBox />
                  <span
                    className="absolute -top-1 -left-0.5 origin-center text-pen transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(.34,1.56,.64,1)]"
                    style={{
                      opacity: ticked ? 1 : 0,
                      transform: ticked
                        ? "scale(1) rotate(-8deg)"
                        : "scale(.4) rotate(-16deg)",
                    }}
                  >
                    <Tick />
                  </span>
                </span>

                <span
                  className="font-display text-[clamp(18px,2.3vw,29px)] leading-tight font-semibold transition-opacity duration-500"
                  style={{ opacity: ticked ? 1 : 0.32 }}
                >
                  {line}
                </span>

                <span className="mono text-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mono mt-10 text-center leading-[2.1] text-ink-soft">
          {routeLine}
        </p>
      </div>
    </section>
  );
}
