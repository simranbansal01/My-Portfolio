import { useId, useState } from "react";
import { DemoFrame } from "./DemoFrame";

/**
 * The Golden Hour pivot.
 *
 * The story's turn is not a new dataset — it is a different question asked of
 * the same one. So the demo hands the visitor a control and holds the network
 * completely still while they move it: the dots never shift, only the framing
 * around them does.
 *
 * The bar carries no units. The story claims the window exists and that nobody
 * owns it, not how long it lasts or how much it could be shortened, and the
 * demo is not allowed to imply otherwise. The "not a replacement" line is part
 * of the reframe, so it appears with it rather than as a footnote.
 */

/** The network. Fixed, and identical under both framings — that is the point. */
const PEOPLE: [number, number][] = [
  [58, 46], [126, 118], [196, 38], [238, 150], [92, 158],
  [312, 74], [366, 132], [284, 26], [420, 60], [452, 148],
  [154, 74], [340, 176], [212, 96], [402, 104],
];

/** Where the incident lands once the question changes. */
const INCIDENT: [number, number] = [246, 92];

/** The three already closest to it, ringed under the second framing. */
const NEAREST = [12, 3, 1];

const VIEW = { w: 520, h: 200 };

export function PivotDemo() {
  const [t, setT] = useState(0);
  const sliderId = useId();

  const gig = 1 - t;

  return (
    <DemoFrame
      label="Try it · move the question"
      hint={t > 0.5 ? "The reframe" : "Where the research started"}
    >
      <div className="overflow-hidden rounded-sm border border-ink/20 bg-board">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="w-full"
          role="img"
          aria-label={
            t > 0.5
              ? "The same network of people, with an incident marked among them and the response window shown."
              : "A network of gig workers moving across a city."
          }
        >
          {/* streets */}
          <g stroke="rgba(232,230,223,.08)" strokeWidth={1}>
            {[70, 160, 250, 340, 430].map((x) => (
              <line key={x} x1={x} y1="0" x2={x - 22} y2={VIEW.h} />
            ))}
            {[52, 104, 156].map((y) => (
              <line key={y} x1="0" y1={y} x2={VIEW.w} y2={y - 14} />
            ))}
          </g>

          {/* the incident, and how far out it reaches — second framing only */}
          <g opacity={t}>
            <circle cx={INCIDENT[0]} cy={INCIDENT[1]} r={58} fill="none" stroke="var(--color-pen)" strokeWidth={1} opacity={0.25} />
            <circle cx={INCIDENT[0]} cy={INCIDENT[1]} r={34} fill="none" stroke="var(--color-pen)" strokeWidth={1} opacity={0.5} />
            <circle cx={INCIDENT[0]} cy={INCIDENT[1]} r={5} fill="var(--color-pen)" />
          </g>

          {/* the people. Identical in both framings — they never move. */}
          {PEOPLE.map(([x, y], i) => (
            <g key={i}>
              {/* gig framing: each one is in motion, going somewhere */}
              <path
                d={`M${x} ${y} l10 -6`}
                stroke="rgba(232,230,223,.5)"
                strokeWidth={1.2}
                opacity={gig}
              />
              <circle
                cx={x}
                cy={y}
                r={2.6}
                fill="rgba(232,230,223,.75)"
              />
              {/* emergency framing: the closest are simply already there */}
              {NEAREST.includes(i) && (
                <circle
                  cx={x}
                  cy={y}
                  r={8}
                  fill="none"
                  stroke="var(--color-pen)"
                  strokeWidth={1.2}
                  opacity={t}
                />
              )}
            </g>
          ))}

          <text
            x={14}
            y={VIEW.h - 12}
            fontSize={10}
            fontFamily="var(--font-mono)"
            fill="rgba(232,230,223,.45)"
          >
            {t > 0.5 ? "PEOPLE ALREADY CLOSE BY" : "PEOPLE OUT WORKING"}
          </text>
        </svg>

        {/* the window. Unitless, on purpose. */}
        <div className="px-4 pb-4" style={{ opacity: t }}>
          <div className="flex h-1.5 overflow-hidden rounded-full">
            <i className="block w-[14%] bg-paper/35" />
            <i className="block flex-1 bg-pen/70" />
            <i className="block w-[26%] bg-paper/35" />
          </div>
          <div className="mono mt-1.5 flex justify-between text-paper/45">
            <span>Something happens</span>
            <span className="text-pen-soft">nobody owns this part</span>
            <span>Qualified help</span>
          </div>
        </div>
      </div>

      {/* the control */}
      <label htmlFor={sliderId} className="mono mt-4 block text-ink-soft">
        Drag the question
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={100}
        value={t * 100}
        onChange={(e) => setT(Number(e.target.value) / 100)}
        className="mt-2 w-full cursor-grab accent-[var(--color-pen)] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pen"
      />
      <div className="mono mt-1 flex justify-between">
        <button
          type="button"
          onClick={() => setT(0)}
          className="cursor-pointer text-left text-ink-soft transition-colors duration-200 hover:text-pen focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pen"
        >
          Gig economy
        </button>
        <button
          type="button"
          onClick={() => setT(1)}
          className="cursor-pointer text-right text-ink-soft transition-colors duration-200 hover:text-pen focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pen"
        >
          First response
        </button>
      </div>

      {/* the two questions, crossfaded */}
      <div className="relative mt-4 min-h-[4.5em]">
        <p
          className="absolute inset-0 font-display text-[clamp(17px,1.7vw,21px)] leading-snug italic"
          style={{ opacity: gig }}
        >
          “How does work reach people, and how quickly can it get there?”
        </p>
        <p
          className="absolute inset-0 font-display text-[clamp(17px,1.7vw,21px)] leading-snug text-pen italic"
          style={{ opacity: t }}
        >
          “What happens in the minutes before qualified help arrives?”
        </p>
      </div>

      <p className="mt-1 font-body text-[14px] text-ink-soft">
        The network never moved. Only the question did.
      </p>
      <p
        className="mono mt-2 text-ink-soft transition-opacity duration-500"
        style={{ opacity: t }}
      >
        Not a replacement for ambulances or medical professionals
      </p>
    </DemoFrame>
  );
}
