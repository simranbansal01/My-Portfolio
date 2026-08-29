import { Filters } from "../art/Filters";
import { Underline } from "../art/Marks";
import { MOCKUP_BY_NO } from "../art/mockupIndex";
import {
  identity,
  isPlaceholderHref,
  livePreviewHref,
  stories,
  type Story,
} from "../data/portfolio";
import { useIsMobileLayout } from "../lib/hooks";
import { Link } from "../components/Link";
import { LivePreview } from "../components/LivePreview";
import { useDocumentTitle } from "../lib/router";
import { PivotDemo } from "../desk/demos/PivotDemo";
import { VerdictDemo } from "../desk/demos/VerdictDemo";
import { WorkflowDemo } from "../desk/demos/WorkflowDemo";

/**
 * One story, on its own page.
 *
 * The desk shows the four concepts as objects; opening one gives it a page of
 * its own — a single sheet of paper laid on the same board, with the story,
 * its interaction and its links. Nothing is pinned or tilted here: three of
 * these pages carry a control the visitor is meant to use, and the reading is
 * the point.
 */

const DEMOS = {
  verdict: VerdictDemo,
  workflow: WorkflowDemo,
  pivot: PivotDemo,
} as const;

export function ProjectPage({ story }: { story: Story }) {
  const isMobile = useIsMobileLayout();
  const Mock = MOCKUP_BY_NO[story.no];
  const Demo = story.demo ? DEMOS[story.demo] : null;
  const preview = livePreviewHref(story);

  useDocumentTitle(`${story.title} — ${identity.name}`);

  const index = stories.findIndex((s) => s.slug === story.slug);
  const prev = stories[(index - 1 + stories.length) % stories.length];
  const next = stories[(index + 1) % stories.length];

  return (
    <div className="board grain relative min-h-screen overflow-clip">
      <Filters />

      <div className="mx-auto w-full max-w-[1040px] px-4 pb-20 lg:px-10">
        {/* the way back */}
        <nav className="py-7">
          <Link
            to="/"
            className="hand text-[24px] text-paper transition-colors duration-300 hover:text-pen focus-visible:text-pen focus-visible:outline-none"
          >
            ← back to the desk
          </Link>
        </nav>

        <article className="paper-plain rounded-[14px] p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.85)] sm:p-10 lg:p-14">
          <header>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <span
                className="font-display text-[clamp(52px,7vw,88px)] leading-none font-extrabold text-transparent"
                style={{ WebkitTextStroke: "1px var(--color-rule)" }}
              >
                {story.no}
              </span>
              <span className="mono max-w-[54%] pt-4 text-right text-ink-soft">
                {story.category}
              </span>
            </div>

            <h1 className="mt-2 font-display text-[clamp(30px,4.6vw,58px)] leading-[1.02] font-bold tracking-[-0.02em]">
              {story.title}
            </h1>
            <div className="mt-1 max-w-[320px] text-pen">
              <Underline />
            </div>

            <p className="mt-5 max-w-[60ch] font-body text-[clamp(18px,1.8vw,21px)] text-ink-soft italic">
              {story.teaser}
            </p>
          </header>

          {/* The deployed thing where there is one; the drawing where there
              isn't. Nothing here is captioned as more than it is. */}
          {preview ? (
            <figure className="mt-9">
              <LivePreview
                url={preview}
                title={story.title}
                designWidth={isMobile ? 430 : 1280}
                designHeight={isMobile ? 760 : 800}
              />
              <figcaption className="mono mt-3 text-center text-ink-soft">
                The deployed product, running here ·{" "}
                <a
                  href={preview}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-b border-pen text-pen"
                >
                  open it in a tab
                </a>{" "}
                if it doesn't load
              </figcaption>
            </figure>
          ) : (
            Mock && (
              <figure className="mt-9">
                <div className="mx-auto max-w-[520px]">
                  <Mock />
                </div>
                <figcaption className="mono mt-3 text-center text-ink-soft">
                  A drawing of the interface, not a screenshot
                </figcaption>
              </figure>
            )
          )}

          <dl className="mt-10">
            <Beat term="I noticed" value={story.noticed} />
            <Beat term="I questioned" value={story.questioned} />
            <Beat term="I built" value={story.built} />
          </dl>

          {/* The credit line is part of the story, not a footnote to it. */}
          {story.ownership && (
            <p className="mt-5 border-l-2 border-pen pl-4 font-body text-[16px] text-ink-soft">
              {story.ownership}
            </p>
          )}

          {Demo && <Demo />}

          {story.productThinking && (
            <section className="mt-7 border-t border-rule pt-5">
              <h2 className="mono text-pen">Thinking to keep hold of</h2>
              <ul className="mt-3 space-y-2">
                {story.productThinking.map((line) => (
                  <li
                    key={line}
                    className="font-body text-[16px] text-ink-soft before:mr-2 before:text-pen before:content-['—']"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <StoryLinks story={story} />
        </article>

        {/* the rest of the shelf */}
        <nav
          aria-label="Other projects"
          className={[
            "mt-10 flex gap-4",
            isMobile ? "flex-col" : "justify-between",
          ].join(" ")}
        >
          <ProjectStep story={prev} direction="prev" />
          <ProjectStep story={next} direction="next" />
        </nav>
      </div>
    </div>
  );
}

/** One line of the I NOTICED → I QUESTIONED → I BUILT spine. */
function Beat({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-start gap-5 border-t border-rule py-4 max-sm:grid-cols-1 max-sm:gap-1">
      <dt className="mono pt-1.5 text-pen">{term}</dt>
      <dd className="max-w-[66ch] font-body text-[17px] leading-[1.6]">
        {value}
      </dd>
    </div>
  );
}

/**
 * The link row. A destination that exists is a link; one that does not is
 * plain text, so nothing on the page pretends to go somewhere it can't.
 */
function StoryLinks({ story }: { story: Story }) {
  return (
    <ul className="mono mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule pt-5">
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
              className="border-b border-pen pb-0.5 text-pen transition-colors duration-200 hover:border-ink hover:text-ink"
            >
              {link.label} ↗
            </a>
          </li>
        ),
      )}
    </ul>
  );
}

function ProjectStep({
  story,
  direction,
}: {
  story: Story;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      to={`/work/${story.slug}`}
      className={[
        "group block max-w-[46%] max-sm:max-w-none",
        isNext ? "text-right" : "text-left",
      ].join(" ")}
    >
      <span className="mono block text-paper/45">
        {isNext ? "Next" : "Previous"}
      </span>
      <span className="mt-1 block font-display text-[clamp(18px,2vw,26px)] leading-tight font-bold text-paper transition-colors duration-300 group-hover:text-pen">
        {isNext ? `${story.title} →` : `← ${story.title}`}
      </span>
    </Link>
  );
}

/** When a URL names a project that isn't there. */
export function NotFoundPage() {
  useDocumentTitle(`Not found — ${identity.name}`);
  return (
    <div className="board grain flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="hand text-[42px] text-pen">Nothing filed under that.</p>
        <p className="mono mt-3 text-paper/50">
          The page you asked for isn't on the desk
        </p>
        <Link
          to="/"
          className="hand mt-6 inline-block text-[24px] text-paper underline decoration-pen underline-offset-4 transition-colors duration-300 hover:text-pen"
        >
          ← back to the desk
        </Link>
      </div>
    </div>
  );
}
