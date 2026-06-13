import { teamData } from '@/lib/klement'
import SectionLabel from '@/components/ui/SectionLabel'
import ProgressBar from '@/components/ui/ProgressBar'

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
    color: 'var(--color-blue)',
  },
  {
    label: 'Wealth (GDP)',
    key: 'gdp' as const,
    weight: 0.20,
    normalize: (v: number) => Math.max(0, Math.min(1, 1 - ((v - 35) / 35) ** 2)),
    fmt: (v: number) => `$${v}k`,
    color: 'var(--color-blue-light)',
  },
  {
    label: 'Climate (Temp)',
    key: 'temp' as const,
    weight: 0.15,
    normalize: (v: number) => Math.max(0, Math.min(1, 1 - Math.abs(v - 14) / 22)),
    fmt: (v: number) => `${v}°C`,
    color: 'var(--color-green-light)',
  },
  {
    label: 'Population',
    key: 'pop' as const,
    weight: 0.15,
    normalize: (v: number) => Math.max(0, Math.min(1, Math.log(v) / Math.log(200))),
    fmt: (v: number) => `${v}M`,
    color: 'var(--color-green)',
  },
]

export default function FactorBreakdown({ name }: Props) {
  const t = teamData(name)
  if (!t) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionLabel>Factor Breakdown</SectionLabel>
      {factors.map(({ label, key, weight, normalize, fmt, color }) => {
        const raw = t[key] as number
        const score = normalize(raw)
        const display = key === 'pop' && !t.latam ? score * 0.3 : score
        const weightedPct = display * weight * 100
        return (
          <div key={key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>
              <div style={{ display: 'flex', gap: 10, color: 'var(--text-tertiary)' }}>
                <span>{fmt(raw)}</span>
                <span style={{ color, fontWeight: 700 }}>{weightedPct.toFixed(1)}%</span>
              </div>
            </div>
            <ProgressBar value={display * 100} color={color} />
          </div>
        )
      })}
      {t.host && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: 12,
          backgroundColor: 'var(--color-green-soft)',
          border: '1px solid rgba(24, 168, 74, 0.2)',
          borderRadius: 10,
          fontSize: 13,
        }}>
          <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>+5.0%</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Host advantage bonus applied</span>
        </div>
      )}
    </div>
  )
}
