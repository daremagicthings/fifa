'use client'
import { useState, useMemo } from 'react'
import { simResult, calcStandings, teamData } from '@/lib/klement'
import type { MatchResult } from '@/types'
import GroupMatchRow from './GroupMatchRow'
import SectionLabel from '@/components/ui/SectionLabel'

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

  const { standings, results } = useMemo(() => {
    const fixtures = buildFixtures(teams)
    const results: MatchResult[] = fixtures.map(([a, b]) => ({
      teamA: a, teamB: b, result: simResult(a, b),
    }))
    return { standings: calcStandings(teams, results), results }
  }, [teams])

  return (
    <div className="glass-card rounded-xl p-4 space-y-3">
      <SectionLabel>Group {group}</SectionLabel>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-[#8892A0] border-b border-[#E2E6EC]">
            <th className="text-left pb-1.5 font-medium">Team</th>
            <th className="text-center pb-1.5 font-medium w-8">W</th>
            <th className="text-center pb-1.5 font-medium w-8">D</th>
            <th className="text-center pb-1.5 font-medium w-8">L</th>
            <th className="text-right pb-1.5 font-medium w-10">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => {
            const t = teamData(s.team)
            const advancing = i < 2
            return (
              <tr key={s.team} className={`border-b border-[#F4F6F9] last:border-0 ${advancing ? '' : 'opacity-50'}`}>
                <td className="py-2 flex items-center gap-2">
                  <span>{t?.flag}</span>
                  <span className={`font-medium ${advancing ? 'text-[#0D1117]' : 'text-[#8892A0]'}`}>
                    {s.team}
                  </span>
                  {i === 0 && <span className="text-xs text-green font-semibold">●</span>}
                  {i === 1 && <span className="text-xs text-blue font-semibold">●</span>}
                </td>
                <td className="text-center text-[#4A5260]">{s.w}</td>
                <td className="text-center text-[#4A5260]">{s.d}</td>
                <td className="text-center text-[#4A5260]">{s.l}</td>
                <td className="text-right font-bold text-[#0D1117]">{s.pts}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <button
        onClick={() => setOpen(o => !o)}
        className="text-xs text-[#8892A0] hover:text-blue transition-colors w-full text-left"
      >
        {open ? '▲ Hide matches' : '▼ Show matches'}
      </button>

      {open && (
        <div className="border-t border-[#F4F6F9] pt-2 space-y-0.5">
          {results.map(({ teamA, teamB, result }, i) => (
            <GroupMatchRow key={i} teamA={teamA} teamB={teamB} result={result} />
          ))}
        </div>
      )}
    </div>
  )
}
