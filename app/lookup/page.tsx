'use client'
import { useState } from 'react'
import { matchP, teamNames, teamData } from '@/lib/klement'
import PageTransition from '@/components/ui/PageTransition'
import SectionLabel from '@/components/ui/SectionLabel'
import WDLBar from '@/components/ui/WDLBar'
import FactorBreakdown from '@/components/team/FactorBreakdown'

const allTeams = teamNames().sort()

export default function LookupPage() {
  const [teamA, setTeamA] = useState('Netherlands')
  const [teamB, setTeamB] = useState('Portugal')

  const { pA, dr, pB } = matchP(teamA, teamB)
  const tA = teamData(teamA)
  const tB = teamData(teamB)

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div className="fade-section">
          <SectionLabel>Match Lookup</SectionLabel>
          <h1 className="font-heading font-800 text-3xl text-[#0D1117]">
            Pick a <span className="hl">matchup</span>
          </h1>
        </div>

        <div className="fade-section fade-delay-1 grid grid-cols-2 gap-4">
          {([
            { value: teamA, set: setTeamA, label: 'Team A', flag: tA?.flag ?? '' },
            { value: teamB, set: setTeamB, label: 'Team B', flag: tB?.flag ?? '' },
          ] as const).map(({ value, set, label, flag }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-[#8892A0]">{label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">{flag}</span>
                <select
                  value={value}
                  onChange={e => set(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-medium border border-[#E2E6EC] rounded-xl bg-white text-[#0D1117] focus:outline-none focus:border-blue appearance-none cursor-pointer"
                >
                  {allTeams.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="fade-section fade-delay-2 glass-card rounded-2xl p-5 space-y-5">
          <WDLBar pA={pA} dr={dr} pB={pB} labelA={teamA} labelB={teamB} />
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: teamA, value: pA, flag: tA?.flag ?? '', cls: 'text-blue', border: 'border-l-4 border-l-blue' },
              { label: 'Draw',  value: dr,  flag: '🤝', cls: 'text-[#8892A0]', border: '' },
              { label: teamB, value: pB, flag: tB?.flag ?? '', cls: 'text-red',  border: 'border-l-4 border-l-red' },
            ].map(({ label, value, flag, cls, border }) => (
              <div key={label} className={`bg-[#F4F6F9] rounded-xl p-4 ${border}`}>
                <div className="text-2xl mb-1">{flag}</div>
                <p className={`font-heading font-800 text-2xl ${cls}`}>
                  {(value * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-[#8892A0] truncate mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-section fade-delay-3 grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-5 panel-blue">
            <h3 className="font-heading font-700 text-sm text-blue mb-4">{teamA}</h3>
            <FactorBreakdown name={teamA} />
          </div>
          <div className="glass-card rounded-2xl p-5 panel-red">
            <h3 className="font-heading font-700 text-sm text-red mb-4">{teamB}</h3>
            <FactorBreakdown name={teamB} />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
