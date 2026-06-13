'use client'
import Link from 'next/link'
import FlagImg from '@/components/ui/FlagImg'
import PolymarketBtn from '@/components/ui/PolymarketBtn'

export default function KlementCallSection() {
  return (
    <div className="sec" style={{ padding: '60px 24px' }}>
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
          THE 2026 PREDICTION
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '32px',
          textAlign: 'center',
          color: 'var(--text-primary)',
          margin: '0 0 32px 0',
        }}>
          The model says: Netherlands.
        </h2>

        {/* Prediction Banner Card */}
        <div className="pred-banner" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* Flag Display */}
            <div style={{
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(26, 95, 232, 0.1)',
              lineHeight: 0,
            }}>
              <FlagImg name="Netherlands" h={70} emoji="🇳🇱" />
            </div>

            <div className="hl" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 600 }}>
              Netherlands
            </div>

            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 550,
              margin: '0 auto',
              textAlign: 'center',
            }}>
              For the first time in their history, the Netherlands are projected to lift the trophy.<br />
              <strong>Path:</strong> Morocco → Canada → France → Argentina → Portugal (in the final)
            </p>

            <div style={{ marginTop: 8 }}>
              <PolymarketBtn teamName="Netherlands" variant="champion" />
            </div>
          </div>
        </div>

        {/* Upset Callout Box */}
        <div style={{
          backgroundColor: 'var(--color-red-soft)',
          border: '1px solid rgba(232, 36, 24, 0.15)',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 32,
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 24, lineHeight: 1 }}>⚡</span>
          <div>
            <h4 style={{ fontWeight: 700, color: 'var(--color-red)', margin: '0 0 4px 0', fontSize: 14 }}>
              BIGGEST PREDICTED UPSET
            </h4>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Japan defeat Brazil in the Round of 32 — one of the most shocking results in World Cup history, according to the model.
            </p>
          </div>
        </div>

        {/* Disclaimer & Monte Carlo Link */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
            This is a probabilistic forecast, not a guarantee. With 45% randomness built in,
            every simulation can produce a different winner. Try the Monte Carlo simulator to see the full distribution.
          </p>
          <Link href="/mc" className="btn-secondary" style={{ fontSize: 13, padding: '10px 20px' }}>
            Run 1,000 simulations →
          </Link>
        </div>
      </div>
    </div>
  )
}
