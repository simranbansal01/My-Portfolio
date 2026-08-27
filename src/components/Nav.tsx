import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const LINKS = [
  { label: 'About', hash: '#about' },
  { label: 'Work', hash: '#work' },
  { label: 'Experiments', hash: '/experiments' },
  { label: 'Contact', hash: '#contact' },
]

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[500] mix-blend-difference transition-transform duration-500 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="flex items-center justify-between px-5 py-5 text-white sm:px-8 sm:py-6">
          <Link to="/" className="font-display text-sm font-medium tracking-[0.2em] sm:text-base" onClick={() => setOpen(false)}>
            SIMRAN
          </Link>

          <ul className="hidden items-center gap-8 text-xs uppercase tracking-[0.15em] sm:flex">
            {LINKS.map((l) =>
              l.hash.startsWith('/') ? (
                <li key={l.label}>
                  <Link to={l.hash} className="group relative inline-block py-1">
                    <span>{l.label}</span>
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ) : (
                <li key={l.label}>
                  <a href={l.hash} onClick={goTo(l.hash)} className="group relative inline-block py-1">
                    <span>{l.label}</span>
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ),
            )}
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
              className="transition-all duration-500"
              style={{
                transitionDelay: open ? `${i * 60}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
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
