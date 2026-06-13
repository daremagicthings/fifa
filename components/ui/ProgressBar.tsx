interface Props {
  value: number
  color?: string
  height?: number
}

export default function ProgressBar({ value, color, height = 8 }: Props) {
  const gradient = color
    ? `linear-gradient(90deg, ${color}, ${color})`
    : 'linear-gradient(90deg, var(--color-blue), var(--color-blue-light))'

  return (
    <div className="progress-track" style={{ height }}>
      <div
        className="progress-fill"
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: gradient,
        }}
      />
    </div>
  )
}
