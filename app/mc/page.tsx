'use client'
import { useState, useCallback } from 'react'
import { simKO, teamData } from '@/lib/klement'
import { ROUNDS } from '@/lib/fixtures'
import PageTransition from '@/components/ui/PageTransition'
import SectionLabel from '@/components/ui/SectionLabel'
import Btn from '@/components/ui/Btn'

type ChampCounts = Record<string, number>

function simulateTournament(): string {
  const r32 = ROUNDS.r32.map(m => simKO(m.teamA, m.teamB).winner)
  const r16: string[] = []
  for (let i = 0; i < r32.length; i += 2) r16.push(simKO(r32[i], r32[i + 1]).winner)
  const qf: string[] = []
  for (let i = 0; i < r16.length; i += 2) qf.push(simKO(r16[i], r16[i + 1]).winner)
  const sf: string[] = []
  for (let i = 0; i < qf.length; i += 2) sf.push(simKO(qf[i], qf[i + 1]).winner)
  return simKO(sf[0], sf[1]).winner
}

function runSims(n: number): ChampCounts {
  const counts: ChampCounts = {}
  for (let i = 0; i < n; i++) {
    const champ = simulateTournament()
    counts[champ] = (counts[champ] ?? 0) + 1
  }
  return counts
}

export default function MCPage() {
  const [n, setN] = useState(1000)
  const [results, setResults] = useState<ChampCounts | null>(null)
  const [running, setRunning] = useState(false)

  const run = useCallback(() => {
    setRunning(true)
    setTimeout(() => {
      setResults(runSims(n))
      setRunning(false)
    }, 10)
  }, [n])

  const sorted = results
    ? Object.entries(results).sort((a, b) => b[1] - a[1]).slice(0, 15)
    : null
  const maxCount = sorted ? sorted[0]?.[1] ?? 1 : 1

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div className="fade-section">
          <SectionLabel>Monte Carlo Simulator</SectionLabel>
          <h1 className="font-heading font-800 text-3xl text-[#0D1117]">
            Run the <span className="hl">tournament</span>
          </h1>
          <p className="text-[#4A5260] mt-2 text-sm">
            Each simulation runs the full 32-team bracket with random outcomes
            sampled from the model&apos;s W/D/L probabilities.
          </p>
        </div>

        <div className="fade-section fade-delay-1 glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-[#0D1117] w-32">Simulations</label>
            <input
              type="range"
              min={100} max={5000} step={100}
              value={n}
              onChange={e => setN(Number(e.target.value))}
              className="flex-1 accent-[#1A5FE8]"
            />
            <span className="font-heading font-700 text-lg text-[#0D1117] w-16 text-right">{n.toLocaleString()}</span>
          </div>
          <Btn variant="primary" size="md" onClick={run} disabled={running}>
            {running ? 'Running…' : `Run ${n.toLocaleString()} simulations →`}
          </Btn>
        </div>

        {sorted && (
          <div className="fade-section fade-delay-2 space-y-3">
            <SectionLabel>Champion Distribution</SectionLabel>
            {sorted.map(([team, count], i) => {
              const t = teamData(team)
              const pct = ((count / n) * 100).toFixed(1)
              const barWidth = (count / maxCount) * 100
              return (
                <div key={team} className="flex items-center gap-3">
                  <span className="text-xs text-[#8892A0] w-4 text-right">{i + 1}</span>
                  <span className="text-lg w-7">{t?.flag}</span>
                  <span className="text-sm font-medium text-[#0D1117] w-28 truncate">{team}</span>
                  <div className="flex-1 h-6 bg-[#EFF1F5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                      style={{ width: `${barWidth}%` }}
                    >
                      <span className="text-white text-xs font-semibold whitespace-nowrap">{pct}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#8892A0] w-14 text-right">{count}×</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
