import Link from 'next/link'
import Image from 'next/image'
import PixelBar from '@/components/ui/PixelBar'
import PixelParticles from '@/components/ui/PixelParticles'

const factors = [
  { label: 'FIFA RANKING', pct: 45, color: 'var(--color-r)' },
  { label: 'NATL WEALTH',  pct: 20, color: 'var(--color-g)' },
  { label: 'CLIMATE',      pct: 15, color: 'var(--color-b)' },
  { label: 'POPULATION',   pct: 15, color: 'var(--color-b)' },
  { label: 'HOME EDGE',    pct: 5,  color: 'var(--color-r)' },
]

export default function LandingPage() {
  return (
    <div className="page-enter">

      {/* ── HERO ── */}
      <div className="sec" style={{ position: 'relative', overflow: 'hidden', paddingTop: 48, paddingBottom: 48 }}>
        <div className="dot-grid" style={{ position: 'absolute', inset: 0 }} />
        <div className="scanline" />
        <PixelParticles variant="mix" />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 220px', gap: 32, alignItems: 'center' }}>
          {/* Left — text */}
          <div>
            <div className="eyebrow fade-in">PANMURE LIBERUM · APRIL 2026</div>
            <div className="txt-shadow-r fade-in delay-1" style={{ fontSize: 22, color: 'var(--color-r)', lineHeight: 1.5, marginBottom: 16 }}>
              WHO WINS THE<br />
              <span style={{ color: 'var(--color-g)', textShadow: '3px 3px 0 var(--color-g-sh)' }}>2026 WORLD CUP?</span>
            </div>
            <div className="fade-in delay-2" style={{ fontSize: 9, color: 'var(--color-muted)', lineHeight: 2.2, maxWidth: 480, marginBottom: 28 }}>
              AN ECONOMETRIC MODEL THAT CALLED 2014, 2018 AND 2022 CORRECTLY
              — NOW RUNNING ON ALL 48 QUALIFIED NATIONS.
            </div>
            <div className="fade-in delay-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/lookup" className="px-btn" style={{
                fontFamily: 'inherit', fontSize: 10, padding: '12px 22px',
                backgroundColor: 'var(--color-r)', color: '#fff', border: 'none',
                boxShadow: '4px 4px 0 var(--color-r-sh)', textDecoration: 'none', display: 'inline-block',
              }}>▶ PREDICT MATCH</Link>
              <Link href="/about" className="px-btn" style={{
                fontFamily: 'inherit', fontSize: 10, padding: '12px 22px',
                backgroundColor: 'var(--color-bg)', color: 'var(--color-b)',
                border: '2px solid var(--color-b)', boxShadow: '4px 4px 0 var(--color-b-sh)',
                textDecoration: 'none', display: 'inline-block',
              }}>? HOW IT WORKS</Link>
              <span className="football-bounce" style={{ fontSize: 28, marginLeft: 8 }}>⚽</span>
            </div>
          </div>

          {/* Right — Klement mascot */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div className="mascot-float">
              <div style={{
                border: '3px solid var(--color-brd2)',
                boxShadow: '5px 5px 0 var(--color-brd)',
                display: 'inline-block',
                backgroundColor: 'var(--color-bg)',
              }}>
                <Image
                  src="/mascot.jpeg"
                  alt="Joachim Klement — Panmure Liberum"
                  width={200}
                  height={220}
                  priority
                  style={{ display: 'block', imageRendering: 'pixelated' }}
                />
              </div>
            </div>
            <div style={{ fontSize: 8, color: 'var(--color-b)', marginTop: 10, letterSpacing: 1 }}>JOACHIM KLEMENT</div>
            <div style={{ fontSize: 7, color: 'var(--color-muted)', marginTop: 2 }}>PANMURE LIBERUM</div>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {[
          { num: '3',    label: 'CORRECT CALLS',  color: 'var(--color-r)', sh: 'var(--color-r-sh)' },
          { num: '48',   label: 'QUALIFIED TEAMS', color: 'var(--color-g)', sh: 'var(--color-g-sh)' },
          { num: '0.55', label: 'MODEL R²',         color: 'var(--color-b)', sh: 'var(--color-b-sh)' },
        ].map(({ num, label, color, sh }) => (
          <div key={label} className="stat-cell">
            <span style={{ fontSize: 22, color, textShadow: `2px 2px 0 ${sh}`, display: 'block', marginBottom: 8 }}>{num}</span>
            <span style={{ fontSize: 8, color: 'var(--color-muted)', letterSpacing: 1 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── TRACK RECORD ── */}
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <PixelParticles variant="green" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-title">TRACK RECORD</div>
          <div className="record-grid">
            {[
              { year: '2014', flag: '🇩🇪', name: 'GERMANY' },
              { year: '2018', flag: '🇫🇷', name: 'FRANCE' },
              { year: '2022', flag: '🇦🇷', name: 'ARGENTINA' },
            ].map(({ year, flag, name }) => (
              <div key={year} className="record-card">
                <div className="record-badge">✓ WIN</div>
                <div style={{ fontSize: 8, color: 'var(--color-muted)', marginBottom: 10 }}>{year}</div>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{flag}</span>
                <div style={{ fontSize: 9, color: 'var(--color-g)' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PREDICTION BANNER ── */}
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <PixelParticles variant="green" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-title">2026 PREDICTION</div>
          <div className="pred-banner">
            <div className="dot-grid" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: 8, color: 'var(--color-g)', letterSpacing: 2, marginBottom: 14,
                backgroundColor: '#fff', display: 'inline-block', padding: '5px 12px',
                border: '1px solid var(--color-g-sh)',
              }}>PROJECTED CHAMPION</div>
              <div className="football-bounce" style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>🇳🇱</div>
              <div className="txt-shadow-g" style={{ fontSize: 18, color: 'var(--color-g)', marginBottom: 12 }}>
                NETHERLANDS<span className="blink">_</span>
              </div>
              <div style={{ fontSize: 8, color: 'var(--color-g)', opacity: 0.75, lineHeight: 2.2 }}>
                FIRST WORLD CUP TITLE IN HISTORY<br />
                PATH: MOROCCO → CANADA → FRANCE → ARGENTINA → PORTUGAL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODEL VARIABLES ── */}
      <div className="sec" style={{ position: 'relative', overflow: 'hidden' }}>
        <PixelParticles variant="blue" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-title">MODEL VARIABLES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {factors.map(({ label, pct, color }) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 42px', alignItems: 'center', gap: 14 }}>
                <div style={{ fontSize: 9, color: 'var(--color-muted)' }}>{label}</div>
                <PixelBar value={pct} color={color} />
                <div style={{ fontSize: 9, color, textAlign: 'right', fontWeight: 'bold' }}>{pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
