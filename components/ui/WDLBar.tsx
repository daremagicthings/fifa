interface Props {
  pA: number
  dr: number
  pB: number
  labelA?: string
  labelB?: string
}

export default function WDLBar({ pA, dr, pB, labelA = 'WIN', labelB = 'WIN' }: Props) {
  const pAp = Math.round(pA * 100)
  const drp = Math.round(dr * 100)
  const pBp = Math.round(pB * 100)

  return (
    <div>
      <div className="wdl-bar">
        <div className="wdl-a" style={{ flex: pAp }}>{pAp}%</div>
        <div className="wdl-d" style={{ flex: drp }}>{drp}%</div>
        <div className="wdl-b" style={{ flex: pBp }}>{pBp}%</div>
      </div>
      <div className="wdl-labels">
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-blue)' }}>{labelA} {pAp}%</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>DRAW {drp}%</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-red)', textAlign: 'right' }}>{labelB} {pBp}%</span>
      </div>
    </div>
  )
}
