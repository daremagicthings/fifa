'use client'
import { useState } from 'react'
import { matchP, teamNames, teamData, simResult } from '@/lib/klement'
import WDLBar from '@/components/ui/WDLBar'
import FlagImg from '@/components/ui/FlagImg'
import FactorBreakdown from '@/components/team/FactorBreakdown'
import TeamSelect from '@/components/ui/TeamSelect'
import PolymarketBtn from '@/components/ui/PolymarketBtn'
import { PM_GAP_THRESHOLD } from '@/lib/polymarket'
import PageTransition from '@/components/ui/PageTransition'

const allTeams = teamNames().sort()
const SIM_N = 500

function upsetLabel(pA: number, pB: number): { text: string; color: string } | null {
  const gap = Math.abs(pA - pB)
  if (gap < 0.1) return { text: '⚔ Coin Flip', color: 'var(--color-blue)' }
  if (gap > 0.55) return { text: '⚡ Heavy Favourite', color: 'var(--color-red)' }
  if (gap > 0.35) return { text: '⚡ Upset Potential', color: 'var(--color-red)' }
  return null
}

interface SimData { w: number; d: number; l: number }

export default function VersusPage() {
  const [teamA, setTeamA] = useState('Netherlands')
  const [teamB, setTeamB] = useState('Portugal')
  const [sim, setSim] = useState<SimData | null>(null)
  const [simFor, setSimFor] = useState('')

  const { pA, dr, pB } = matchP(teamA, teamB)
  const tA = teamData(teamA)
  const tB = teamData(teamB)
  const upset = upsetLabel(pA, pB)

  const key = `${teamA}:${teamB}`
  if (simFor !== '' && simFor !== key) {
    setSim(null)
    setSimFor('')
  }

  function runSim() {
    let w = 0, d = 0, l = 0
    for (let i = 0; i < SIM_N; i++) {
      const r = simResult(teamA, teamB)
      if (r === 'A') w++
      else if (r === 'D') d++
      else l++
    }
    setSim({ w, d, l })
    setSimFor(key)
  }

  function surpriseMe() {
    const pool = allTeams.filter(t => t !== teamA && t !== teamB)
    const a = pool[Math.floor(Math.random() * pool.length)]
    const remaining = pool.filter(t => t !== a)
    const b = remaining[Math.floor(Math.random() * remaining.length)]
    setTeamA(a)
    setTeamB(b)
    setSim(null)
    setSimFor('')
  }

  return (
    <PageTransition>
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <h2 className="section-title" style={{ marginBottom: 0, flex: 'none' }}>VERSUS</h2>
            <button className="btn-secondary" onClick={surpriseMe} style={{ fontSize: 13, padding: '8px 16px' }}>🎲 Random</button>
          </div>

          {/* Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center', marginBottom: 32 }} className="versus-selectors">
            <TeamSelect teams={allTeams} value={teamA} onChange={v => { setTeamA(v); setSim(null) }} />
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700,
              color: 'var(--text-tertiary)', textAlign: 'center', padding: '0 8px',
            }}>VS</div>
            <TeamSelect teams={allTeams} value={teamB} onChange={v => { setTeamB(v); setSim(null) }} />
          </div>

          {/* WDL Bar */}
          <WDLBar pA={pA} dr={dr} pB={pB} labelA={teamA} labelB={teamB} />

          {/* Polymarket action button */}
          {Math.abs(pA - pB) >= PM_GAP_THRESHOLD && (
            <div style={{ marginTop: 20 }}>
              <PolymarketBtn teamName={pA > pB ? teamA : teamB} variant="match" />
            </div>
          )}

          {/* Upset simulation trigger */}
          {upset && (
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={runSim}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: 13, color: upset.color, borderColor: upset.color }}
              >
                {upset.text} — Simulate Match ▶
              </button>

              {sim && (
                <div style={{ display: 'flex', gap: 10, fontSize: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    color: 'var(--color-blue)', border: '1px solid rgba(26, 95, 232, 0.2)',
                    padding: '6px 12px', borderRadius: 8, backgroundColor: 'var(--color-blue-soft)', fontWeight: 600,
                  }}>
                    {teamA.split(' ')[0]} {Math.round(sim.w / SIM_N * 100)}%
                  </span>
                  <span style={{
                    color: 'var(--text-secondary)', border: '1px solid var(--border)',
                    padding: '6px 12px', borderRadius: 8, backgroundColor: 'var(--bg-surface)', fontWeight: 600,
                  }}>
                    Draw {Math.round(sim.d / SIM_N * 100)}%
                  </span>
                  <span style={{
                    color: 'var(--color-red)', border: '1px solid rgba(232, 36, 24, 0.2)',
                    padding: '6px 12px', borderRadius: 8, backgroundColor: 'var(--color-red-soft)', fontWeight: 600,
                  }}>
                    {teamB.split(' ')[0]} {Math.round(sim.l / SIM_N * 100)}%
                  </span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: 11, alignSelf: 'center' }}>({SIM_N} simulated runs)</span>
                </div>
              )}
            </div>
          )}

          {/* Team Factor Comparisons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }} className="factor-grid-versus">
            {[
              { team: tA, name: teamA, accentColor: 'var(--color-blue)', badgeColor: 'rgba(26, 95, 232, 0.1)' },
              { team: tB, name: teamB, accentColor: 'var(--color-red)', badgeColor: 'rgba(232, 36, 24, 0.1)' },
            ].map(({ team, name, accentColor }) => (
              <div key={name} className="factor-card" style={{ borderTop: `4px solid ${accentColor}`, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, fontWeight: 700, color: accentColor, marginBottom: 24 }}>
                  <FlagImg name={name} h={20} emoji={team?.flag ?? '🏳️'} />
                  {name.toUpperCase()}
                </div>
                {[
                  { label: 'FIFA Points', val: `${team?.fifa} PTS` },
                  { label: 'Wealth (GDP)', val: `$${team?.gdp}K/Capita` },
                  { label: 'Conference', val: team?.conf ?? '' },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{
                      color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)',
                      padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, fontWeight: 600,
                    }}>{val}</span>
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
      <style jsx global>{`
        @media (max-width: 768px) {
          .versus-selectors {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .versus-selectors > div:nth-child(2) {
            transform: rotate(90deg);
            margin: 4px 0;
          }
          .factor-grid-versus {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </PageTransition>
  )
}
