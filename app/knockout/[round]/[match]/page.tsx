import { notFound } from 'next/navigation'
import Link from 'next/link'
import { matchP, teamData } from '@/lib/klement'
import { ROUNDS, ROUND_LABELS, makeSlug } from '@/lib/fixtures'
import WDLBar from '@/components/ui/WDLBar'
import FlagImg from '@/components/ui/FlagImg'
import FactorBreakdown from '@/components/team/FactorBreakdown'
import PageTransition from '@/components/ui/PageTransition'

const ROUND_ORDER = ['r32', 'r16', 'qf', 'sf', 'final'] as const
type Round = typeof ROUND_ORDER[number]

export function generateStaticParams() {
  return Object.entries(ROUNDS).flatMap(([round, matches]) =>
    matches.map(m => ({ round, match: makeSlug(m.teamA, m.teamB) }))
  )
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ round: string; match: string }>
}) {
  const { round, match } = await params
  if (!(round in ROUNDS)) notFound()

  const matches = ROUNDS[round as Round]
  const found = matches.find(m => makeSlug(m.teamA, m.teamB) === match)
  if (!found) notFound()

  const { teamA, teamB, k } = found
  const { pA, dr, pB } = matchP(teamA, teamB)
  const tA = teamData(teamA)
  const tB = teamData(teamB)
  const isFinal = round === 'final'
  const pAp = Math.round(pA * 100)
  const pBp = Math.round(pB * 100)

  return (
    <PageTransition>
      <div className="page-enter" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb nav */}
          <div className="ko-tabs">
            <Link href="/knockout/bracket" className="ko-tab">BRACKET</Link>
            <Link href={`/knockout/${round}`} className="ko-tab active">
              {ROUND_LABELS[round]?.toUpperCase()}
            </Link>
            <div className="ko-tab" style={{ color: 'var(--text-primary)', cursor: 'default', fontWeight: 600 }}>
              {teamA} vs {teamB}
            </div>
          </div>

          <div style={{ padding: '32px 24px', maxWidth: 800, margin: '0 auto' }}>

            {/* Match Header Info Card */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: 24,
              alignItems: 'center',
              marginBottom: 36,
              padding: '32px 24px',
              backgroundColor: 'var(--bg-surface)',
              border: isFinal ? '2px solid var(--color-green)' : '1px solid var(--border)',
              borderRadius: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            }} className="responsive-match-header">
              
              {/* Team A */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 12,
                padding: '16px',
                borderRadius: 12,
                backgroundColor: k === teamA ? 'var(--color-green-soft)' : 'transparent',
                border: k === teamA ? '1px solid rgba(24, 168, 74, 0.2)' : '1px solid transparent',
              }} className="match-team-card">
                <FlagImg name={teamA} h={40} emoji={tA?.flag ?? '🏳️'} />
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 700 }}>
                  {teamA.toUpperCase()}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>{tA?.conf}</div>
                {k === teamA && <span className="k-badge">K✓ KLEMENT PICK</span>}
                <div style={{ fontSize: 20, color: 'var(--color-blue)', fontWeight: 700 }}>{pAp}%</div>
              </div>

              {/* VS Divider */}
              <div style={{ textAlign: 'center' }} className="match-vs-divider">
                <div style={{ fontSize: 20, color: 'var(--text-tertiary)', fontWeight: 700, marginBottom: 8 }}>VS</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', letterSpacing: 1, fontWeight: 700 }}>
                  {ROUND_LABELS[round]?.toUpperCase()}
                </div>
                {isFinal && <div style={{ fontSize: 11, color: 'var(--color-green)', marginTop: 8, fontWeight: 700 }}>🏆 FINAL</div>}
              </div>

              {/* Team B */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 12,
                padding: '16px',
                borderRadius: 12,
                backgroundColor: k === teamB ? 'var(--color-green-soft)' : 'transparent',
                border: k === teamB ? '1px solid rgba(24, 168, 74, 0.2)' : '1px solid transparent',
              }} className="match-team-card">
                <FlagImg name={teamB} h={40} emoji={tB?.flag ?? '🏳️'} />
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 700 }}>
                  {teamB.toUpperCase()}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>{tB?.conf}</div>
                {k === teamB && <span className="k-badge">K✓ KLEMENT PICK</span>}
                <div style={{ fontSize: 20, color: 'var(--color-red)', fontWeight: 700 }}>{pBp}%</div>
              </div>
            </div>

            {/* WDL probability display */}
            <div style={{ marginBottom: 36 }}>
              <WDLBar pA={pA} dr={dr} pB={pB} labelA={teamA} labelB={teamB} />
            </div>

            {/* Side by side Factor breakdowns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="match-factors-grid">
              {[
                { team: tA, name: teamA, color: 'var(--color-blue)' },
                { team: tB, name: teamB, color: 'var(--color-red)' },
              ].map(({ team, name, color }) => (
                <div key={name} className="factor-card" style={{ borderTop: `4px solid ${color}`, padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 700, color, marginBottom: 20 }}>
                    <FlagImg name={name} h={18} emoji={team?.flag ?? '🏳️'} />
                    {name.toUpperCase()}
                  </div>
                  {[
                    { label: 'FIFA Ranking', val: `${team?.fifa} PTS` },
                    { label: 'Wealth (GDP)',  val: `$${team?.gdp}K/Capita` },
                    { label: 'Climate Temp', val: `${team?.temp}°C` },
                    { label: 'Population',  val: `${team?.pop}M` },
                    { label: 'Conference', val: team?.conf ?? '' },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: 13 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)', padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 6, fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 24 }}>
                    <FactorBreakdown name={name} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  )
}
