/**
 * The shell every inline demo sits in.
 *
 * The demos live on the story cards, so they are set in the page's own
 * language — paper, ink, red pen — rather than as another screenshot. A demo
 * is an argument the visitor can run, not a picture of one.
 */
export function DemoFrame({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 border-t-2 border-double border-ink/25 pt-4">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="mono text-pen">{label}</h4>
        {hint && <span className="mono text-ink-soft">{hint}</span>}
      </header>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/**
 * A pen-drawn control. Buttons inside the demos are hand-marked rather than
 * chrome-styled, so an interactive thing still looks like part of the page.
 */
export function DemoButton({
  children,
  onClick,
  pressed,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  pressed?: boolean;
  tone?: "ink" | "pen";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={[
        "mono cursor-pointer rounded-sm border px-3 py-1.5 transition-colors duration-200",
        pressed
          ? "border-pen bg-pen text-paper"
          : tone === "pen"
            ? "border-pen text-pen hover:bg-pen/10"
            : "border-rule text-ink-soft hover:border-pen hover:text-pen",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pen",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
