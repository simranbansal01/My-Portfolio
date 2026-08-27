import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import OrganicPanel from './visuals/OrganicPanel'
import { useCursor } from '../lib/cursor'
import type { Project } from '../data/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectRow({ project, index }: Props) {
  const rowRef = useRef<HTMLAnchorElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const quickY = useRef<gsap.QuickToFunc | null>(null)
  const { setCursor, resetCursor } = useCursor()

  const handleMove = (e: React.MouseEvent) => {
    if (!rowRef.current || !imgRef.current) return
    if (!quickY.current) {
      quickY.current = gsap.quickTo(imgRef.current, 'y', { duration: 0.5, ease: 'power3.out' })
    }
    const bounds = rowRef.current.getBoundingClientRect()
    const relative = e.clientY - bounds.top - bounds.height / 2
    quickY.current(relative * 0.3)
  }

  const handleEnter = () => {
    gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
    gsap.to(`.row-${index}-name`, { x: 18, duration: 0.5, ease: 'power3.out' })
    setCursor('project')
  }

  const handleLeave = () => {
    gsap.to(imgRef.current, { opacity: 0, scale: 0.85, duration: 0.5, ease: 'power3.out' })
    gsap.to(`.row-${index}-name`, { x: 0, duration: 0.5, ease: 'power3.out' })
    resetCursor()
  }

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group relative block"
      ref={rowRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <div className="relative flex items-baseline justify-between border-t border-ink/15 py-8 sm:py-12">
        <div className="flex items-baseline gap-4 sm:gap-8">
          <span className="text-xs text-ink/40 sm:text-sm">{project.number}</span>
          <h3
            className={`row-${index}-name gpu font-display text-[9vw] italic leading-none text-ink transition-colors duration-300 group-hover:text-forest sm:text-6xl md:text-7xl`}
          >
            {project.name}
          </h3>
        </div>
        <div className="hidden max-w-[16rem] text-right sm:block">
          <p className="text-sm text-ink/60">{project.oneLiner}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/40">
            {project.role} — {project.year}
          </p>
        </div>
      </div>

      <p className="pb-6 text-sm text-ink/60 sm:hidden">{project.oneLiner}</p>

      <div
        ref={imgRef}
        className="pointer-events-none absolute right-4 top-1/2 z-10 hidden h-56 w-72 -translate-y-1/2 scale-[0.85] opacity-0 lg:block"
      >
        <OrganicPanel tone={project.tone} seed={project.seed} className="h-full w-full rounded-sm shadow-2xl">
          <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-cream/80">
            {project.tags[0]}
          </span>
        </OrganicPanel>
      </div>
    </Link>
  )
}
