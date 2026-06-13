'use client'
import { useState, useMemo } from 'react'
import { simResult, calcStandings, teamData } from '@/lib/klement'
import type { MatchResult } from '@/types'
import GroupMatchRow from './GroupMatchRow'
import FlagImg from '@/components/ui/FlagImg'

interface Props {
  group: string
  teams: string[]
}

function buildFixtures(teams: string[]): [string, string][] {
  const pairs: [string, string][] = []
  for (let i = 0; i < teams.length; i++)
    for (let j = i + 1; j < teams.length; j++)
      pairs.push([teams[i], teams[j]])
  return pairs
}

export default function GroupCard({ group, teams }: Props) {
  const [open, setOpen] = useState(false)
  const [tick, setTick] = useState(0)

  const { standings, results } = useMemo(() => {
    const fixtures = buildFixtures(teams)
    const results: MatchResult[] = fixtures.map(([a, b]) => ({
      teamA: a, teamB: b, result: simResult(a, b),
    }))
    return { standings: calcStandings(teams, results), results }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams, tick])

  return (
    <div className="group-card">
      <div className="group-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>GROUP {group}</span>
        <button
          onClick={() => setTick(t => t + 1)}
          title="Re-simulate"
          style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: 14,
            color: 'var(--color-blue)', padding: 0, lineHeight: 1,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(180deg)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(0)')}
        >🎲</button>
      </div>
      <table className="group-table">
        <thead>
          <tr>
            <th>TEAM</th>
            <th>W</th><th>D</th><th>L</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => {
            const t = teamData(s.team)
            const advancing = i < 2
            return (
              <tr key={s.team}>
                <td style={{ maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: advancing ? 600 : 400 }}>
                  {advancing && <span className="qual-dot" />}
                  <FlagImg name={s.team} h={16} emoji={t?.flag ?? '🏳️'} />
                  {' '}{s.team}
                </td>
                <td>{s.w}</td>
                <td>{s.d}</td>
                <td>{s.l}</td>
                <td style={{
                  fontWeight: 700,
                  color: advancing ? 'var(--color-green)' : 'var(--text-secondary)',
                }}>
                  {s.pts}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '10px 14px', textAlign: 'left',
          fontSize: 12, color: 'var(--text-tertiary)', backgroundColor: 'transparent',
          border: 'none', borderTop: '1px solid var(--border)',
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
      >
        {open ? '▲ Hide Matches' : '▼ Show Matches'}
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {results.map(({ teamA, teamB, result }, i) => (
            <GroupMatchRow key={i} teamA={teamA} teamB={teamB} result={result} />
          ))}
        </div>
      )}
    </div>
  )
}
