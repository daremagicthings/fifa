import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import Nav from '@/components/ui/Nav'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WC26 Klement — World Cup 2026 Predictor',
  description:
    'An econometric model that called 2014, 2018 and 2022 correctly — now running on all 48 teams.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>
        <div className="page-wrap">
          <Nav />
          <main>{children}</main>
          <footer className="footer">
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              © 2026 Klement Model · All simulations run in-browser
            </span>
            <span style={{ fontSize: 12, color: 'var(--color-blue)', fontWeight: 600 }}>Panmure Liberum</span>
          </footer>
        </div>
      </body>
    </html>
  )
}
