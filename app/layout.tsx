import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'
import Nav from '@/components/ui/Nav'

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
})

export const metadata: Metadata = {
  title: 'WC26 Klement — World Cup 2026 Predictor',
  description:
    'An econometric model that called 2014, 2018 and 2022 correctly — now running on all 48 teams.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixelFont.variable}>
      <body>
        <div className="page-wrap">
          <Nav />
          <main>{children}</main>
          <footer className="footer">
            <span style={{ fontSize: 6, color: 'var(--color-muted)' }}>
              © 2026 KLEMENT MODEL · ALL SIMULATIONS RUN IN-BROWSER
            </span>
            <span style={{ fontSize: 6, color: 'var(--color-r)' }}>PANMURE LIBERUM ▲</span>
          </footer>
        </div>
      </body>
    </html>
  )
}
