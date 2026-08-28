import { isPlaceholderHref, stories, type Story } from "../data/portfolio";
import { Underline } from "../art/Marks";
import { PivotDemo } from "./demos/PivotDemo";
import { VerdictDemo } from "./demos/VerdictDemo";
import { WorkflowDemo } from "./demos/WorkflowDemo";

/**
 * The four stories, at reading size.
 *
 * These deliberately sit in normal document flow rather than on the mat. Three
 * of them carry an interaction, and an interaction on a pinned plane that is
 * tilting and travelling under the cursor is a thing to fight rather than use.
 * The mat keeps its perspective for the work that is still unfinished; the
 * work you are meant to sit with holds still.
 */
export function CaseFiles() {
  return (
    <section id="work" className="relative z-10 px-4 py-16 lg:px-20">
      <header className="mx-auto flex max-w-[940px] flex-wrap items-baseline justify-between gap-3 border-b border-paper/25 pb-3">
        <h2 className="font-display text-[clamp(22px,3vw,38px)] font-bold text-paper">
          Things I noticed. Directions I took.
        </h2>
        <span className="mono text-paper/50">Selected product stories · 04</span>
      </header>

      <div className="mt-12 flex flex-col gap-14">
        {stories.map((story, i) => (
          <CaseFile key={story.no} story={story} tilt={[-0.5, 0.4, -0.35, 0.45][i]} />
        ))}
      </div>
    </section>
  );
}

const DEMOS = {
  verdict: VerdictDemo,
  workflow: WorkflowDemo,
  pivot: PivotDemo,
} as const;

export function CaseFile({ story, tilt = 0 }: { story: Story; tilt?: number }) {
  const Demo = story.demo ? DEMOS[story.demo] : null;

  return (
    <article
      className="paper-plain mx-auto w-full max-w-[940px] rounded-[10px] p-7 text-ink shadow-[0_28px_70px_-28px_rgba(0,0,0,.85)] sm:p-10"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="flex items-start justify-between gap-6">
        <span
          className="font-display text-[58px] leading-none font-extrabold text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-rule)" }}
        >
          {story.no}
        </span>
        <span className="mono max-w-[52%] pt-4 text-right text-ink-soft">
          {story.category}
        </span>
      </div>

      <h3 className="mt-1 font-display text-[clamp(24px,3vw,38px)] leading-[1.04] font-bold tracking-[-0.014em]">
        {story.title}
      </h3>
      <div className="mt-1 max-w-[260px] text-pen">
        <Underline />
      </div>

      <p className="mt-4 max-w-[62ch] font-body text-[18px] text-ink-soft italic">
        {story.teaser}
      </p>

      <dl className="mt-6">
        <Beat term="I noticed" value={story.noticed} />
        <Beat term="I questioned" value={story.questioned} />
        <Beat term="I built" value={story.built} />
      </dl>

      {/* The credit line is part of the story, not a footnote to it. */}
      {story.ownership && (
        <p className="mt-4 border-l-2 border-pen pl-3 font-body text-[15px] text-ink-soft">
          {story.ownership}
        </p>
      )}

      {Demo && <Demo />}

      {story.productThinking && (
        <section className="mt-5 border-t border-rule pt-4">
          <h4 className="mono text-pen">Thinking to keep hold of</h4>
          <ul className="mt-2 space-y-1.5">
            {story.productThinking.map((line) => (
              <li
                key={line}
                className="font-body text-[15px] text-ink-soft before:mr-2 before:text-pen before:content-['—']"
              >
                {line}
              </li>
            ))}
          </ul>
        </section>
      )}

      <StoryLinks story={story} />
    </article>
  );
}

/** One line of the I NOTICED → I QUESTIONED → I BUILT spine. */
export function Beat({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-start gap-4 border-t border-rule py-3 max-sm:grid-cols-1 max-sm:gap-1">
      <dt className="mono pt-1 text-pen">{term}</dt>
      <dd className="max-w-[64ch] font-body text-[16px] leading-[1.55]">
        {value}
      </dd>
    </div>
  );
}

/**
 * The link row. A destination that exists is a link; one that does not is
 * plain text, so nothing on the page pretends to go somewhere it can't.
 */
export function StoryLinks({ story }: { story: Story }) {
  return (
    <ul className="mono mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4">
      {story.links.map((link) =>
        isPlaceholderHref(link.href) ? (
          <li
            key={link.label}
            className="border-b border-dashed border-rule pb-0.5 text-ink-soft/70"
          >
            {link.label}
          </li>
        ) : (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="border-b border-pen pb-0.5 text-pen transition-colors duration-200 hover:text-ink hover:border-ink"
            >
              {link.label} ↗
            </a>
          </li>
        ),
      )}
    </ul>
  );
}
