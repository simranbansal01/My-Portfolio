/**
 * Concept mockups for the four product stories.
 *
 * None of these products shipped, so none of these are screenshots. They are
 * drawings of the interface each concept describes, built from the same copy
 * as the story cards: the learning loop, the vendor trail, the care plan, the
 * response gap.
 *
 * Because they look like product UI, they are held to the content guardrails
 * strictly. Nothing here states a result: no user counts, no adoption, no
 * revenue, no percentage improvements, no testimonials, no named people. Every
 * value on screen is interface scaffolding — a step in a path, a status, a day
 * of the week — never a claim about how the concept performed.
 */

/* ── the frame ────────────────────────────────────────────────────────── */

/**
 * The white bezel every mockup sits in — the reference's framed-screenshot
 * look. The frame is fixed-aspect so a scattered wall of them stays even.
 */
export function Screen({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[18px] bg-white p-1.5 shadow-[0_30px_60px_-24px_rgba(0,0,0,.85)]",
        className ?? "",
      ].join(" ")}
    >
      <div
        className={[
          "overflow-hidden rounded-[13px]",
          dark ? "bg-[#15171c] text-white/90" : "bg-[#f7f7f8] text-[#1b1d22]",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

/** The window furniture across the top of every mockup. */
function TitleBar({
  title,
  dark = false,
}: {
  title: string;
  dark?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-2 border-b px-3.5 py-2.5",
        dark ? "border-white/10 bg-white/[.03]" : "border-black/8 bg-white",
      ].join(" ")}
    >
      <span className="flex gap-1">
        <i className="block h-1.5 w-1.5 rounded-full bg-black/15" />
        <i className="block h-1.5 w-1.5 rounded-full bg-black/15" />
        <i className="block h-1.5 w-1.5 rounded-full bg-black/15" />
      </span>
      <span
        className={[
          "text-[10px] font-semibold tracking-[.12em] uppercase",
          dark ? "text-white/45" : "text-black/40",
        ].join(" ")}
      >
        {title}
      </span>
    </div>
  );
}

/** A neutral pill. Never carries a figure. */
function Chip({
  children,
  tone = "grey",
}: {
  children: React.ReactNode;
  tone?: "grey" | "green" | "amber" | "red" | "blue";
}) {
  const tones = {
    grey: "bg-black/6 text-black/55",
    green: "bg-[#e6f4ea] text-[#1e6b38]",
    amber: "bg-[#fdf1dc] text-[#8a5a13]",
    red: "bg-[#fce9e9] text-[#96262a]",
    blue: "bg-[#e8eefb] text-[#26479a]",
  } as const;
  return (
    <span
      className={[
        "inline-block rounded-full px-2 py-[3px] text-[9.5px] font-semibold whitespace-nowrap",
        tones[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/** A stand-in for a person. Deliberately faceless — no invented users. */
function Who({ initials }: { initials: string }) {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[8px] font-bold text-black/50">
      {initials}
    </span>
  );
}

/* ── 01 · Corner Shelf ────────────────────────────────────────────────── */

/**
 * The learning loop the story describes: a path, a practice task, a judgement
 * the learner has to make, and how sure they were before they saw the answer.
 */
export function CornerShelfMock() {
  return (
    <Screen>
      <TitleBar title="Corner Shelf" />
      <div className="space-y-3 p-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[.1em] text-black/40 uppercase">
            Your path
          </p>
          <div className="mt-1.5 flex items-center gap-1">
            {["Prompting", "Judging", "Editing", "Applying", "Teaching"].map(
              (step, i) => (
                <span key={step} className="flex flex-1 items-center gap-1">
                  <span
                    className={[
                      "h-1 flex-1 rounded-full",
                      i < 2
                        ? "bg-[#1b1d22]"
                        : i === 2
                          ? "bg-[#1b1d22]/40"
                          : "bg-black/10",
                    ].join(" ")}
                  />
                </span>
              ),
            )}
          </div>
          <p className="mt-1.5 text-[9px] text-black/45">
            You are on <span className="font-semibold text-black/70">Editing</span>
          </p>
        </div>

        <div className="rounded-md border border-black/8 bg-white p-2">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold">
              Practice · which output is better?
            </span>
            <Chip tone="blue">Task</Chip>
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {["A", "B"].map((k) => (
              <div
                key={k}
                className={[
                  "rounded border p-1.5",
                  k === "B"
                    ? "border-[#1b1d22]/60 bg-black/[.03]"
                    : "border-black/8",
                ].join(" ")}
              >
                <span className="text-[9px] font-bold text-black/45">{k}</span>
                <span className="mt-1 block space-y-[3px]">
                  <i className="block h-[3px] w-full rounded bg-black/10" />
                  <i className="block h-[3px] w-[85%] rounded bg-black/10" />
                  <i className="block h-[3px] w-[60%] rounded bg-black/10" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-black/8 bg-white p-2">
          <p className="text-[10px] font-semibold">
            How sure are you, before you see the answer?
          </p>
          <div className="mt-2 relative h-1 rounded-full bg-black/10">
            <i className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-[#1b1d22]" />
            <i className="absolute -top-[3px] left-[62%] h-[7px] w-[7px] -translate-x-1/2 rounded-full border-2 border-white bg-[#1b1d22]" />
          </div>
          <div className="mt-1 flex justify-between text-[8.5px] text-black/40">
            <span>Guessing</span>
            <span>Certain</span>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[.1em] text-black/40 uppercase">
            Shared library
          </p>
          <div className="mt-1 space-y-1">
            {["Attempt · open", "Attempt · challenged", "Attempt · agreed"].map(
              (row, i) => (
                <div
                  key={row}
                  className="flex items-center gap-1.5 rounded border border-black/8 bg-white px-1.5 py-1"
                >
                  <Who initials="—" />
                  <span className="flex-1 text-[9.5px] text-black/60">
                    {row}
                  </span>
                  <Chip tone={i === 1 ? "amber" : "grey"}>
                    {i === 1 ? "Open" : "Reviewed"}
                  </Chip>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ── 02 · FastLane ────────────────────────────────────────────────────── */

/**
 * The vendor trail. The whole point of the concept is that status, ownership
 * and the next action are visible without chasing, so those are the columns.
 */
export function FastLaneMock() {
  const rows = [
    { stage: "Intake", owner: "—", next: "Send doc request", tone: "grey" },
    { stage: "Documents", owner: "—", next: "Awaiting W-9", tone: "amber" },
    { stage: "Review", owner: "—", next: "Risk sign-off", tone: "blue" },
    { stage: "Approved", owner: "—", next: "Nothing — done", tone: "green" },
  ] as const;

  return (
    <Screen>
      <TitleBar title="FastLane · vendor requests" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold">Open requests</span>
          <span className="flex gap-1">
            <Chip tone="red">Blocked</Chip>
            <Chip>All</Chip>
          </span>
        </div>

        <div className="mt-2 overflow-hidden rounded-md border border-black/8 bg-white">
          <div className="grid grid-cols-[1.3fr_.9fr_.7fr_1.4fr] gap-2 border-b border-black/8 px-2.5 py-1.5 text-[8.5px] font-semibold tracking-[.08em] text-black/40 uppercase">
            <span>Vendor</span>
            <span>Stage</span>
            <span>Owner</span>
            <span>Next action</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.stage}
              className={[
                "grid grid-cols-[1.3fr_.9fr_.7fr_1.4fr] items-center gap-2 px-2.5 py-2",
                i < rows.length - 1 ? "border-b border-black/5" : "",
                i === 1 ? "bg-[#fdf9f0]" : "",
              ].join(" ")}
            >
              <span className="flex items-center gap-1">
                <i className="block h-2.5 w-2.5 rounded bg-black/10" />
                <i className="block h-[4px] w-10 rounded bg-black/15" />
              </span>
              <span>
                <Chip tone={r.tone}>{r.stage}</Chip>
              </span>
              <span>
                <Who initials={r.owner} />
              </span>
              <span className="text-[9.5px] text-black/60">{r.next}</span>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-md border border-black/8 bg-white p-2">
          <p className="text-[9.5px] font-semibold">
            Where this one is actually stuck
          </p>
          <div className="mt-1.5 flex items-center gap-1">
            {["Requested", "Sent", "Chased", "Chased", "Waiting"].map(
              (label, i) => (
                <span key={i} className="flex flex-1 flex-col items-center gap-1">
                  <i
                    className={[
                      "block h-1.5 w-1.5 rounded-full",
                      i === 4 ? "bg-[#c9822a]" : "bg-black/20",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-[8px]",
                      i === 4 ? "font-semibold text-[#8a5a13]" : "text-black/40",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ── 03 · Paarth ──────────────────────────────────────────────────────── */

/**
 * The care plan. The story's point is that a family is coordinating several
 * needs at once and judging who to trust, so the screen shows needs, a week,
 * and what a provider has been checked for.
 */
export function PaarthMock() {
  const needs = ["Mobility", "Meals", "Medication", "Company"];
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  const filled = [0, 2, 3, 5];

  return (
    <Screen>
      <TitleBar title="Paarth · care plan" />
      <div className="space-y-3 p-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[.1em] text-black/40 uppercase">
            What's needed
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {needs.map((n, i) => (
              <Chip key={n} tone={i === 0 ? "blue" : "grey"}>
                {n}
              </Chip>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-black/8 bg-white p-2">
          <p className="text-[10px] font-semibold">This week</p>
          <div className="mt-1.5 grid grid-cols-7 gap-1">
            {week.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[8.5px] text-black/40">{d}</span>
                <span
                  className={[
                    "block h-6 w-full rounded-sm",
                    filled.includes(i) ? "bg-[#1b1d22]/75" : "bg-black/8",
                  ].join(" ")}
                />
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-[8.5px] text-black/40">
            Filled slots are covered. The gaps are what the family is still
            arranging.
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[.1em] text-black/40 uppercase">
            Who could cover the gaps
          </p>
          <div className="mt-1 space-y-1">
            {["Mobility support", "Meal preparation", "Medication reminders"].map(
              (svc, i) => (
                <div
                  key={svc}
                  className="flex items-center gap-1.5 rounded border border-black/8 bg-white px-1.5 py-1"
                >
                  <i className="block h-4 w-4 rounded-full bg-black/10" />
                  <span className="flex-1 text-[9.5px] text-black/65">
                    {svc}
                  </span>
                  <Chip tone={i === 0 ? "green" : "grey"}>
                    {i === 0 ? "ID checked" : "References"}
                  </Chip>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ── 04 · Golden Hour ─────────────────────────────────────────────────── */

/**
 * The response gap. The timeline is deliberately unitless — the story does not
 * claim how long the window is or how much it could be shortened, only that
 * the window exists and nobody owns it.
 */
export function GoldenHourMock() {
  return (
    <Screen dark>
      <TitleBar title="The Golden Hour" dark />
      <div className="space-y-3 p-4">
        <div className="relative h-24 overflow-hidden rounded-md border border-white/10 bg-[#0f1116]">
          {/* street grid */}
          <svg
            viewBox="0 0 200 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <g stroke="rgba(255,255,255,.07)" strokeWidth="1">
              {[20, 55, 90, 125, 160].map((x) => (
                <line key={x} x1={x} y1="0" x2={x - 14} y2="100" />
              ))}
              {[22, 48, 74].map((y) => (
                <line key={y} x1="0" y1={y} x2="200" y2={y - 8} />
              ))}
            </g>
          </svg>

          {/* people already nearby */}
          {[
            [38, 30],
            [72, 62],
            [118, 24],
            [96, 44],
            [148, 66],
            [58, 78],
          ].map(([x, y], i) => (
            <i
              key={i}
              className="absolute block h-1 w-1 rounded-full bg-white/45"
              style={{ left: `${x / 2}%`, top: `${y}%` }}
            />
          ))}

          {/* the incident */}
          <span
            className="absolute block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e0384a]"
            style={{ left: "46%", top: "48%" }}
          />
          <span
            className="absolute block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e0384a]/50"
            style={{ left: "46%", top: "48%" }}
          />
          <span
            className="absolute block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e0384a]/20"
            style={{ left: "46%", top: "48%" }}
          />

          <span className="absolute bottom-1.5 left-2 text-[8.5px] text-white/45">
            Dots are people already close by.
          </span>
        </div>

        <div className="rounded-md border border-white/10 bg-white/[.03] p-2">
          <p className="text-[10px] font-semibold text-white/80">
            The first-response window
          </p>
          <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
            <i className="block w-[14%] bg-white/35" />
            <i className="block flex-1 bg-[#e0384a]/70" />
            <i className="block w-[26%] bg-white/35" />
          </div>
          <div className="mt-1.5 flex justify-between text-[8.5px]">
            <span className="text-white/45">Something happens</span>
            <span className="font-semibold text-[#f08a95]">
              nobody owns this part
            </span>
            <span className="text-white/45">Qualified help</span>
          </div>
          <p className="mt-2 text-[8.5px] text-white/35">
            Not a replacement for ambulances or medical professionals.
          </p>
        </div>
      </div>
    </Screen>
  );
}
