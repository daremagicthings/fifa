import { notFound } from 'next/navigation'
import Link from 'next/link'
import { matchP, teamData } from '@/lib/klement'
import { ROUNDS, ROUND_LABELS, makeSlug } from '@/lib/fixtures'
import FlagImg from '@/components/ui/FlagImg'
import PageTransition from '@/components/ui/PageTransition'

const ROUND_ORDER = ['r32', 'r16', 'qf', 'sf', 'final'] as const
type Round = typeof ROUND_ORDER[number]

export function generateStaticParams() {
  return ROUND_ORDER.map(round => ({ round }))
}

export default async function KnockoutPage({ params }: { params: Promise<{ round: string }> }) {
  const { round } = await params
  if (!(round in ROUNDS)) notFound()

  const matches = ROUNDS[round as Round]
  const isFinal = round === 'final'

  return (
    <PageTransition>
      <div className="page-enter" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="ko-tabs">
            <Link href="/knockout/bracket" className="ko-tab">BRACKET</Link>
            {ROUND_ORDER.map(r => (
              <Link key={r} href={`/knockout/${r}`} className={`ko-tab${round === r ? ' active' : ''}`}>
                {r.toUpperCase()}
              </Link>
            ))}
          </div>

          <div style={{ padding: '36px 24px', maxWidth: 800, margin: '0 auto' }}>
            <div style={{
              fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28, letterSpacing: 1,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              {isFinal && <span className="trophy-pulse" style={{ fontSize: 24 }}>🏆</span>}
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 400 }}>
                {ROUND_LABELS[round].toUpperCase()}
              </span>
              {isFinal && <span style={{ color: 'var(--color-green)', marginLeft: 8, fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>KLEMENT'S TITLE CALL</span>}
            </div>

            {matches.map((m, i) => {
              const matchHref = `/knockout/${round}/${makeSlug(m.teamA, m.teamB)}`
              const { pA, dr, pB } = matchP(m.teamA, m.teamB)
              const pAp = Math.round(pA * 100)
              const drp = Math.round(dr * 100)
              const pBp = Math.round(pB * 100)
              const tA = teamData(m.teamA)
              const tB = teamData(m.teamB)
              const pickIsA = m.k === m.teamA

              return (
                <Link
                  key={i}
                  href={matchHref}
                  className="ko-match"
                  style={{
                    ...(isFinal ? {
                      border: '1px solid rgba(24, 168, 74, 0.2)',
                      background: 'var(--color-green-soft)',
                    } : {}),
                  }}
                >
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <FlagImg name={m.teamA} h={30} emoji={tA?.flag ?? '🏳️'} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: 'var(--text-primary)' }}>{m.teamA}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4, fontWeight: 600 }}>{tA?.conf}</div>
                    {pickIsA && <span className="k-badge" style={{ marginTop: 8 }}>K✓ Pick</span>}
                  </div>

                  <div className="ko-mini-bar">
                    <div style={{
                      flex: pAp,
                      background: 'linear-gradient(90deg, var(--color-blue), var(--color-blue-light))',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
                    }}>{pAp}%</div>
                    <div style={{
                      flex: drp,
                      backgroundColor: 'var(--bg-muted)',
                      color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                    }}>{drp}%</div>
                    <div style={{
                      flex: pBp,
                      background: 'linear-gradient(90deg, var(--color-red-light), var(--color-red))',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
                    }}>{pBp}%</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'flex-end' }}>
                      <FlagImg name={m.teamB} h={30} emoji={tB?.flag ?? '🏳️'} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: 'var(--text-primary)' }}>{m.teamB}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4, fontWeight: 600 }}>{tB?.conf}</div>
                    {!pickIsA && m.k === m.teamB && <span className="k-badge" style={{ marginTop: 8 }}>K✓ Pick</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
