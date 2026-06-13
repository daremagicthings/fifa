'use client'
import { useState } from 'react'
import Link from 'next/link'
import { matchP, teamNames } from '@/lib/klement'
import WDLBar from '@/components/ui/WDLBar'
import TeamSelect from '@/components/ui/TeamSelect'

const allTeams = teamNames().sort()

export default function LivePreviewSection() {
  const [teamA, setTeamA] = useState('Netherlands')
  const [teamB, setTeamB] = useState('Portugal')

  const { pA, dr, pB } = matchP(teamA, teamB)
  const pAp = Math.round(pA * 100)
  const drp = Math.round(dr * 100)
  const pBp = Math.round(pB * 100)

  return (
    <div className="sec" style={{ position: 'relative', overflow: 'hidden', padding: '60px 24px', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{
          color: 'var(--color-blue)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '3px',
          marginBottom: '12px',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          TRY IT NOW
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '32px',
          textAlign: 'center',
          color: 'var(--text-primary)',
          margin: '0 0 32px 0',
        }}>
          Pick any two teams.
        </h2>

        {/* Dynamic Card */}
        <div className="glass-card" style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          {/* Dropdown Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }} className="preview-selectors">
            <TeamSelect teams={allTeams} value={teamA} onChange={setTeamA} />
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--text-tertiary)', fontWeight: 600 }}>VS</div>
            <TeamSelect teams={allTeams} value={teamB} onChange={setTeamB} />
          </div>

          {/* Probability Bar */}
          <WDLBar pA={pA} dr={dr} pB={pB} labelA={teamA} labelB={teamB} />

          {/* Three Percentage Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }} className="preview-cards">
            <div className="score-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>{teamA.split(' ')[0]} Win</span>
              <span className="hl" style={{ fontSize: 24, fontWeight: 700 }}>{pAp}%</span>
            </div>
            <div className="score-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>Draw</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)' }}>{drp}%</span>
            </div>
            <div className="score-card" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>{teamB.split(' ')[0]} Win</span>
              <span className="hl-red" style={{ fontSize: 24, fontWeight: 700 }}>{pBp}%</span>
            </div>
          </div>

          {/* Breakdown Link */}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <Link href="/versus" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-blue)', textDecoration: 'none' }}>
              See full factor breakdown →
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .preview-selectors {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            text-align: center;
          }
          .preview-selectors > div:nth-child(2) {
            transform: rotate(90deg);
            margin: 4px 0;
          }
          .preview-cards {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  )
}
