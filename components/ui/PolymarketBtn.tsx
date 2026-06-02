// components/ui/PolymarketBtn.tsx

import { pmUrl } from '@/lib/polymarket'

interface Props {
  teamName?: string
  variant?: 'champion' | 'match'
}

function PolymarketIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 7, flexShrink: 0 }}
    >
      {/* Outer frame */}
      <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Upper right-pointing triangle */}
      <path
        d="M3.5 3.5 L12.5 8 L3.5 7 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      {/* Lower right-pointing triangle */}
      <path
        d="M3.5 9 L12.5 8 L3.5 12.5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  )
}

export default function PolymarketBtn({ teamName, variant: _variant = 'match' }: Props) {
  const url = pmUrl(teamName)

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
        Trade on Polymarket
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
