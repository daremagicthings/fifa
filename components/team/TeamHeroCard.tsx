import { sc, teamData } from '@/lib/klement'
import Tag from '@/components/ui/Tag'

interface Props {
  name: string
}

export default function TeamHeroCard({ name }: Props) {
  const t = teamData(name)
  const score = sc(name)

  if (!t) return null

  return (
    <div className="glass-card rounded-2xl p-6 panel-blue">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-6xl">{t.flag}</span>
        <div>
          <h1 className="font-heading font-800 text-2xl text-[#0D1117]">{name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Tag variant="gray">{t.conf}</Tag>
            {t.host && <Tag variant="green">Host</Tag>}
            {t.latam && <Tag variant="blue">LatAm</Tag>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#F4F6F9] rounded-xl p-3 text-center">
          <p className="text-2xl font-heading font-800 hl">{score.toFixed(3)}</p>
          <p className="text-xs text-[#8892A0] mt-0.5">Model Score</p>
        </div>
        <div className="bg-[#F4F6F9] rounded-xl p-3 text-center">
          <p className="text-2xl font-heading font-800 text-[#0D1117]">{t.fifa}</p>
          <p className="text-xs text-[#8892A0] mt-0.5">FIFA Points</p>
        </div>
        <div className="bg-[#F4F6F9] rounded-xl p-3 text-center">
          <p className="text-2xl font-heading font-800 text-[#0D1117]">${t.gdp}k</p>
          <p className="text-xs text-[#8892A0] mt-0.5">GDP per capita</p>
        </div>
      </div>
    </div>
  )
}
