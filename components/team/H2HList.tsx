import { matchP, teamNames, sc, teamData } from '@/lib/klement'
import SectionLabel from '@/components/ui/SectionLabel'
import WDLBar from '@/components/ui/WDLBar'

interface Props {
  name: string
}

export default function H2HList({ name }: Props) {
  const opponents = teamNames()
    .filter(t => t !== name)
    .sort((a, b) => sc(b) - sc(a))
    .slice(0, 6)

  return (
    <div className="space-y-3">
      <SectionLabel>Head-to-Head vs Top Teams</SectionLabel>
      <div className="space-y-3">
        {opponents.map(opp => {
          const { pA, dr, pB } = matchP(name, opp)
          const t = teamData(opp)
          return (
            <div key={opp} className="glass-card rounded-xl p-3 panel-blue">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-700 text-sm text-[#0D1117]">{name}</span>
                <span className="text-lg">{t?.flag}</span>
                <span className="font-heading font-700 text-sm text-[#0D1117]">{opp}</span>
              </div>
              <WDLBar pA={pA} dr={dr} pB={pB} labelA={name} labelB={opp} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
