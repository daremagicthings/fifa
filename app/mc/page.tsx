'use client'
import { useState, useCallback, useRef } from 'react'
import { simKO, teamData } from '@/lib/klement'
import { ROUNDS } from '@/lib/fixtures'
import ProgressBar from '@/components/ui/ProgressBar'
import FlagImg from '@/components/ui/FlagImg'
import PageTransition from '@/components/ui/PageTransition'

type ChampCounts = Record<string, number>

const BAR_COLORS = [
  'var(--color-blue)',
  'var(--color-blue-light)',
  'var(--color-green)',
  'var(--color-green-light)',
  'var(--color-red-light)',
  'var(--color-blue)',
  'var(--color-blue-light)',
  'var(--color-green)',
]

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

const PHASES = [
  'Loading bracket data...',
  'Seeding Round of 32...',
  'Simulating knockout rounds...',
  'Running Monte Carlo engine...',
  'Aggregating results...',
  'Sorting champion table...',
]

export default function MCPage() {
  const [n, setN] = useState(1000)
  const [results, setResults] = useState<ChampCounts | null>(null)
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const run = useCallback(() => {
    setRunning(true)
    setResults(null)
    setProgress(0)
    setPhase(PHASES[0])

    const totalDelay = 1200 + Math.floor((n / 5000) * 500)
    const tickInterval = Math.floor(totalDelay / 28)
    let tick = 0

    intervalRef.current = setInterval(() => {
      tick++
      const pct = Math.min(88, Math.round((tick / 28) * 100))
      setProgress(Math.round((pct / 100) * n))
      setPhase(PHASES[Math.min(tick >> 2, PHASES.length - 1)])

      if (tick >= 28) {
        clearInterval(intervalRef.current!)
      }
    }, tickInterval)

    setTimeout(() => {
      clearInterval(intervalRef.current!)
      const res = runSims(n)
      setProgress(n)
      setPhase('Complete ✓')
      setResults(res)
      setRunning(false)
    }, totalDelay)
  }, [n])

  const sorted = results
    ? Object.entries(results).sort((a, b) => b[1] - a[1]).slice(0, 8)
    : null
  const maxCount = sorted ? sorted[0]?.[1] ?? 1 : 1

  return (
    <PageTransition>
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 className="section-title">MONTE CARLO SIMULATOR</h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
            Each simulation runs the full tournament bracket in your browser using W/D/L probabilities from the econometric Klement model.
          </p>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: 1 }}>SIMULATIONS</span>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 600, color: 'var(--color-blue)',
            }}>{n.toLocaleString()}</div>
            <input
              type="range" min={100} max={5000} step={100} value={n}
              onChange={e => setN(Number(e.target.value))}
              disabled={running}
              style={{
                accentColor: 'var(--color-blue)',
                width: 180,
                height: 6,
                cursor: running ? 'not-allowed' : 'pointer',
              }}
            />
            <button
              className="btn-primary"
              onClick={run}
              disabled={running}
              style={{
                opacity: running ? 0.7 : 1,
                cursor: running ? 'wait' : 'pointer',
              }}
            >
              {running ? '⏳ Running...' : '▶ Run Simulations'}
            </button>
          </div>

          {/* Progress display while running */}
          {running && (
            <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: 'var(--color-green)', fontWeight: 600 }}>{phase}</span>
                <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>
                  {progress.toLocaleString()} / {n.toLocaleString()}
                </span>
              </div>
              <ProgressBar value={Math.round((progress / n) * 100)} color="var(--color-green)" />
              <div className="marching" />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, fontSize: 12, color: 'var(--text-tertiary)' }}>
                {Math.round((progress / n) * 100)}%
              </div>
            </div>
          )}

          {/* Results */}
          {sorted && !running && (
            <>
              <h2 className="section-title" style={{ marginTop: 12 }}>CHAMPION DISTRIBUTION</h2>
              <div className="glass-card" style={{ padding: '16px 20px', marginBottom: 24 }}>
                {sorted.map(([team, count], i) => {
                  const t = teamData(team)
                  const pct = Math.round((count / n) * 100)
                  return (
                    <div key={team} className="mc-row" style={{
                      padding: '12px 0',
                      borderBottom: i === sorted.length - 1 ? 'none' : '1px solid var(--border)',
                    }}>
                      <div style={{
                        fontSize: 15, fontWeight: 700,
                        color: i === 0 ? 'var(--color-green)' : 'var(--text-tertiary)',
                        textAlign: 'center',
                      }}>
                        {i === 0 ? '🏆' : i + 1}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                        <FlagImg name={team} h={18} emoji={t?.flag ?? '🏳️'} />
                        {team}
                      </div>
                      <ProgressBar value={Math.round((count / maxCount) * 100)} color={BAR_COLORS[i]} />
                      <div style={{
                        fontSize: 15, fontWeight: 700,
                        color: i === 0 ? 'var(--color-green)' : 'var(--text-primary)',
                        textAlign: 'right',
                      }}>{pct}%</div>
                    </div>
                  )
                })}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 16, lineHeight: 1.7 }}>
                * {n.toLocaleString()} simulations completed in-browser. 45% variance represents pure unmodelled noise (σ = 0.28).
              </p>
            </>
          )}

          {!sorted && !running && (
            <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                Press <strong>Run Simulations</strong> to simulate the full tournament bracket...
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
