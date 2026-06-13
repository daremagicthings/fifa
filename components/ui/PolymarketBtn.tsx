import Image from 'next/image'
import { pmUrl } from '@/lib/polymarket'

interface Props {
  teamName?: string
  variant?: 'champion' | 'match'
}

export default function PolymarketBtn({ teamName, variant: _variant = 'match' }: Props) {
  const url = pmUrl(teamName)

  return (
    <div style={{ marginTop: 16, textAlign: 'center' }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
        style={{
          fontSize: 12,
          padding: '10px 20px',
          borderRadius: 10,
        }}
      >
        Trade on Polymarket
        <Image
          src="/poly-logo.jpeg"
          alt="Polymarket"
          width={18}
          height={18}
          style={{ display: 'block', borderRadius: 4 }}
        />
      </a>
      <div style={{
        fontSize: 10,
        color: 'var(--text-tertiary)',
        marginTop: 8,
        letterSpacing: '0.5px',
      }}>
        Model output only. Not financial advice.
      </div>
    </div>
  )
}
