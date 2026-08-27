import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { AboutIcon, ContactIcon, ExperimentsIcon, WorkIcon } from './visuals/NavIcons'

const LINKS = [
  { label: 'About', hash: '#about', Icon: AboutIcon, tilt: -8 },
  { label: 'Work', hash: '#work', Icon: WorkIcon, tilt: 5 },
  { label: 'Experiments', hash: '/experiments', Icon: ExperimentsIcon, tilt: -6 },
  { label: 'Contact', hash: '#contact', Icon: ContactIcon, tilt: 7 },
]

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const pillRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const goingDown = y > lastY.current + 4
        const goingUp = y < lastY.current - 4
        if (y < 80) setHidden(false)
        else if (goingDown && !open) setHidden(true)
        else if (goingUp) setHidden(false)
        lastY.current = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (hash: string) => (e: React.MouseEvent) => {
    setOpen(false)
    if (hash.startsWith('/')) return
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/' + hash)
      return
    }
    const el = document.querySelector(hash)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const movePillTo = (index: number) => {
    const item = itemRefs.current[index]
    const list = listRef.current
    const pill = pillRef.current
    if (!item || !list || !pill) return

    const itemRect = item.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    const padX = 14
    const padY = 6

    gsap.to(pill, {
      x: itemRect.left - listRect.left - padX,
      y: itemRect.top - listRect.top - padY,
      width: itemRect.width + padX * 2,
      height: itemRect.height + padY * 2,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const hidePill = () => {
    gsap.to(pillRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[500] mix-blend-difference transition-transform duration-500 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-5 text-white sm:px-8 sm:py-8">
          <Link to="/" className="font-display text-sm font-medium tracking-[0.2em] sm:text-base" onClick={() => setOpen(false)}>
            SIMRAN
          </Link>

          <ul
            ref={listRef}
            onMouseLeave={hidePill}
            className="relative hidden items-center gap-8 text-xs uppercase tracking-[0.15em] sm:flex"
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 rounded-full border border-current opacity-0"
            />
            {LINKS.map((l, i) => (
              <li
                key={l.label}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className="group relative"
                onMouseEnter={() => movePillTo(i)}
              >
                <span className="pointer-events-none absolute left-1/2 -top-7 -translate-x-1/2 translate-y-1 scale-90 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                  <l.Icon className="h-6 w-6" style={{ transform: `rotate(${l.tilt}deg)` }} />
                </span>

                {l.hash.startsWith('/') ? (
                  <Link to={l.hash} className="relative z-10 inline-block px-3.5 py-1.5">
                    {l.label}
                  </Link>
                ) : (
                  <a href={l.hash} onClick={goTo(l.hash)} className="relative z-10 inline-block px-3.5 py-1.5">
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="text-xs uppercase tracking-[0.2em] sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[400] flex flex-col justify-center bg-charcoal px-8 text-cream transition-all duration-500 ease-out sm:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-4">
          {LINKS.map((l, i) => (
            <li
              key={l.label}
              className="flex items-center gap-4 transition-all duration-500"
              style={{
                transitionDelay: open ? `${i * 60}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <l.Icon className="h-6 w-6 text-cream/40" />
              {l.hash.startsWith('/') ? (
                <Link to={l.hash} onClick={() => setOpen(false)} className="font-display text-5xl italic">
                  {l.label}
                </Link>
              ) : (
                <a href={l.hash} onClick={goTo(l.hash)} className="font-display text-5xl italic">
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
