import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";
import { DemoButton, DemoFrame } from "./DemoFrame";

/**
 * FastLane's tangled-workflow trace.
 *
 * The same six handoffs are drawn twice: scattered, with the chasing loops the
 * story describes, and then in order with owner and next action attached.
 * "See the fix" moves one into the other, so the visitor watches the mess
 * resolve rather than reading that it did.
 *
 * The demo claims nothing about time or effort saved. It only shows that the
 * same steps become legible when status, ownership and the next action are
 * attached to them — which is what the concept proposes, not a result.
 */

const VIEW = { w: 520, h: 182 };

type Node = {
  id: string;
  label: string;
  /** Where it sits when nobody can say where the request is. */
  tangled: [number, number];
  /** Where it sits once the flow is ordered. */
  clean: [number, number];
  owner: string;
  next: string;
};

const NODES: Node[] = [
  { id: "request", label: "Request", tangled: [70, 36], clean: [45, 84], owner: "Requester", next: "Raise the request" },
  { id: "vendor", label: "Vendor", tangled: [392, 30], clean: [131, 84], owner: "Vendor", next: "Return the documents" },
  { id: "docs", label: "Documents", tangled: [178, 138], clean: [217, 84], owner: "Procurement", next: "Check what's missing" },
  { id: "risk", label: "Risk", tangled: [432, 120], clean: [303, 84], owner: "Risk", next: "Sign off or send back" },
  { id: "finance", label: "Finance", tangled: [252, 50], clean: [389, 84], owner: "Finance", next: "Set up payment terms" },
  { id: "done", label: "Approved", tangled: [96, 112], clean: [475, 84], owner: "—", next: "Nothing. It's done." },
];

/** The steps, in the order they are actually meant to happen. */
const CHAIN: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
];

/** The chasing. These exist only in the tangle and fade out with it. */
const CHASES: [number, number][] = [
  [2, 1],
  [3, 2],
  [4, 1],
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A bowed line between two points; `bow` 0 is straight. */
function curve(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  bow: number,
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // Control point pushed perpendicular to the segment.
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
}

export function WorkflowDemo() {
  const reduced = usePrefersReducedMotion();
  const [fixed, setFixed] = useState(false);
  const [t, setT] = useState(0);
  const raf = useRef(0);

  // One eased run between the two layouts, inside the site's 300–800ms band.
  useEffect(() => {
    const to = fixed ? 1 : 0;
    if (reduced) {
      setT(to);
      return;
    }
    const from = t;
    const start = performance.now();
    const DURATION = 700;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - k, 3);
      setT(from + (to - from) * eased);
      if (k < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // `t` is the starting point of each run, deliberately not a trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixed, reduced]);

  const at = (n: Node): [number, number] => [
    lerp(n.tangled[0], n.clean[0], t),
    lerp(n.tangled[1], n.clean[1], t),
  ];

  return (
    <DemoFrame
      label="Try it · follow one request"
      hint={fixed ? "Ordered" : "As it actually goes"}
    >
      <svg
        viewBox={`0 ${lerp(0, 44, t)} ${VIEW.w} ${lerp(VIEW.h, 104, t)}`}
        className="w-full"
        role="img"
        aria-label={
          fixed
            ? "The same six steps in order, each with an owner and a next action."
            : "Six steps scattered, with follow-up loops running back to earlier steps."
        }
      >
        {/* the chasing loops — only present in the tangle */}
        <g opacity={1 - t} stroke="var(--color-pen)" strokeWidth={1.4} fill="none" strokeDasharray="4 4">
          {CHASES.map(([a, b]) => (
            <path key={`${a}-${b}`} d={curve(at(NODES[a]), at(NODES[b]), lerp(34, 0, t))} />
          ))}
        </g>

        {/* the actual sequence */}
        <g stroke="var(--color-ink-soft)" strokeWidth={1.6} fill="none">
          {CHAIN.map(([a, b], i) => (
            <path
              key={`${a}-${b}`}
              d={curve(at(NODES[a]), at(NODES[b]), lerp(i % 2 ? 40 : -46, 0, t))}
            />
          ))}
        </g>

        {NODES.map((n, i) => {
          const [x, y] = at(n);
          return (
            <g key={n.id}>
              <circle
                cx={x}
                cy={y}
                r={13}
                fill="var(--color-paper)"
                stroke={i === 3 ? "var(--color-pen)" : "var(--color-ink-soft)"}
                strokeWidth={i === 3 ? 2 : 1.4}
              />
              <text
                x={x}
                y={y + 3.5}
                textAnchor="middle"
                fontSize={10}
                fill="var(--color-ink-soft)"
                fontFamily="var(--font-mono)"
              >
                {i + 1}
              </text>
              <text
                x={x}
                y={y + 30}
                textAnchor="middle"
                fontSize={10}
                fill="var(--color-ink)"
                fontFamily="var(--font-mono)"
                style={{ textTransform: "uppercase", letterSpacing: ".1em" }}
              >
                {n.label}
              </text>
              {/* Ownership only becomes visible once the flow is ordered. */}
              <text
                x={x}
                y={y + 44}
                textAnchor="middle"
                fontSize={9}
                fill="var(--color-pen)"
                fontFamily="var(--font-mono)"
                opacity={t}
              >
                {n.owner}
              </text>
              {/* Before that, nobody can say who has it. */}
              <text
                x={x + 16}
                y={y - 12}
                fontSize={13}
                fill="var(--color-pen)"
                fontFamily="var(--font-mono)"
                opacity={1 - t}
              >
                ?
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="font-body text-[15px] text-ink-soft italic">
          {fixed
            ? "Same six steps. Status, owner and the next action, in order."
            : "Six handoffs and three follow-up loops. Nobody can say where it is."}
        </p>
        <DemoButton tone="pen" onClick={() => setFixed((v) => !v)}>
          {fixed ? "Show the tangle" : "See the fix"}
        </DemoButton>
      </div>

      {fixed && (
        <p className="mt-2 border-l-2 border-pen pl-3 font-body text-[14px] text-ink-soft">
          Step 4 is where this one is sitting. It is with{" "}
          <span className="text-ink">{NODES[3].owner}</span>, and the next
          action is <span className="text-ink">{NODES[3].next.toLowerCase()}</span>.
        </p>
      )}
    </DemoFrame>
  );
}
