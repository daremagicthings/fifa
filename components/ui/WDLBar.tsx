interface Props {
  pA: number
  dr: number
  pB: number
  labelA?: string
  labelB?: string
}

export default function WDLBar({ pA, dr, pB, labelA = 'Win', labelB = 'Win' }: Props) {
  const fmtPct = (v: number) => `${(v * 100).toFixed(0)}%`

  return (
    <div className="w-full space-y-1.5">
      <div className="flex rounded-full overflow-hidden h-3">
        <div
          className="bg-blue transition-all duration-500"
          style={{ width: `${pA * 100}%` }}
        />
        <div
          className="bg-[#C8CDD6] transition-all duration-500"
          style={{ width: `${dr * 100}%` }}
        />
        <div
          className="bg-red transition-all duration-500"
          style={{ width: `${pB * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs font-medium">
        <span className="text-blue">{labelA} {fmtPct(pA)}</span>
        <span className="text-[#8892A0]">Draw {fmtPct(dr)}</span>
        <span className="text-red">{labelB} {fmtPct(pB)}</span>
      </div>
    </div>
  )
}
