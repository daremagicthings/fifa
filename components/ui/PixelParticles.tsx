'use client'

type Variant = 'red' | 'green' | 'blue' | 'mix'

const COLORS = {
  red:   ['var(--color-r)', 'var(--color-r-sh)', 'var(--color-r-bg)'],
  green: ['var(--color-g)', 'var(--color-g-sh)', 'var(--color-g-mid)'],
  blue:  ['var(--color-b)', 'var(--color-b-sh)', 'var(--color-b-bg)'],
  mix:   ['var(--color-r)', 'var(--color-g)', 'var(--color-b)', 'var(--color-r-sh)', 'var(--color-g-sh)', 'var(--color-b-sh)'],
}

// Deterministic particle configs — no Math.random (SSR safe)
const PARTICLES = [
  { l: '4%',  d: '0s',    dur: '4.2s', s: 6 },
  { l: '11%', d: '0.8s',  dur: '5.5s', s: 4 },
  { l: '19%', d: '1.6s',  dur: '3.8s', s: 8 },
  { l: '27%', d: '0.4s',  dur: '4.8s', s: 4 },
  { l: '35%', d: '2.2s',  dur: '5.0s', s: 6 },
  { l: '44%', d: '1.0s',  dur: '3.5s', s: 4 },
  { l: '52%', d: '1.8s',  dur: '6.0s', s: 8 },
  { l: '60%', d: '0.6s',  dur: '4.2s', s: 4 },
  { l: '68%', d: '2.6s',  dur: '5.2s', s: 6 },
  { l: '76%', d: '1.4s',  dur: '3.8s', s: 4 },
  { l: '84%', d: '0.2s',  dur: '4.6s', s: 8 },
  { l: '91%', d: '2.0s',  dur: '5.8s', s: 4 },
]

interface Props {
  variant?: Variant
}

export default function PixelParticles({ variant = 'mix' }: Props) {
  const palette = COLORS[variant]
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="px-particle"
          style={{
            left: p.l,
            bottom: 0,
            width: p.s,
            height: p.s,
            backgroundColor: palette[i % palette.length],
            animationDelay: p.d,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  )
}
