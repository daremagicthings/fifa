import { matchP, teamData } from '@/lib/klement'
import FlagImg from '@/components/ui/FlagImg'
import type { WDL } from '@/types'

interface Props {
  teamA: string
  teamB: string
  result?: WDL
}

export default function GroupMatchRow({ teamA, teamB, result }: Props) {
  const { pA, dr, pB } = matchP(teamA, teamB)
  const tA = teamData(teamA)
  const tB = teamData(teamB)
  const fmtPct = (v: number) => `${(v * 100).toFixed(0)}%`

  const resultColor = result === 'A' ? 'var(--color-blue)' : result === 'B' ? 'var(--color-red)' : 'var(--text-secondary)'
  const resultLabel = result === 'A' ? 'W / L' : result === 'B' ? 'L / W' : 'D / D'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      fontSize: 12,
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.15s',
    }}>
      <FlagImg name={teamA} h={14} emoji={tA?.flag ?? '🏳️'} />
      <span style={{ color: 'var(--text-primary)', minWidth: 72, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{teamA}</span>
      
      {result ? (
        <span style={{ flex: 1, textAlign: 'center', color: resultColor, fontWeight: 700 }}>{resultLabel}</span>
      ) : (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 10 }}>
          <span style={{ color: 'var(--color-blue)', fontWeight: 600 }}>{fmtPct(pA)}</span>
          <span style={{ color: 'var(--text-secondary)' }}>{fmtPct(dr)}</span>
          <span style={{ color: 'var(--color-red)', fontWeight: 600 }}>{fmtPct(pB)}</span>
        </div>
      )}
      
      <span style={{ color: 'var(--text-primary)', minWidth: 72, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{teamB}</span>
      <FlagImg name={teamB} h={14} emoji={tB?.flag ?? '🏳️'} />
    </div>
  )
}
