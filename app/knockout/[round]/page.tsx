import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageTransition from '@/components/ui/PageTransition'
import SectionLabel from '@/components/ui/SectionLabel'
import MatchCard from '@/components/match/MatchCard'
import { ROUNDS, ROUND_LABELS } from '@/lib/fixtures'

const ROUND_ORDER = ['r32', 'r16', 'qf', 'sf', 'final'] as const
type Round = typeof ROUND_ORDER[number]

export function generateStaticParams() {
  return ROUND_ORDER.map(round => ({ round }))
}

export default async function KnockoutPage({ params }: { params: Promise<{ round: string }> }) {
  const { round } = await params
  if (!(round in ROUNDS)) notFound()

  const matches = ROUNDS[round as Round]
  const label = ROUND_LABELS[round]
  const isFinal = round === 'final'
  const currentIdx = ROUND_ORDER.indexOf(round as Round)

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <div className="fade-section">
          <SectionLabel>Knockout Stage</SectionLabel>
          <h1 className={`font-heading font-800 text-3xl text-[#0D1117] ${isFinal ? 'hl-green' : ''}`}>
            {isFinal ? '🏆 ' : ''}{label}
          </h1>
          {isFinal && (
            <p className="text-[#4A5260] mt-2 text-sm">
              Klement&apos;s predicted final — the model&apos;s headline call.
            </p>
          )}
        </div>

        <nav className="fade-section fade-delay-1 flex gap-2 flex-wrap">
          {ROUND_ORDER.map((r, i) => (
            <Link
              key={r}
              href={`/knockout/${r}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                r === round
                  ? 'bg-blue text-white'
                  : i < currentIdx
                  ? 'bg-[#F4F6F9] text-[#8892A0]'
                  : 'bg-[#F4F6F9] text-[#4A5260] hover:bg-[#EFF1F5]'
              }`}
            >
              {ROUND_LABELS[r]}
            </Link>
          ))}
        </nav>

        <div className="fade-section fade-delay-2 space-y-4">
          {matches.map((m, i) => (
            <MatchCard key={i} teamA={m.teamA} teamB={m.teamB} k={m.k} isFinal={isFinal} />
          ))}
        </div>

        <div className="fade-section fade-delay-3 flex justify-between">
          {currentIdx > 0 && (
            <Link
              href={`/knockout/${ROUND_ORDER[currentIdx - 1]}`}
              className="text-sm text-[#4A5260] hover:text-blue transition-colors"
            >
              ← {ROUND_LABELS[ROUND_ORDER[currentIdx - 1]]}
            </Link>
          )}
          {currentIdx < ROUND_ORDER.length - 1 && (
            <Link
              href={`/knockout/${ROUND_ORDER[currentIdx + 1]}`}
              className="text-sm text-blue hover:text-blue-light transition-colors ml-auto"
            >
              {ROUND_LABELS[ROUND_ORDER[currentIdx + 1]]} →
            </Link>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
