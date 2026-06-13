'use client'
import { useState, useRef, useEffect } from 'react'
import { teamData } from '@/lib/klement'
import FlagImg from './FlagImg'

interface Props {
  teams: string[]
  value: string
  onChange: (v: string) => void
  style?: React.CSSProperties
}

export default function TeamSelect({ teams, value, onChange, style }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = search
    ? teams.filter(t => t.toLowerCase().includes(search.toLowerCase()))
    : teams

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  const t = teamData(value)

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', ...style }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          backgroundColor: 'var(--bg-card)',
          border: open ? '1px solid var(--border-mid)' : '1px solid var(--border)',
          borderRadius: 12,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 14,
          color: 'var(--text-primary)',
          textAlign: 'left',
          boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          if (!open) e.currentTarget.style.borderColor = 'var(--border-mid)'
        }}
        onMouseLeave={e => {
          if (!open) e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <FlagImg name={value} h={20} emoji={t?.flag ?? '🏳️'} />
        <span style={{ flex: 1, fontWeight: 600 }}>{value}</span>
        <span style={{ color: 'var(--text-tertiary)', fontSize: 10, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          zIndex: 200,
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-mid)',
          borderRadius: 12,
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 280,
          overflow: 'hidden',
          animation: 'fadeUp 0.15s ease-out',
        }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              fontFamily: 'inherit',
              fontSize: 13,
              padding: '12px 16px',
              border: 'none',
              borderBottom: '1px solid var(--border)',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-primary)',
              outline: 'none',
              flexShrink: 0,
            }}
          />
          <div style={{ overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '16px', fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' }}>
                No teams found
              </div>
            ) : (
              filtered.map(name => {
                const td = teamData(name)
                const isSelected = name === value
                return (
                  <div
                    key={name}
                    onClick={() => { onChange(name); setOpen(false); setSearch('') }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: 13,
                      backgroundColor: isSelected ? 'var(--color-blue-soft)' : '#FFFFFF',
                      color: isSelected ? 'var(--color-blue)' : 'var(--text-primary)',
                      borderBottom: '1px solid var(--border)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)'
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF'
                    }}
                  >
                    <FlagImg name={name} h={16} emoji={td?.flag ?? '🏳️'} />
                    <span style={{ fontWeight: isSelected ? 600 : 400 }}>{name}</span>
                    {isSelected && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-blue)' }}>✓</span>}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
