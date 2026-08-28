import { useState } from "react";
import { DemoButton, DemoFrame } from "./DemoFrame";

/**
 * Corner Shelf's verdict demo.
 *
 * The concept's whole argument is that using AI often is not the same as being
 * able to judge what it gives back, so the demo makes the visitor do exactly
 * that: pick the better output, say how sure they are *before* the answer, and
 * then get a reading on both.
 *
 * What the demo asserts is bounded on purpose. It says which of two sample
 * outputs is stronger and why — a claim about two paragraphs written for this
 * page, not about anyone's learning. It reports nothing about outcomes,
 * improvement or how well anyone does, because there is no such finding to
 * report.
 */

const TASK =
  "Summarise this customer complaint for the ops team, who have to act on it today.";

const OPTIONS = [
  {
    key: "A",
    text: "The customer is unhappy about their recent order and has been in touch with support more than once. They would like the issue resolved as soon as possible.",
  },
  {
    key: "B",
    text: "Order arrived damaged. Customer has contacted support twice with no reply. Ops: reship today and open the courier claim.",
  },
] as const;

const STRONGER = "B";

const WHY =
  "B says what happened, what is still unresolved, and what ops should do next. A reads fluently and leaves the reader with nothing to act on.";

const CONFIDENCE = [
  { key: "guess", label: "Guessing" },
  { key: "fairly", label: "Fairly sure" },
  { key: "certain", label: "Certain" },
] as const;

type Confidence = (typeof CONFIDENCE)[number]["key"];

/**
 * The reading given back. Each line is about this one judgement and how sure
 * the visitor was — never a claim that the product improves anything.
 */
function reading(correct: boolean, confidence: Confidence): string {
  if (correct && confidence === "certain")
    return "Right, and you knew it. That is the state worth building towards.";
  if (correct && confidence === "fairly")
    return "Right, and roughly as sure as you should have been.";
  if (correct)
    return "Right — but you were guessing. Being right without knowing why is the gap this concept is about.";
  if (confidence === "certain")
    return "Not this one, and you were certain. That gap between sure and right is the most useful thing to catch early.";
  if (confidence === "fairly")
    return "Not this one. Worth reading both again and asking what B does that A doesn't.";
  return "Not this one — though you knew you were unsure, which is its own kind of accurate.";
}

export function VerdictDemo() {
  const [pick, setPick] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [settled, setSettled] = useState(false);

  const correct = pick === STRONGER;

  const reset = () => {
    setPick(null);
    setConfidence(null);
    setSettled(false);
  };

  return (
    <DemoFrame label="Try it · judge the output" hint="Sample task">
      <p className="font-body text-[15px] text-ink-soft italic">{TASK}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {OPTIONS.map((o) => {
          const chosen = pick === o.key;
          // Once settled, the stronger option is marked whatever was picked.
          const marked = settled && o.key === STRONGER;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={chosen}
              disabled={settled}
              onClick={() => !settled && setPick(o.key)}
              className={[
                "rounded-sm border p-3 text-left transition-colors duration-200",
                marked
                  ? "border-pen bg-pen/[.06]"
                  : chosen
                    ? "border-ink"
                    : "border-rule",
                settled ? "cursor-default" : "cursor-pointer hover:border-pen",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pen",
              ].join(" ")}
            >
              <span className="mono flex items-center gap-2 text-ink-soft">
                {o.key}
                {marked && <span className="text-pen">· stronger</span>}
              </span>
              <span className="mt-1.5 block font-body text-[14px] leading-[1.5] text-ink">
                {o.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Confidence is asked before the answer, which is the entire point. */}
      {pick && !settled && (
        <div className="mt-4">
          <p className="font-body text-[15px]">
            How sure are you — before you see the answer?
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {CONFIDENCE.map((c) => (
              <DemoButton
                key={c.key}
                pressed={confidence === c.key}
                onClick={() => setConfidence(c.key)}
              >
                {c.label}
              </DemoButton>
            ))}
          </div>
          <DemoButton
            tone="pen"
            className="mt-3"
            onClick={() => confidence && setSettled(true)}
          >
            {confidence ? "See the verdict" : "Pick how sure first"}
          </DemoButton>
        </div>
      )}

      {settled && confidence && (
        <div className="mt-4 border-l-2 border-pen pl-3">
          <p className="hand text-[24px] text-pen">
            {reading(correct, confidence)}
          </p>
          <p className="mt-2 font-body text-[14px] text-ink-soft">{WHY}</p>
          <DemoButton className="mt-3" onClick={reset}>
            Try again
          </DemoButton>
        </div>
      )}
    </DemoFrame>
  );
}
