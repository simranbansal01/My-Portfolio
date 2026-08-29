/**
 * "What I can do for you?" — the process poster, pinned to the board straight
 * below the polaroid.
 *
 * It is a finished poster in its own right, so it carries its own title and
 * frame; the section just gives it room and the same card shadow the paper
 * pieces have. Kept upright — it is text-heavy and a tilt would cost more in
 * readability than it buys in charm.
 */
export function Process() {
  return (
    <section
      aria-label="What I can do for you"
      className="relative z-10 px-4 pt-8 pb-20 lg:px-24"
    >
      <img
        src="/process-poster.jpg"
        width={800}
        height={1200}
        decoding="async"
        alt={
          "Simran Bansal — Product, Finance, AI. A hand-drawn process map titled " +
          "“What I can do for you?” running as a loop: 01 Problem Discovery, " +
          "02 Research & Insights, 03 Product Strategy & Prioritisation, " +
          "04 PRD & Product Execution, 05 Building & Iterating, " +
          "06 Product Impact & Metrics, 07 Process Improvement & Automation."
        }
        className="mx-auto block h-auto w-full max-w-[560px] rounded-[6px] shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]"
      />
    </section>
  );
}
