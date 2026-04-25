'use client'
import { useState } from 'react'
import { teamNames, teamData } from '@/lib/klement'
import PageTransition from '@/components/ui/PageTransition'
import SectionLabel from '@/components/ui/SectionLabel'
import TeamHeroCard from '@/components/team/TeamHeroCard'
import FactorBreakdown from '@/components/team/FactorBreakdown'
import H2HList from '@/components/team/H2HList'

const allTeams = teamNames().sort()

export default function TeamsPage() {
  const [selected, setSelected] = useState('Netherlands')
  const t = teamData(selected)

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div className="fade-section">
          <SectionLabel>Team Profile</SectionLabel>
          <h1 className="font-heading font-800 text-3xl text-[#0D1117]">
            Explore a <span className="hl">team</span>
          </h1>
        </div>

        <div className="fade-section fade-delay-1">
          <label className="text-xs font-medium text-[#8892A0] block mb-1">Select team</label>
          <div className="relative max-w-xs">
            {t && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">{t.flag}</span>}
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium border border-[#E2E6EC] rounded-xl bg-white text-[#0D1117] focus:outline-none focus:border-blue appearance-none cursor-pointer"
            >
              {allTeams.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="fade-section fade-delay-2">
          <TeamHeroCard name={selected} />
        </div>

        <div className="fade-section fade-delay-3 glass-card rounded-2xl p-5">
          <FactorBreakdown name={selected} />
        </div>

        <div className="fade-section fade-delay-3">
          <H2HList name={selected} />
        </div>
      </div>
    </PageTransition>
  )
}
