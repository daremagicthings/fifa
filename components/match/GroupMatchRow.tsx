import { matchP, teamData } from '@/lib/klement'
import type { WDL } from '@/types'

interface Props {
  teamA: string
  teamB: string
  result?: WDL
}

const resultBadge: Record<WDL, { label: string; cls: string }> = {
  A: { label: 'W / L', cls: 'text-blue' },
  D: { label: 'D / D', cls: 'text-[#8892A0]' },
  B: { label: 'L / W', cls: 'text-red' },
}

export default function GroupMatchRow({ teamA, teamB, result }: Props) {
  const { pA, dr, pB } = matchP(teamA, teamB)
  const tA = teamData(teamA)
  const tB = teamData(teamB)
  const fmtPct = (v: number) => `${(v * 100).toFixed(0)}%`

  return (
    <div className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#F4F6F9] transition-colors text-sm">
      <span>{tA?.flag}</span>
      <span className="font-medium text-[#0D1117] min-w-[80px]">{teamA}</span>
      {result ? (
        <span className={`mx-auto font-semibold text-xs ${resultBadge[result].cls}`}>
          {resultBadge[result].label}
        </span>
      ) : (
        <div className="flex gap-2 mx-auto text-xs text-[#8892A0]">
          <span className="text-blue">{fmtPct(pA)}</span>
          <span>{fmtPct(dr)}</span>
          <span className="text-red">{fmtPct(pB)}</span>
        </div>
      )}
      <span className="font-medium text-[#0D1117] min-w-[80px] text-right">{teamB}</span>
      <span>{tB?.flag}</span>
    </div>
  )
}
