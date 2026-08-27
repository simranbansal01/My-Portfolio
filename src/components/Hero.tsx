import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrganicPanel from './visuals/OrganicPanel'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      tl.to('.hero-simran', { x: '-8vw', y: '-6vh', ease: 'none' }, 0)
        .to('.hero-bansal', { x: '10vw', y: '4vh', ease: 'none' }, 0)
        .to('.hero-tagline', { x: '-4vw', ease: 'none' }, 0)
        .to('.hero-vertical', { y: '-14vh', ease: 'none' }, 0)
        .to('.hero-panel', { y: '18vh', scale: 1.08, ease: 'none' }, 0)
        .to('.hero-scroll-cue', { opacity: 0, ease: 'none' }, 0)

      gsap.to('.hero-float', {
        y: -18,
        duration: 3.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-cream">
      <OrganicPanel
        tone="sand"
        seed={1}
        className="hero-panel gpu absolute -right-1/4 top-0 h-[75%] w-3/4 opacity-70 sm:-right-10 sm:w-1/2"
      />

      <div className="hero-vertical gpu absolute right-4 top-24 hidden text-[10px] uppercase tracking-[0.3em] text-charcoal/60 sm:right-8 sm:top-32 md:block">
        <span className="vertical-text">Product — AI — Finance — Curious Human</span>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-5 sm:px-8">
        <p className="hero-float mb-3 max-w-xs text-xs uppercase tracking-[0.3em] text-forest/80 sm:mb-6">
          Personal archive — est. now
        </p>

        <h1 className="pointer-events-none select-none font-display leading-[0.82]">
          <span className="hero-simran gpu block text-[18vw] font-medium tracking-tight text-charcoal sm:text-[15vw] lg:text-[13vw]">
            Simran
          </span>
          <span className="hero-bansal gpu ml-[6vw] block text-[18vw] font-medium italic tracking-tight text-forest sm:ml-[10vw] sm:text-[15vw] lg:ml-[14vw] lg:text-[13vw]">
            Bansal
          </span>
        </h1>

        <p className="hero-tagline gpu mt-8 max-w-md text-balance text-lg text-ink/80 sm:mt-10 sm:max-w-lg sm:text-2xl">
          I turn messy problems into things that make sense.
        </p>
      </div>

      <div className="hero-scroll-cue relative flex items-center gap-3 px-5 pb-8 text-[11px] uppercase tracking-[0.25em] text-ink/50 sm:px-8 sm:pb-10">
        <span className="hero-float inline-block h-8 w-px bg-ink/30" />
        Scroll — keep going
      </div>
    </section>
  )
}
