// Ambient background orbs - replaces the old pixel particle effect
export default function PixelParticles({ variant = 'mix' }: { variant?: string }) {
  const orbs = variant === 'green'
    ? [{ cls: 'orb-cyan', style: { width: 300, height: 300, top: -80, right: -60 } }]
    : variant === 'red'
    ? [{ cls: 'orb-coral', style: { width: 280, height: 280, top: -60, left: -40 } }]
    : variant === 'blue'
    ? [{ cls: 'orb-cyan', style: { width: 300, height: 300, bottom: -80, right: -60 } }]
    : [
        { cls: 'orb-gold', style: { width: 250, height: 250, top: -60, right: -40 } },
        { cls: 'orb-cyan', style: { width: 200, height: 200, bottom: -40, left: -30 } },
      ]

  return (
    <>
      {orbs.map((o, i) => (
        <div key={i} className={`orb ${o.cls}`} style={{ position: 'absolute', ...o.style }} />
      ))}
    </>
  )
}
