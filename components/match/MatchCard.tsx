import { matchP, teamData } from '@/lib/klement'
import WDLBar from '@/components/ui/WDLBar'
import Tag from '@/components/ui/Tag'

interface Props {
  teamA: string
  teamB: string
  k?: string
  isFinal?: boolean
}

export default function MatchCard({ teamA, teamB, k, isFinal = false }: Props) {
  const { pA, dr, pB } = matchP(teamA, teamB)
  const tA = teamData(teamA)
  const tB = teamData(teamB)

  const borderCls = isFinal
    ? 'border-2 border-[#18A84A]/30 shadow-[0_0_24px_rgba(24,168,74,0.12)]'
    : 'border border-[#E2E6EC]'

  return (
    <div className={`glass-card rounded-xl p-4 ${borderCls}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-2xl">{tA?.flag ?? '🏳'}</span>
          <div>
            <p className={`font-heading font-700 text-sm ${k === teamA ? 'text-green' : 'text-[#0D1117]'}`}>
              {teamA}
            </p>
            <p className="text-xs text-[#8892A0]">{tA?.conf}</p>
          </div>
          {k === teamA && <Tag variant="green">Klement ✓</Tag>}
        </div>
        <span className="text-xs font-semibold text-[#8892A0] px-2">VS</span>
        <div className="flex items-center gap-2 flex-1 justify-end">
          {k === teamB && <Tag variant="green">Klement ✓</Tag>}
          <div className="text-right">
            <p className={`font-heading font-700 text-sm ${k === teamB ? 'text-green' : 'text-[#0D1117]'}`}>
              {teamB}
            </p>
            <p className="text-xs text-[#8892A0]">{tB?.conf}</p>
          </div>
          <span className="text-2xl">{tB?.flag ?? '🏳'}</span>
        </div>
      </div>
      <div className="panel-blue pl-3 rounded-r-md">
        <WDLBar pA={pA} dr={dr} pB={pB} labelA={teamA} labelB={teamB} />
      </div>
    </div>
  )
}
