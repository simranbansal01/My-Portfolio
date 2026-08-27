import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiments } from '../data/projects'
import OrganicPanel from '../components/visuals/OrganicPanel'
import { useCursor } from '../lib/cursor'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Experiments() {
  const root = useRef<HTMLDivElement>(null)
  const { setCursor, resetCursor } = useCursor()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={root} className="bg-cream">
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
        <Link
          to="/#work"
          className="mb-10 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink/50 transition-colors hover:text-ink"
        >
          ← Back to work
        </Link>
        <p className="text-xs uppercase tracking-[0.3em] text-ink/40">05 — Experiments</p>
        <h1 className="mt-4 max-w-3xl font-display text-[13vw] italic leading-[0.9] text-ink sm:text-7xl md:text-8xl">
          Smaller things.
        </h1>
        <p className="mt-6 max-w-lg text-base text-ink/60 sm:text-lg">
          Not everything needs a full case study. Some ideas just need an afternoon and a bit of stubbornness.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-x-8 gap-y-16 border-t border-ink/10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2 lg:grid-cols-3">
        {experiments.map((exp) => (
          <article
            key={exp.slug}
            className="exp-card group cursor-pointer"
            onMouseEnter={() => setCursor('image')}
            onMouseLeave={resetCursor}
          >
            <OrganicPanel
              tone={exp.tone}
              seed={exp.seed}
              className="h-52 w-full overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[1.03] sm:h-64"
            />
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-display text-2xl italic text-ink">{exp.title}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/40">{exp.year}</span>
            </div>
            <p className="mt-2 text-sm text-ink/60">{exp.blurb}</p>
          </article>
        ))}
      </section>

      <Footer />
    </main>
  )
}
