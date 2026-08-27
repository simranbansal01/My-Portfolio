type Tone = 'forest' | 'rust' | 'sky' | 'sand' | 'charcoal'

const TONES: Record<Tone, { a: string; b: string; c: string }> = {
  forest: { a: '#3c5443', b: '#2f4235', c: '#a9c19a' },
  rust: { a: '#c06a4d', b: '#a4402f', c: '#f0c9a0' },
  sky: { a: '#8fa6b3', b: '#5a7583', c: '#e6ecec' },
  sand: { a: '#d8c8a8', b: '#b9a179', c: '#f4efe4' },
  charcoal: { a: '#3a3a34', b: '#1b1c19', c: '#8f8a76' },
}

interface Props {
  tone?: Tone
  seed?: number
  className?: string
  children?: React.ReactNode
}

/**
 * Generative "photography" stand-in: layered gradients + an organic blob mask,
 * so every panel feels hand-placed rather than a stock photo grid.
 */
export default function OrganicPanel({ tone = 'forest', seed = 1, className = '', children }: Props) {
  const { a, b, c } = TONES[tone]
  const rot = (seed * 47) % 360
  const bx = 20 + ((seed * 31) % 60)
  const by = 20 + ((seed * 53) % 60)

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at ${bx}% ${by}%, ${c}55, transparent 60%), linear-gradient(${rot}deg, ${a}, ${b})`,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40 mix-blend-soft-light"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <filter id={`blur-${seed}`}>
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <circle
          cx={40 + ((seed * 17) % 120)}
          cy={30 + ((seed * 29) % 140)}
          r={60 + ((seed * 13) % 40)}
          fill={c}
          filter={`url(#blur-${seed})`}
        />
      </svg>
      <div className="noise-fill absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      {children}
    </div>
  )
}
