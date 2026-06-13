'use client'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="sec fade-section" style={{ position: 'relative', overflow: 'hidden', padding: '60px 24px' }}>
      {/* Background soft glowing ambient shapes */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(26, 95, 232, 0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center',
      }} className="responsive-grid">
        {/* Left Column */}
        <div>
          <div className="eyebrow">PANMURE LIBERUM · APRIL 2026</div>
          <h1 className="fade-section fade-delay-1" style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '48px',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            margin: '0 0 20px 0',
          }}>
            Who wins the<br />
            <span className="hl" style={{ fontSize: '56px' }}>2026 World Cup?</span>
          </h1>
          <p className="fade-section fade-delay-2" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            marginBottom: '32px',
            maxWidth: '480px',
          }}>
            An econometric model that called 2014, 2018 and 2022 correctly — now running on all 48 teams.
          </p>
          <div className="fade-section fade-delay-3" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <Link href="/versus" className="btn-primary" style={{ fontSize: '15px' }}>
              Predict a Match →
            </Link>
            <span className="football-bounce" style={{ fontSize: 24 }}>⚽</span>
          </div>
          {/* Trust Bar */}
          <div className="fade-section fade-delay-3" style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '16px',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            fontSize: '12px',
            color: 'var(--text-tertiary)',
            fontWeight: 600,
          }}>
            <span>✓ 3 correct predictions</span>
            <span>✓ 48 teams</span>
            <span>✓ R²≈0.55</span>
            <span>✓ No score guessing</span>
          </div>
        </div>

        {/* Right Column — Conic Gradient Ball Graphic */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="float" style={{
            position: 'relative',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, var(--color-blue), var(--color-blue-light), var(--color-green), var(--color-red), var(--color-blue))',
            boxShadow: '0 20px 50px rgba(26, 95, 232, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Overlay a clean grid pattern or white center to make it look like a football/brand panel */}
            <div style={{
              width: 250,
              height: 250,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Adidas Trionda panel styles overlay */}
              <div style={{
                position: 'absolute',
                width: '120%',
                height: '35%',
                top: '15%',
                left: '-10%',
                borderBottom: '4px solid var(--color-blue-light)',
                borderRadius: '50%',
                transform: 'rotate(-15deg)',
                opacity: 0.15,
              }} />
              <div style={{
                position: 'absolute',
                width: '120%',
                height: '35%',
                bottom: '15%',
                right: '-10%',
                borderTop: '4px solid var(--color-red-light)',
                borderRadius: '50%',
                transform: 'rotate(20deg)',
                opacity: 0.15,
              }} />
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 22,
                color: 'var(--color-blue)',
                textAlign: 'center',
                fontWeight: 600,
                zIndex: 1,
              }}>
                TRIONDA<br />
                <span style={{ fontSize: 13, letterSpacing: 3, color: 'var(--text-tertiary)' }}>WC 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center;
          }
          .responsive-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
