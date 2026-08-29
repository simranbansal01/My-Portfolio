/**
 * Preview tiles for the four product stories.
 *
 * Each is a captured preview of the project — a screenshot or a key render —
 * set inside the reference's framed-screenshot bezel with a window title bar,
 * so a scattered wall of them still reads as one set.
 *
 * The images live in `public/work/`. They are previews of the concept work,
 * not evidence of outcomes: nothing here is captioned with a user count,
 * adoption figure, revenue or result.
 */

/* ── the frame ────────────────────────────────────────────────────────── */

/**
 * The white bezel every tile sits in — the reference's framed-screenshot
 * look.
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

/** The window furniture across the top of every tile. */
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

/** One captured preview, filling the frame under the title bar. */
function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="block aspect-[16/9] w-full object-cover"
    />
  );
}

/* ── 01 · Corner Shelf ────────────────────────────────────────────────── */

export function CornerShelfMock() {
  return (
    <Screen>
      <TitleBar title="Corner Shelf" />
      <Shot
        src="/work/corner-shelf.jpg"
        alt="Corner Shelf — an explorable 3D bookshop that frames the AI-learning path, Module 1: Enter the AI Realm."
      />
    </Screen>
  );
}

/* ── 02 · FastLane ────────────────────────────────────────────────────── */

export function FastLaneMock() {
  return (
    <Screen>
      <TitleBar title="FastLane · vendor requests" />
      <Shot
        src="/work/fastlane.jpg"
        alt="FastLane — a vendor request page showing stage, owner and the next action at a glance, with a blocked review flagged."
      />
    </Screen>
  );
}

/* ── 03 · Paarth ──────────────────────────────────────────────────────── */

export function PaarthMock() {
  return (
    <Screen>
      <TitleBar title="Paarth · care plan" />
      <Shot
        src="/work/paarth.jpg"
        alt="Paarth — an elder-care marketplace landing screen: one place to search, compare and request care providers."
      />
    </Screen>
  );
}

/* ── 04 · Golden Hour ─────────────────────────────────────────────────── */

export function GoldenHourMock() {
  return (
    <Screen dark>
      <TitleBar title="The Golden Hour" dark />
      <Shot
        src="/work/golden-hour.jpg"
        alt="The Golden Hour — a nearby responder reaching someone and starting first aid before qualified emergency help arrives."
      />
    </Screen>
  );
}
