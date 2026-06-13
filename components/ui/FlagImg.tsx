'use client'
import { useState } from 'react'
import { FLAG_CODES } from '@/lib/flags'

interface Props {
  name: string
  h?: number
  emoji?: string
}

export default function FlagImg({ name, h = 24, emoji = '🏳' }: Props) {
  const [failed, setFailed] = useState(false)
  const code = FLAG_CODES[name]

  const w = Math.round(h * 1.5)

  if (!code || failed) {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: w,
        height: h,
        fontSize: Math.max(8, Math.round(h * 0.45)),
        color: 'var(--text-tertiary)',
        backgroundColor: 'var(--bg-muted)',
        border: '1px solid var(--border)',
        borderRadius: 4,
        fontFamily: 'monospace',
        fontStyle: 'normal',
        verticalAlign: 'middle',
        lineHeight: 1,
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        {code?.toUpperCase() ?? '?'}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${code}.svg`}
      width={w}
      height={h}
      alt={name}
      onError={() => setFailed(true)}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        borderRadius: 3,
        objectFit: 'cover',
        flexShrink: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
    />
  )
}
