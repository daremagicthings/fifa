'use client'
import { useState } from 'react'
import { teamNames, teamData, sc } from '@/lib/klement'
import FactorBreakdown from '@/components/team/FactorBreakdown'
import H2HList from '@/components/team/H2HList'
import FlagImg from '@/components/ui/FlagImg'
import PixelParticles from '@/components/ui/PixelParticles'

const allTeams = teamNames().sort()
const ranked = [...allTeams].sort((a, b) => sc(b) - sc(a))

export default function TeamsPage() {
  const [selected, setSelected] = useState('Netherlands')
  const [tab, setTab] = useState<'profile' | 'ranking'>('profile')
  const team = teamData(selected)
  const score = sc(selected)

  return (
    <div className="sec page-enter" style={{ position: 'relative', overflow: 'hidden' }}>
      <PixelParticles variant="green" />
      <div style={{ position: 'relative', zIndex: 1 }}>

      <div style={{ display: 'flex', borderBottom: '2px solid var(--color-brd)', marginBottom: 24 }}>
        {(['profile', 'ranking'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`ko-tab${tab === t ? ' active' : ''}`}>
            {t === 'profile' ? 'TEAM PROFILE' : 'ALL TEAMS'}
          </button>
        ))}
      </div>

      {tab === 'ranking' && (
        <div>
          <table className="group-table" style={{ marginBottom: 24 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>#</th>
                <th style={{ textAlign: 'left' }}>TEAM</th>
                <th>SCORE</th>
                <th>FIFA</th>
                <th>CONF</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((name, i) => {
                const t = teamData(name)
                const s = sc(name)
                return (
                  <tr key={name} style={{ cursor: 'pointer' }} onClick={() => { setSelected(name); setTab('profile') }}>
                    <td style={{ color: i < 3 ? 'var(--color-g)' : 'var(--color-muted)', fontWeight: i < 3 ? 'bold' : 'normal' }}>{i + 1}</td>
                    <td>
                      <FlagImg name={name} h={12} emoji={t?.flag ?? '🏳️'} />
                      {' '}{name}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--color-g)', fontFamily: 'monospace' }}>{s.toFixed(3)}</td>
                    <td style={{ textAlign: 'center' }}>{t?.fifa}</td>
                    <td style={{ textAlign: 'center', color: 'var(--color-muted)', fontSize: 8 }}>{t?.conf}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'profile' && <>
      <div className="section-title">TEAM PROFILE</div>

      <select
        className="px-select"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        style={{ maxWidth: 360, marginBottom: 28 }}
      >
        {allTeams.map(t => <option key={t} value={t}>{teamData(t)?.flag} {t}</option>)}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { num: score.toFixed(3), label: 'MODEL SCORE', color: 'var(--color-g)', sh: 'var(--color-g-sh)' },
          { num: team?.fifa ?? '',  label: 'FIFA PTS',    color: 'var(--color-b)', sh: 'var(--color-b-sh)' },
          { num: `$${team?.gdp}k`, label: 'GDP/CAPITA',  color: 'var(--color-r)', sh: 'var(--color-r-sh)' },
        ].map(({ num, label, color, sh }) => (
          <div key={label} className="score-card">
            <span style={{ fontSize: 18, color, textShadow: `2px 2px 0 ${sh}`, display: 'block', marginBottom: 8 }}>{num}</span>
            <span style={{ fontSize: 9, color: 'var(--color-muted)' }}>{label}</span>
          </div>
        ))}
      </div>

      <FactorBreakdown name={selected} />

      <div style={{ marginTop: 32 }}>
        <H2HList name={selected} />
      </div>
      </>}

      </div>
    </div>
  )
}
