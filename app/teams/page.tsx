'use client'
import { useState } from 'react'
import { teamNames, teamData, sc } from '@/lib/klement'
import FactorBreakdown from '@/components/team/FactorBreakdown'
import H2HList from '@/components/team/H2HList'
import FlagImg from '@/components/ui/FlagImg'
import TeamSelect from '@/components/ui/TeamSelect'
import PageTransition from '@/components/ui/PageTransition'

const allTeams = teamNames().sort()
const ranked = [...allTeams].sort((a, b) => sc(b) - sc(a))

export default function TeamsPage() {
  const [selected, setSelected] = useState('Netherlands')
  const [tab, setTab] = useState<'profile' | 'ranking'>('profile')
  const team = teamData(selected)
  const score = sc(selected)

  return (
    <PageTransition>
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 28, gap: 0 }}>
            {(['profile', 'ranking'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`ko-tab${tab === t ? ' active' : ''}`}>
                {t === 'profile' ? 'TEAM PROFILE' : 'ALL TEAMS'}
              </button>
            ))}
          </div>

          {tab === 'ranking' && (
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <table className="group-table" style={{ marginBottom: 0 }}>
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
                        <td style={{
                          color: i < 3 ? 'var(--color-blue)' : 'var(--text-tertiary)',
                          fontWeight: i < 3 ? 700 : 'normal',
                          fontSize: '14px',
                        }}>{i + 1}</td>
                        <td style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
                          <FlagImg name={name} h={18} emoji={t?.flag ?? '🏳️'} />
                          {name}
                        </td>
                        <td style={{ textAlign: 'center', color: 'var(--color-green)', fontWeight: 700 }}>{s.toFixed(3)}</td>
                        <td style={{ textAlign: 'center', fontWeight: 500 }}>{t?.fifa}</td>
                        <td style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 12, fontWeight: 600 }}>{t?.conf}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'profile' && <>
            <TeamSelect
              teams={allTeams}
              value={selected}
              onChange={setSelected}
              style={{ maxWidth: 380, marginBottom: 24 }}
            />

            {/* Country Banner Profile */}
            <div className="glass-card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '24px 28px',
              marginBottom: 28,
            }}>
              <FlagImg name={selected} h={64} emoji={team?.flag ?? '🏳️'} />
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 400,
                  color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2,
                }}>
                  {selected.toUpperCase()}
                </h3>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {team?.conf} · FIFA {team?.fifa} PTS · Model Score {score.toFixed(3)}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 36 }} className="teams-score-grid">
              {[
                { num: score.toFixed(3), label: 'Model Score', color: 'var(--color-green)' },
                { num: team?.fifa ?? '', label: 'FIFA PTS', color: 'var(--color-blue)' },
                { num: `$${team?.gdp}k`, label: 'GDP/Capita', color: 'var(--color-blue-light)' },
              ].map(({ num, label, color }) => (
                <div key={label} className="score-card" style={{ padding: 20 }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 400,
                    color, display: 'block', marginBottom: 6,
                  }}>{num}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</span>
                </div>
              ))}
            </div>

            <FactorBreakdown name={selected} />

            <div style={{ marginTop: 36 }}>
              <H2HList name={selected} />
            </div>
          </>}

        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .teams-score-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </PageTransition>
  )
}
