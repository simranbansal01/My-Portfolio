import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrganicPanel from './visuals/OrganicPanel'
import type { Tone } from '../data/projects'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface Facet {
  word: string
  tone: Tone
  seed: number
  top: string
  left: string
  rotate: number
  size: string
}

const FACETS: Facet[] = [
  { word: 'Finance', tone: 'rust', seed: 2, top: '14%', left: '8%', rotate: -6, size: 'text-[9vw] sm:text-[5vw]' },
  { word: 'Product', tone: 'forest', seed: 4, top: '8%', left: '52%', rotate: 4, size: 'text-[11vw] sm:text-[6.5vw]' },
  { word: 'AI', tone: 'sky', seed: 6, top: '30%', left: '36%', rotate: -3, size: 'text-[13vw] sm:text-[8vw]' },
  { word: 'Design', tone: 'sand', seed: 8, top: '28%', left: '68%', rotate: 7, size: 'text-[8vw] sm:text-[4.5vw]' },
  { word: 'Business', tone: 'charcoal', seed: 10, top: '68%', left: '38%', rotate: 3, size: 'text-[8vw] sm:text-[4.5vw]' },
  { word: 'Photography', tone: 'sky', seed: 12, top: '58%', left: '62%', rotate: -5, size: 'text-[7vw] sm:text-[4vw]' },
  { word: 'Travel', tone: 'rust', seed: 14, top: '76%', left: '20%', rotate: 5, size: 'text-[9vw] sm:text-[5.5vw]' },
  { word: 'Curiosity', tone: 'forest', seed: 16, top: '78%', left: '58%', rotate: -4, size: 'text-[8vw] sm:text-[4.5vw]' },
  { word: 'Building things', tone: 'sand', seed: 18, top: '92%', left: '10%', rotate: 2, size: 'text-[6vw] sm:text-[3.5vw]' },
]

export default function About() {
  const track = useRef<HTMLDivElement>(null)
  const pinned = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const words = gsap.utils.toArray<HTMLElement>('.facet')
        gsap.set(words, { opacity: 0, scale: 0.4, y: 60 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: track.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            pin: pinned.current,
          },
        })

        words.forEach((el, i) => {
          tl.to(
            el,
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.4)' },
            i * 0.9,
          )
        })

        tl.to('.about-intro', { opacity: 0.15, scale: 0.9, ease: 'none' }, words.length * 0.9 * 0.6)

        return () => tl.kill()
      })

      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray<HTMLElement>('.facet').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            },
          )
        })
      })

      return () => mm.revert()
    }, track)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={track} className="relative md:h-[420vh]">
      <div
        ref={pinned}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-paper px-5 py-24 sm:px-8 md:h-screen md:py-0"
      >
        <p className="about-intro font-display text-[13vw] font-medium leading-none text-charcoal sm:text-[7vw] md:absolute md:left-8 md:top-1/2 md:z-10 md:-translate-y-1/2">
          I&rsquo;m
          <br />
          Simran.
        </p>

        <div className="relative mt-10 flex flex-col gap-6 md:mt-0 md:h-full md:gap-0">
          {FACETS.map((f) => (
            <div
              key={f.word}
              className="facet relative flex items-center gap-3 md:absolute md:gap-4"
              style={{
                top: f.top,
                left: f.left,
                transform: `rotate(${f.rotate}deg)`,
              }}
            >
              <OrganicPanel tone={f.tone} seed={f.seed} className="hidden h-10 w-10 shrink-0 rounded-full sm:block md:h-14 md:w-14" />
              <span className={`font-display italic leading-none text-ink ${f.size}`}>{f.word}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
