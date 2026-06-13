'use client'
import Link from 'next/link'

export default function FooterCTA() {
  return (
    <div className="sec" style={{ padding: '80px 24px', textAlign: 'center', borderBottom: 'none' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '36px',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          Ready to run your own prediction?
        </h2>
        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          margin: 0,
          maxWidth: 480,
        }}>
          Pick any matchup from all 48 teams. The model runs in your browser — no data sent anywhere.
        </p>
        <div style={{ marginTop: 8 }}>
          <Link href="/versus" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
            Predict a Match →
          </Link>
        </div>
      </div>
    </div>
  )
}
