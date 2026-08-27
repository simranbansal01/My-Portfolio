interface Props {
  className?: string
  flip?: boolean
}

/** A small hand-drawn-feeling branch, used as a recurring motif. */
export default function Sprig({ className = '', flip = false }: Props) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path
        d="M60 198 C 58 150, 66 120, 54 80 C 46 55, 62 30, 58 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M58 60 C 40 50, 28 55, 18 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M56 95 C 76 88, 86 92, 98 78" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M55 130 C 38 126, 30 133, 16 124" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="16" cy="122" rx="9" ry="4.5" fill="currentColor" opacity="0.7" transform="rotate(-24 16 122)" />
      <ellipse cx="99" cy="76" rx="9" ry="4.5" fill="currentColor" opacity="0.7" transform="rotate(18 99 76)" />
      <ellipse cx="16" cy="38" rx="8" ry="4" fill="currentColor" opacity="0.7" transform="rotate(-30 16 38)" />
      <circle cx="58" cy="4" r="3.5" fill="currentColor" opacity="0.85" />
    </svg>
  )
}
