import Link from 'next/link'
import ProgressBar from '@/components/ui/ProgressBar'
import PageTransition from '@/components/ui/PageTransition'

const factors = [
  { label: 'FIFA RANKING', pct: 45, color: 'var(--color-blue)' },
  { label: 'NATIONAL WEALTH (GDP)', pct: 20, color: 'var(--color-blue-light)' },
  { label: 'CLIMATE', pct: 15, color: 'var(--color-green-light)' },
  { label: 'POPULATION', pct: 15, color: 'var(--color-green)' },
  { label: 'HOME ADVANTAGE', pct: 5, color: 'var(--color-red-light)' },
]

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="section-title">ABOUT THE MODEL</h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
            Built by Joachim Klement of Panmure Liberum.<br />
            Based on the econometric framework originally designed by Hoffmann, Ging &amp; Ramasamy (2002).<br /><br />
            The model explains roughly 55% of the variance between team strengths.<br />
            The remaining 45% is noise — encoded in σ = 0.28.
          </p>

          <div className="about-formula" style={{ padding: 24 }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              color: 'var(--color-blue)', marginBottom: 16, letterSpacing: 2,
            }}>FORMULA</div>
            <div style={{ fontSize: 16, color: 'var(--text-primary)', lineHeight: 2, fontFamily: 'monospace', fontWeight: 600 }}>
              S = 0.45 · FIFA<br />
              &nbsp;&nbsp;&nbsp;+ 0.20 · GDP<br />
              &nbsp;&nbsp;&nbsp;+ 0.15 · TEMP<br />
              &nbsp;&nbsp;&nbsp;+ 0.15 · POP<br />
              &nbsp;&nbsp;&nbsp;+ 0.05 · HOST
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 16, lineHeight: 1.6, fontFamily: 'monospace' }}>
              P(WIN) = Φ((S_A − S_B) / 0.28) × (1 − DRAW)
            </div>
          </div>

          <h2 className="section-title" style={{ marginTop: 36 }}>FACTOR WEIGHTS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
            {factors.map(({ label, pct, color }) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 54px', alignItems: 'center', gap: 16 }} className="responsive-factor-row">
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.5 }}>{label}</div>
                <ProgressBar value={pct} color={color} />
                <div style={{ fontSize: 14, color, textAlign: 'right', fontWeight: 700 }}>{pct}%</div>
              </div>
            ))}
          </div>

          <div className="about-quote" style={{ padding: 24, marginBottom: 32 }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontStyle: 'italic',
              color: 'var(--color-green)',
              lineHeight: 1.5,
              margin: 0,
            }}>
              "I built this model to prove econometrics can't predict football. Then it did."
            </p>
            <p style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginTop: '12px',
              marginBottom: 0,
            }}>
              — Joachim Klement, Panmure Liberum
            </p>
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/versus" className="btn-primary">▶ Try the Predictor</Link>
            <Link href="/mc" className="btn-secondary">Run Simulations</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
