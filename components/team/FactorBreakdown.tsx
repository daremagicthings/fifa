import { teamData } from '@/lib/klement'
import SectionLabel from '@/components/ui/SectionLabel'

interface Props {
  name: string
}

const factors = [
  {
    label: 'FIFA Ranking',
    key: 'fifa' as const,
    weight: 0.45,
    normalize: (v: number) => Math.max(0, Math.min(1, (v - 1400) / 600)),
    fmt: (v: number) => `${v} pts`,
  },
  {
    label: 'Wealth (GDP)',
    key: 'gdp' as const,
    weight: 0.20,
    normalize: (v: number) => Math.max(0, Math.min(1, 1 - ((v - 35) / 35) ** 2)),
    fmt: (v: number) => `$${v}k`,
  },
  {
    label: 'Climate (Temp)',
    key: 'temp' as const,
    weight: 0.15,
    normalize: (v: number) => Math.max(0, Math.min(1, 1 - Math.abs(v - 14) / 22)),
    fmt: (v: number) => `${v}°C`,
  },
  {
    label: 'Population',
    key: 'pop' as const,
    weight: 0.15,
    normalize: (v: number) => Math.max(0, Math.min(1, Math.log(v) / Math.log(200))),
    fmt: (v: number) => `${v}M`,
  },
]

export default function FactorBreakdown({ name }: Props) {
  const t = teamData(name)
  if (!t) return null

  return (
    <div className="space-y-3">
      <SectionLabel>Factor Breakdown</SectionLabel>
      {factors.map(({ label, key, weight, normalize, fmt }) => {
        const raw = t[key] as number
        const score = normalize(raw)
        const popFactor = key === 'pop' && !t.latam ? score * 0.3 : score
        const display = key === 'pop' ? popFactor : score
        return (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-[#0D1117]">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#8892A0] text-xs">{fmt(raw)}</span>
                <span className="font-semibold text-[#0D1117] text-xs w-14 text-right">
                  {(display * weight * 100).toFixed(1)}% wt
                </span>
              </div>
            </div>
            <div className="h-2 bg-[#EFF1F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-blue rounded-full transition-all duration-700"
                style={{ width: `${display * 100}%` }}
              />
            </div>
          </div>
        )
      })}
      {t.host && (
        <div className="flex items-center gap-2 p-2.5 bg-green-soft rounded-lg text-sm">
          <span className="text-green font-semibold">+5%</span>
          <span className="text-[#4A5260]">Home advantage bonus</span>
        </div>
      )}
    </div>
  )
}
