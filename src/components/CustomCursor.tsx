import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCursor } from '../lib/cursor'

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const { state } = useCursor()
  const quickX = useRef<gsap.QuickToFunc | null>(null)
  const quickY = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!ref.current) return
    quickX.current = gsap.quickTo(ref.current, 'x', { duration: 0.45, ease: 'power3.out' })
    quickY.current = gsap.quickTo(ref.current, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (e: MouseEvent) => {
      quickX.current?.(e.clientX)
      quickY.current?.(e.clientY)
    }

    let visible = false
    const show = () => {
      if (!visible && ref.current) {
        visible = true
        ref.current.classList.remove('is-hidden')
      }
    }
    const hide = () => {
      visible = false
      ref.current?.classList.add('is-hidden')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
    }
  }, [])

  const label = state.mode === 'project' ? 'View project →' : state.mode === 'image' ? 'Explore' : ''

  return (
    <div ref={ref} className={`cursor-dot is-hidden is-${state.mode}`} aria-hidden="true">
      {label}
    </div>
  )
}
