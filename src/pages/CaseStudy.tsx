import { useLayoutEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import OrganicPanel from '../components/visuals/OrganicPanel'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!project) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.case-section').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          },
        )
      })

      gsap.to('.case-hero-panel', {
        y: '14vh',
        ease: 'none',
        scrollTrigger: { trigger: '.case-hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, root)
    return () => ctx.revert()
  }, [project])

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-5 text-center">
        <p className="font-display text-4xl italic text-ink">That project wandered off.</p>
        <Link to="/#work" className="text-sm uppercase tracking-[0.2em] text-forest underline underline-offset-4">
          Back to work
        </Link>
      </main>
    )
  }

  const nextProject = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length]

  return (
    <main ref={root} className="bg-cream">
      <section className="case-hero relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <OrganicPanel
          tone={project.tone}
          seed={project.seed}
          className="case-hero-panel gpu absolute -right-1/3 top-0 h-full w-2/3 opacity-70 sm:-right-10 sm:w-1/2"
        />

        <Link
          to="/#work"
          className="relative mb-10 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/50 transition-colors hover:text-ink"
        >
          ← Back to work
        </Link>

        <p className="relative text-sm text-ink/50">{project.number} / 05</p>
        <h1 className="relative mt-2 max-w-4xl font-display text-[13vw] italic leading-[0.9] text-ink sm:text-7xl md:text-8xl">
          {project.name}
        </h1>
        <p className="relative mt-6 max-w-xl text-lg text-ink/70 sm:text-xl">{project.oneLiner}</p>

        <div className="relative mt-8 flex flex-wrap gap-x-10 gap-y-2 text-xs uppercase tracking-[0.2em] text-ink/50">
          <span>{project.role}</span>
          <span>{project.year}</span>
          <span>{project.tags.join(' · ')}</span>
        </div>
      </section>

      <section className="case-section border-t border-ink/10 px-5 py-20 sm:px-8 sm:py-28">
        <p className="max-w-2xl font-display text-2xl italic leading-snug text-ink/80 sm:text-3xl">
          {project.intro}
        </p>
      </section>

      {project.sections.map((s, i) => (
        <section key={s.index} className="case-section border-t border-ink/10 px-5 py-20 sm:px-8 sm:py-28">
          {s.layout === 'type-heavy' && (
            <div className="mx-auto max-w-3xl">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/40">
                {s.index} — {s.title}
              </p>
              <div className="mt-6 space-y-6">
                {s.body.map((p, j) => (
                  <p key={j} className="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {s.layout === 'image-heavy' && (
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink/40">
                {s.index} — {s.title}
              </p>
              <OrganicPanel
                tone={project.tone}
                seed={project.seed + i + 1}
                className="mt-6 h-[45vh] w-full rounded-sm sm:h-[60vh]"
              />
              <div className="mt-6 max-w-xl space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="text-base text-ink/70 sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {s.layout === 'split' && (
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-ink/40">
                  {s.index} — {s.title}
                </p>
                <div className="mt-6 space-y-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-base text-ink/70 sm:text-lg">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <OrganicPanel
                tone={project.tone}
                seed={project.seed + i + 20}
                className="h-72 w-full rounded-sm md:sticky md:top-24 md:h-[70vh]"
              />
            </div>
          )}
        </section>
      ))}

      <section className="case-section border-t border-ink/10 px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-xs uppercase tracking-[0.25em] text-ink/40">Next</p>
        <Link to={`/work/${nextProject.slug}`} className="group mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[10vw] italic leading-none text-ink transition-colors group-hover:text-forest sm:text-6xl">
            {nextProject.name}
          </h3>
          <span className="hidden text-sm uppercase tracking-[0.2em] text-ink/40 sm:block">
            {nextProject.number} →
          </span>
        </Link>
      </section>

      <Footer />
    </main>
  )
}
