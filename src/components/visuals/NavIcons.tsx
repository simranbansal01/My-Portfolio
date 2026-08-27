import type { CSSProperties } from 'react'

interface IconProps {
  className?: string
  style?: CSSProperties
}

/** Small hand-drawn-feeling doodles that pop up above the nav on hover. */

export function AboutIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="13" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.4 18.6 L26.5 26.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 9.5 q2.4 -2.6 6 -1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

export function WorkIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M12.5 12 v-3 q0 -2.2 2.2 -2.2 h2.6 q2.2 0 2.2 2.2 v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="5.5" y="12" width="21" height="13.5" rx="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 18.2 h21" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <circle cx="16" cy="18.2" r="1.3" fill="currentColor" />
    </svg>
  )
}

export function ExperimentsIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M13.2 5.5 h5.6 M14.3 5.5 v6.8 l-6 11.6 q-1.1 2.1 1.2 2.1 h13 q2.3 0 1.2 -2.1 l-6 -11.6 v-6.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.4 19.5 q5.6 -2.2 11.2 0" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
      <circle cx="19.2" cy="23.5" r="1" fill="currentColor" />
      <circle cx="14.2" cy="25.3" r="0.8" fill="currentColor" />
    </svg>
  )
}

export function ContactIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M5 16.4 L26.8 6 L18 27 L13.8 17.8 L5 16.4 Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M13.8 17.8 L26.8 6" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
    </svg>
  )
}
