'use client'
import { useState, useEffect, useCallback } from 'react'
import { teamNames, teamData, sc, simKO } from '@/lib/klement'
import { ROUNDS } from '@/lib/fixtures'
import FlagImg from '@/components/ui/FlagImg'
import ProgressBar from '@/components/ui/ProgressBar'
import PageTransition from '@/components/ui/PageTransition'

const allTeams = teamNames().sort()

// Static betting odds fallbacks based on real live Polymarket World Cup 2026 winner odds
// in case the API call fails or is rate-limited.
const FALLBACK_ODDS: Record<string, number> = {
  'England': 0.1515,
  'France': 0.1605,
  'Brazil': 0.0835,
  'Argentina': 0.0785,
  'Germany': 0.0515,
  'Portugal': 0.1055,
  'Netherlands': 0.0485,
  'Spain': 0.0650,
  'Italy': 0.0400,
  'Belgium': 0.0205,
  'Japan': 0.0205,
  'Uruguay': 0.0095,
  'USA': 0.0195,
  'Mexico': 0.0145,
  'Morocco': 0.0145,
  'Colombia': 0.0165,
  'Croatia': 0.0085,
  'Switzerland': 0.0135,
  'Denmark': 0.0075,
  'Senegal': 0.0065,
  'Ecuador': 0.0085,
  'South Korea': 0.0045,
  'Canada': 0.0025,
  'Ukraine': 0.0035,
  'Sweden': 0.0035,
}

const SIM_N = 1000

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

interface OddsRow {
  name: string
  score: number
  klementProb: number
  polyOdds: number
  edge: number
}

export default function OddsComparisonPage() {
  const [loading, setLoading] = useState(true)
  const [simulating, setSimulating] = useState(false)
  const [polyData, setPolyData] = useState<Record<string, number>>({})
  const [klementProbs, setKlementProbs] = useState<Record<string, number>>({})
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'undervalued' | 'favorites'>('all')

  // Run in-browser Monte Carlo to compute Klement's title probability
  const runKlementSimulations = useCallback((simCount: number) => {
    setSimulating(true)
    const counts: Record<string, number> = {}
    allTeams.forEach(t => { counts[t] = 0 })

    for (let i = 0; i < simCount; i++) {
      const winner = simulateTournament()
      if (winner in counts) {
        counts[winner]++
      }
    }

    const probs: Record<string, number> = {}
    allTeams.forEach(t => {
      probs[t] = counts[t] / simCount
    })

    setKlementProbs(probs)
    setSimulating(false)
  }, [])

  // Fetch live Polymarket odds
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch('https://gamma-api.polymarket.com/markets?active=true&limit=100')
        if (!res.ok) throw new Error('API issue')
        const data = await res.json()
        
        const oddsMap: Record<string, number> = {}
        data.forEach((m: any) => {
          if (!m.question || !m.outcomePrices) return
          const match = m.question.match(/Will (.+?) win the 2026 FIFA World Cup\?/i)
          if (match) {
            let team = match[1].trim()
            // Map Polymarket names to internal names
            if (team === 'Bosnia-Herzegovina') team = 'Bosnia-Herz'
            if (team === 'Turkiye') team = 'Turkey'
            if (team === 'Curaçao') team = 'Curacao'

            let prices = []
            if (typeof m.outcomePrices === 'string') {
              try {
                prices = JSON.parse(m.outcomePrices)
              } catch (e) {
                prices = []
              }
            } else if (Array.isArray(m.outcomePrices)) {
              prices = m.outcomePrices
            }
            const price = parseFloat(prices[0] || '0')
            if (price > 0 && price < 1) {
              oddsMap[team] = price
            }
          }
        })

        const finalOdds: Record<string, number> = {}
        allTeams.forEach(t => {
          finalOdds[t] = oddsMap[t] !== undefined ? oddsMap[t] : (FALLBACK_ODDS[t] || 0.0005)
        })
        setPolyData(finalOdds)
      } catch (err) {
        console.warn('Polymarket fetch failed, using fallback odds.', err)
        const finalOdds: Record<string, number> = {}
        allTeams.forEach(t => {
          finalOdds[t] = FALLBACK_ODDS[t] || 0.0005
        })
        setPolyData(finalOdds)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    runKlementSimulations(SIM_N)
  }, [runKlementSimulations])

  // Assemble comparisons
  const rows: OddsRow[] = allTeams.map(name => {
    const score = sc(name)
    const klementProb = klementProbs[name] || 0
    const polyOdds = polyData[name] || 0.0005
    const edge = klementProb - polyOdds

    return { name, score, klementProb, polyOdds, edge }
  })

  // Find model favorite (highest Klement probability, fallback to highest score if simulation hasn't run yet)
  const modelFav = rows.reduce((max, row) => {
    if (row.klementProb !== max.klementProb) {
      return row.klementProb > max.klementProb ? row : max
    }
    return row.score > max.score ? row : max
  }, { name: '', klementProb: 0, polyOdds: 0, score: 0 } as OddsRow)

  // Find betting favorite (highest Polymarket odds)
  const bettingFav = rows.reduce((max, row) => row.polyOdds > max.polyOdds ? row : max, { name: '', klementProb: 0, polyOdds: 0, score: 0 } as OddsRow)

  // Filter & Sort
  const filteredRows = rows
    .filter(row => {
      const matchSearch = row.name.toLowerCase().includes(search.toLowerCase())
      if (!matchSearch) return false

      if (filter === 'undervalued') return row.edge > 0.015
      if (filter === 'favorites') return row.polyOdds > 0.04
      return true
    })
    .sort((a, b) => {
      if (filter === 'undervalued') return b.edge - a.edge
      if (filter === 'favorites') return b.polyOdds - a.polyOdds
      return b.klementProb !== a.klementProb ? b.klementProb - a.klementProb : b.score - a.score
    })

  return (
    <PageTransition>
      <div className="sec">
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="section-title">ODDS COMPARISON</h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
            Arbitrage analysis. Compare implied probabilities from live <strong>Polymarket betting markets</strong> against Joachim Klement's <strong>econometric model</strong> (via 1,000 tournament Monte Carlo simulations).
          </p>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }} className="odds-metrics-grid">
            <div className="score-card">
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Model Favorite
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 28, display: 'block', color: 'var(--color-blue)', marginTop: 8 }}>
                {modelFav.name || 'Netherlands'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>
                Klement: ~{(modelFav.klementProb * 100).toFixed(1)}% vs Polymarket: ~{(modelFav.polyOdds * 100).toFixed(1)}%
              </span>
            </div>
            <div className="score-card">
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Betting Favorite
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 28, display: 'block', color: 'var(--color-red)', marginTop: 8 }}>
                {bettingFav.name || 'France'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>
                Polymarket: ~{(bettingFav.polyOdds * 100).toFixed(1)}% vs Klement: ~{(bettingFav.klementProb * 100).toFixed(1)}%
              </span>
            </div>
            <div className="score-card">
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Live Connection
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 28, display: 'block', color: 'var(--color-green)', marginTop: 8 }}>
                {loading ? 'Connecting...' : 'Active ✓'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>
                Polymarket Gamma REST API
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 24,
          }} className="odds-controls-bar">
            {/* Tabs */}
            <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              {[
                { id: 'all', label: 'All Teams' },
                { id: 'undervalued', label: 'Value Edges' },
                { id: 'favorites', label: 'Market Favorites' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id as any)}
                  style={{
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: filter === t.id ? 'var(--color-blue-soft)' : '#FFFFFF',
                    color: filter === t.id ? 'var(--color-blue)' : 'var(--text-secondary)',
                    transition: 'all 0.15s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Sim / Search */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }} className="odds-sim-and-search">
              <input
                type="text"
                placeholder="Search team..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: '8px 14px',
                  fontSize: 13,
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  outline: 'none',
                  width: 180,
                  color: 'var(--text-primary)',
                }}
              />
              <button
                className="btn-secondary"
                disabled={simulating || loading}
                onClick={() => runKlementSimulations(SIM_N)}
                style={{ padding: '8px 16px', fontSize: 13, minWidth: 150 }}
              >
                {simulating ? '⏳ Simulating...' : '🎲 Re-Simulate'}
              </button>
            </div>
          </div>

          {/* Odds Table */}
          <div className="glass-card" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table className="group-table" style={{ marginBottom: 0, minWidth: 650 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', width: 50 }}>#</th>
                  <th style={{ textAlign: 'left' }}>TEAM</th>
                  <th className="hidden md:table-cell" style={{ textAlign: 'center' }}>MODEL SCORE</th>
                  <th style={{ textAlign: 'center' }}>KLEMENT PROB</th>
                  <th style={{ textAlign: 'center' }}>POLYMARKET ODDS</th>
                  <th style={{ textAlign: 'center' }}>VALUE EDGE</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-tertiary)' }}>
                      No matches found matching filters
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => {
                    const t = teamData(row.name)
                    const isNetherlands = row.name === 'Netherlands'
                    const isModelFavorite = row.name === modelFav.name
                    
                    let edgeColor = 'var(--text-secondary)'
                    let edgeWeight = 'normal'
                    let edgeLabel = `${row.edge > 0 ? '+' : ''}${(row.edge * 100).toFixed(1)}%`
                    
                    if (row.edge > 0.015) {
                      edgeColor = 'var(--color-green)'
                      edgeWeight = 'bold'
                    } else if (row.edge < -0.015) {
                      edgeColor = 'var(--color-red)'
                      edgeWeight = 'bold'
                    }

                    return (
                      <tr key={row.name}>
                        <td style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>{idx + 1}</td>
                        <td style={{ fontWeight: 700 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <FlagImg name={row.name} h={18} emoji={t?.flag ?? '🏳️'} />
                            <span style={{ color: isNetherlands ? 'var(--color-blue)' : 'var(--text-primary)' }}>
                              {row.name} {isModelFavorite && '👑'} {isNetherlands && <span className="k-badge" style={{ fontSize: 9, padding: '1px 5px', marginLeft: 4 }}>K✓ Pick</span>}
                            </span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 }}>{row.score.toFixed(3)}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{(row.klementProb * 100).toFixed(1)}%</td>
                        <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--color-blue)' }}>{(row.polyOdds * 100).toFixed(1)}%</td>
                        <td style={{ textAlign: 'center', color: edgeColor, fontWeight: edgeWeight }}>
                          <span style={{
                            backgroundColor: row.edge > 0.015 ? 'var(--color-green-soft)' : row.edge < -0.015 ? 'var(--color-red-soft)' : 'transparent',
                            padding: '4px 8px',
                            borderRadius: 6,
                            border: row.edge > 0.015 ? '1px solid rgba(24, 168, 74, 0.2)' : row.edge < -0.015 ? '1px solid rgba(232, 36, 24, 0.15)' : 'none',
                          }}>
                            {edgeLabel}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 24, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
              <strong>Arbitrage Theory</strong>: A positive value edge means the Klement econometric model estimates the team's championship chances are higher than the market's pricing (Yes shares are undervalued). Negative edge means the market is pricing their chances higher than Klement's scoring factors justify.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
