'use client'
import ProgressBar from '@/components/ui/ProgressBar'

const factors = [
  { icon: '💰', label: 'Wealth (GDP)', desc: 'Richer nations build better football infrastructure', pct: 20, color: 'var(--color-blue)' },
  { icon: '👥', label: 'Population', desc: 'More players only matters where football is the religion', pct: 15, color: 'var(--color-blue-light)' },
  { icon: '🌡️', label: 'Climate', desc: 'The best football nations share a climate — around 14°C', pct: 15, color: 'var(--color-green-light)' },
  { icon: '📊', label: 'FIFA Ranking', desc: 'The most direct signal of current squad strength (45% weight)', pct: 45, color: 'var(--color-blue)' },
  { icon: '🏟️', label: 'Home Advantage', desc: 'Hosting helps — but less so when the tournament spans a continent', pct: 5, color: 'var(--color-red-light)' },
]

export default function HowItWorksSection() {
  return (
    <div className="sec fade-section" style={{ padding: '60px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          color: 'var(--color-blue)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '3px',
          marginBottom: '12px',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          HOW THE MODEL WORKS
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '32px',
          textAlign: 'center',
          color: 'var(--text-primary)',
          margin: '0 0 40px 0',
        }} className="fade-section fade-delay-1">
          Five factors. One number. One prediction.
        </h2>

        <div
          className="fade-section fade-delay-2"
          style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '32px' }}
        >
          {factors.map(({ icon, label, desc, pct, color }) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 180px 1fr 60px',
                gap: 16,
                alignItems: 'center',
              }}
              className="responsive-factor-row"
            >
              <div style={{ fontSize: 24, textAlign: 'center' }}>{icon}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{label}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, paddingRight: 12 }}>{desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
                <ProgressBar value={pct} color={color} height={6} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)' }}>{pct}% Weight</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          borderTop: '1px solid var(--border)',
          paddingTop: '20px',
          fontWeight: 500,
        }} className="fade-section fade-delay-3">
          Model explains 55% of variance between teams. The other 45% is luck — and it's built in.
        </div>
      </div>
    </div>
  )
}
