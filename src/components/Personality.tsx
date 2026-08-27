import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrganicPanel from './visuals/OrganicPanel'
import Sprig from './visuals/Sprig'
import type { Tone } from '../data/projects'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface Statement {
  text: string
  tone: Tone
  seed: number
  treatment: 'type' | 'panel' | 'sprig' | 'stamp'
  note?: string
}

const STATEMENTS: Statement[] = [
  {
    text: 'I like turning complicated things into simple things.',
    tone: 'forest',
    seed: 21,
    treatment: 'sprig',
    note: 'true since childhood LEGO instructions',
  },
  {
    text: 'I have an unhealthy curiosity about how products work.',
    tone: 'sky',
    seed: 23,
    treatment: 'panel',
    note: 'I will take apart the toaster',
  },
  {
    text: 'Finance taught me structure.',
    tone: 'charcoal',
    seed: 25,
    treatment: 'stamp',
    note: 'spreadsheets, but make it emotional',
  },
  {
    text: 'Startups taught me chaos.',
    tone: 'rust',
    seed: 27,
    treatment: 'panel',
    note: 'in a good way, mostly',
  },
  {
    text: 'AI taught me that everything is changing.',
    tone: 'sky',
    seed: 29,
    treatment: 'type',
    note: 'and that’s the interesting part',
  },
  {
    text: 'I collect ideas more than I collect things.',
    tone: 'sand',
    seed: 31,
    treatment: 'sprig',
    note: 'my notes app is a crime scene',
  },
]

export default function Personality() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const el = track.current!
        const distance = () => el.scrollWidth - window.innerWidth

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        })

        return () => tween.kill()
      })

      return () => mm.revert()
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrap} className="relative overflow-hidden bg-charcoal text-cream">
      <div
        ref={track}
        className="personality-track flex flex-col gap-16 px-5 py-24 md:h-screen md:w-max md:flex-row md:items-center md:gap-0 md:py-0"
      >
        <div className="flex shrink-0 flex-col justify-center px-2 md:h-full md:w-[36vw] md:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-cream/50">Things about me —</p>
          <p className="mt-4 font-display text-[11vw] italic leading-[0.9] sm:text-6xl md:text-7xl">
            A few true things.
          </p>
        </div>

        {STATEMENTS.map((s) => (
          <article
            key={s.text}
            className="relative flex shrink-0 flex-col justify-center gap-6 px-2 md:h-full md:w-[70vw] md:px-16 lg:w-[56vw]"
          >
            {s.treatment === 'panel' && (
              <OrganicPanel tone={s.tone} seed={s.seed} className="absolute -right-6 top-6 h-40 w-40 rounded-full opacity-80 sm:h-56 sm:w-56 md:right-10 md:top-10" />
            )}
            {s.treatment === 'sprig' && (
              <Sprig className="pointer-events-none absolute -right-2 top-0 h-48 w-24 text-moss/70 sm:h-64 sm:w-32 md:right-10" flip />
            )}
            {s.treatment === 'stamp' && (
              <span className="absolute right-2 top-2 -rotate-6 rounded-full border border-clay/60 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-clay sm:right-10 sm:top-10">
                approved by past me
              </span>
            )}

            <p className="relative max-w-xl font-display text-[9vw] leading-[1.05] sm:text-5xl md:text-6xl">
              {s.text}
            </p>
            {s.note && (
              <p className="relative max-w-sm text-sm italic text-cream/50 sm:text-base">— {s.note}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
