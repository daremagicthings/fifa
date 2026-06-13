import Link from 'next/link'
import BracketView from '@/components/knockout/BracketView'
import PageTransition from '@/components/ui/PageTransition'

const ROUND_TABS = [
  { href: '/knockout/bracket', label: 'BRACKET' },
  { href: '/knockout/r32',    label: 'R32'     },
  { href: '/knockout/r16',    label: 'R16'     },
  { href: '/knockout/qf',     label: 'QF'      },
  { href: '/knockout/sf',     label: 'SF'      },
  { href: '/knockout/final',  label: 'FINAL'   },
]

export default function BracketPage() {
  return (
    <PageTransition>
      <div className="page-enter" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="ko-tabs">
            {ROUND_TABS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`ko-tab${href === '/knockout/bracket' ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div style={{ padding: '24px 24px', maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: 0.5 }}>
                FULL BRACKET — KLEMENT'S PREDICTIONS
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                <span style={{ color: 'var(--color-green)', marginRight: 4, fontWeight: 700 }}>■</span>GREEN = KLEMENT PICK
                &nbsp;&nbsp;·&nbsp;&nbsp;CLICK ANY MATCH FOR DETAIL
              </span>
            </div>
            <BracketView />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
