'use client'
import FlagImg from '@/components/ui/FlagImg'

export default function TrackRecordSection() {
  return (
    <div className="sec fade-section" style={{ position: 'relative', overflow: 'hidden', padding: '60px 24px', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          color: 'var(--color-blue)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '3px',
          marginBottom: '20px',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          KLEMENT'S TRACK RECORD
        </div>

        <div 
          className="record-grid fade-section fade-delay-1" 
          style={{ marginBottom: '40px' }}
        >
          {[
            { year: '2014', team: 'Germany', emoji: '🇩🇪' },
            { year: '2018', team: 'France', emoji: '🇫🇷' },
            { year: '2022', team: 'Argentina', emoji: '🇦🇷' },
          ].map(({ year, team, emoji }) => (
            <div key={year} className="record-card" style={{ padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--color-green)',
                backgroundColor: 'var(--color-green-soft)',
                border: '1px solid rgba(24, 168, 74, 0.2)',
                padding: '2px 8px',
                borderRadius: 100,
              }}>
                Predicted ✓
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', letterSpacing: 2, fontWeight: 700, marginBottom: '16px' }}>
                {year}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <FlagImg name={team} h={40} emoji={emoji} />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {team}
              </div>
            </div>
          ))}
        </div>

        <div className="fade-section fade-delay-2" style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            margin: 0,
          }}>
            "I built this model to prove econometrics can't predict football. Then it did."
          </p>
          <p style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginTop: '12px',
            marginBottom: 0,
          }}>
            — Joachim Klement, Panmure Liberum
          </p>
        </div>
      </div>
    </div>
  )
}
