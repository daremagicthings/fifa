'use client'
import { useState } from 'react'
import { matchP, teamNames, teamData } from '@/lib/klement'
import WDLBar from '@/components/ui/WDLBar'
import FactorBreakdown from '@/components/team/FactorBreakdown'
import PixelParticles from '@/components/ui/PixelParticles'

const allTeams = teamNames().sort()

export default function LookupPage() {
  const [teamA, setTeamA] = useState('Netherlands')
  const [teamB, setTeamB] = useState('Portugal')

  const { pA, dr, pB } = matchP(teamA, teamB)
  const tA = teamData(teamA)
  const tB = teamData(teamB)

  return (
    <div className="sec page-enter" style={{ position: 'relative', overflow: 'hidden' }}>
      <PixelParticles variant="red" />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-title">MATCH LOOKUP</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        <select className="px-select" value={teamA} onChange={e => setTeamA(e.target.value)}>
          {allTeams.map(t => <option key={t} value={t}>{teamData(t)?.flag} {t}</option>)}
        </select>
        <div style={{ fontSize: 14, color: 'var(--color-r)', textAlign: 'center', fontWeight: 'bold', padding: '0 8px' }}>VS</div>
        <select className="px-select" value={teamB} onChange={e => setTeamB(e.target.value)}>
          {allTeams.map(t => <option key={t} value={t}>{teamData(t)?.flag} {t}</option>)}
        </select>
      </div>

      <WDLBar pA={pA} dr={dr} pB={pB} labelA={teamA.slice(0, 10)} labelB={teamB.slice(0, 10)} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 28 }}>
        {[
          { team: tA, name: teamA, accentColor: 'var(--color-r)' },
          { team: tB, name: teamB, accentColor: 'var(--color-b)' },
        ].map(({ team, name, accentColor }) => (
          <div key={name} className="factor-card" style={{ borderLeft: `4px solid ${accentColor}` }}>
            <div style={{ fontSize: 10, color: accentColor, marginBottom: 16 }}>
              {team?.flag} {name.toUpperCase()}
            </div>
            {[
              { label: 'FIFA', val: `${team?.fifa} PTS` },
              { label: 'GDP',  val: `$${team?.gdp}K` },
              { label: 'CONF', val: team?.conf ?? '' },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 9, color: 'var(--color-muted)' }}>{label}</span>
                <span style={{ fontSize: 9, color: 'var(--color-g)', backgroundColor: 'var(--color-g-bg)', padding: '3px 6px', border: '1px solid var(--color-g-sh)' }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <FactorBreakdown name={name} />
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
