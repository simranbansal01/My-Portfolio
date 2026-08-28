import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { projects } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

type WorkProps = { reduced: boolean };

export function Work({ reduced }: WorkProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.93, opacity: 0, y: 48 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative bg-paper px-14 py-28 xl:pr-40">
      <div id="ch-work" className="mb-16 flex items-end justify-between border-b rule pb-6">
        <div>
          <p className="kicker text-ink-soft">04 — Selected work</p>
          <h2 className="mt-3 font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.03em]">
            Ledgers I have
            <span className="hand ml-4 text-red">put back together</span>
          </h2>
        </div>
        <p className="hidden max-w-[34ch] text-sm leading-relaxed text-ink-soft lg:block">
          Four engagements, one throughline: make the money story provable from the contract all the
          way down to the bank line.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {projects.map((project) => (
          <div key={project.id} id={`ch-${project.id}`} data-work-card className="will-change-transform">
            <article className="group relative origin-center border-2 border-ink bg-paper-deep transition-transform duration-[400ms] ease-out hover:scale-[1.03] card-edge">
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-10 border-b rule p-10">
                <span className="font-display text-6xl leading-none text-red">{project.index}</span>
                <div>
                  <h3 className="font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.02] tracking-[-0.02em]">
                    {project.title}
                  </h3>
                  <p className="kicker mt-3 text-ink-soft">
                    {project.role} · {project.period}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-4xl leading-none">{project.metric.value}</p>
                  <p className="kicker mt-2 text-ink-soft">{project.metric.label}</p>
                </div>
              </div>

              <div className="grid grid-cols-[1.1fr_1fr] gap-12 p-10">
                <div>
                  <p className="kicker mb-4 text-red">{project.category}</p>
                  <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-soft">
                    {project.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border rule px-3 py-1 text-[0.7rem] tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="flex flex-col gap-4 border-l rule pl-10">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Live link surfaces on hover, in step with the 400ms card lift. */}
              <div className="pointer-events-none absolute right-8 bottom-8 translate-y-2 opacity-0 transition-all duration-[400ms] ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                {project.link ? (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="kicker inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-paper"
                  >
                    Visit {project.link.label} ↗
                  </a>
                ) : (
                  <span className="kicker inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-ink">
                    Private engagement — ask for the write-up
                  </span>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
