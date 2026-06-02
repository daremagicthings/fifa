// components/ui/PolymarketBtn.tsx

import { pmUrl } from '@/lib/polymarket'

interface Props {
  teamName?: string
  variant?: 'champion' | 'match'
}

function PolymarketIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6, flexShrink: 0 }}
    >
      <rect width="13" height="13" rx="2" fill="currentColor" />
      {/* P stem */}
      <rect x="2.5" y="2.5" width="2" height="8" fill="white" />
      {/* P top cap */}
      <rect x="4.5" y="2.5" width="4" height="2" fill="white" />
      {/* P right stroke */}
      <rect x="8.5" y="2.5" width="2" height="4" fill="white" />
      {/* P middle bar */}
      <rect x="4.5" y="6.5" width="4" height="2" fill="white" />
    </svg>
  )
}

export default function PolymarketBtn({ teamName, variant = 'match' }: Props) {
  const url = pmUrl(teamName)

  const label =
    variant === 'champion'
      ? `${teamName ?? 'Netherlands'} favored — see WC2026 markets`
      : `Trade ${teamName ?? 'this pick'} on Polymarket`

  return (
    <div style={{ marginTop: 12, textAlign: 'center' }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-btn"
        style={{
          fontFamily: 'var(--font-pixel), monospace',
          fontSize: 9,
          padding: '8px 14px',
          color: 'var(--color-b)',
          background: 'var(--color-bg)',
          border: '2px solid var(--color-b)',
          boxShadow: '3px 3px 0 var(--color-b-sh)',
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          letterSpacing: '0.5px',
          cursor: 'pointer',
        }}
      >
        <PolymarketIcon />
        {label}
      </a>
      <div style={{
        fontSize: 6,
        color: 'var(--color-muted)',
        marginTop: 6,
        letterSpacing: '0.3px',
        lineHeight: 1.8,
      }}>
        MODEL OUTPUT ONLY. NOT FINANCIAL ADVICE.
      </div>
    </div>
  )
}
