import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Sprig from './visuals/Sprig'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'Email', href: 'mailto:hello@simranbansal.co', display: 'hello@simranbansal.co' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/simranbansal', display: '@simranbansal' },
  { label: 'GitHub', href: 'https://github.com/simranbansal01', display: '@simranbansal01' },
  { label: 'Instagram', href: 'https://instagram.com/simranbansal', display: '@simranbansal' },
]

export default function Footer() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-line',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer id="contact" ref={root} className="relative overflow-hidden bg-forest px-5 pb-10 pt-28 text-cream sm:px-8 sm:pt-40">
      <Sprig className="pointer-events-none absolute -left-6 top-8 h-40 w-24 text-cream/15 sm:h-64 sm:w-32" />
      <Sprig className="pointer-events-none absolute -right-6 bottom-16 h-40 w-24 text-cream/15 sm:h-64 sm:w-32" flip />

      <p className="footer-line text-xs uppercase tracking-[0.3em] text-cream/50">Get in touch —</p>

      <h2 className="footer-line mt-6 max-w-4xl font-display text-[12vw] italic leading-[0.95] sm:text-7xl md:text-8xl">
        Let&rsquo;s make something interesting.
      </h2>

      <div className="footer-line mt-14 flex flex-wrap gap-x-12 gap-y-6 sm:mt-20">
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40">{l.label}</p>
            <p className="mt-1 text-lg text-cream underline-offset-4 transition-all group-hover:underline sm:text-xl">
              {l.display}
            </p>
          </a>
        ))}
      </div>

      <div className="footer-line mt-24 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/40 sm:mt-32 sm:flex-row sm:items-center">
        <p>You made it this far. That&rsquo;s commitment.</p>
        <p>© {new Date().getFullYear()} Simran Bansal — built by hand, one scroll at a time.</p>
      </div>
    </footer>
  )
}
