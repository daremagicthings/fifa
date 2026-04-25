import PageTransition from '@/components/ui/PageTransition'
import SectionLabel from '@/components/ui/SectionLabel'
import Tag from '@/components/ui/Tag'
import Btn from '@/components/ui/Btn'

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        <div className="fade-section">
          <SectionLabel>About the Model</SectionLabel>
          <h1 className="font-heading font-800 text-3xl text-[#0D1117]">
            The <span className="hl">Klement</span> Framework
          </h1>
        </div>

        <section className="fade-section fade-delay-1 space-y-4">
          <h2 className="font-heading font-700 text-xl text-[#0D1117]">The Formula</h2>
          <div className="bg-[#F4F6F9] rounded-xl p-4 font-mono text-sm text-[#0D1117] space-y-1">
            <p>S_i = 0.20·fG(gdp) + 0.15·fP(pop) + 0.15·fT(temp) + 0.45·fF(fifa) + 0.05·host</p>
            <p className="text-[#8892A0] mt-2">P(A wins) = Φ((S_A − S_B) / 0.28) × (1 − draw)</p>
            <p className="text-[#8892A0]">draw = clip(0.20 × (1 − 0.3 × |z|), 0.05, 0.24)</p>
          </div>
          <p className="text-sm text-[#4A5260] leading-relaxed">
            Each team receives a composite score S_i ∈ [0, 1] from five weighted factors.
            Match probabilities use the normal CDF (Φ) scaled by the model&apos;s noise parameter σ = 0.28.
            The model explains R² ≈ 0.55 of variance in historical World Cup results.
          </p>
        </section>

        <section className="fade-section fade-delay-2 space-y-4">
          <h2 className="font-heading font-700 text-xl text-[#0D1117]">Five Factors</h2>
          {[
            { label: 'FIFA Ranking (45%)', icon: '📊', desc: 'Linear normalisation on [1400, 2000]. The dominant signal — current squad strength is the best single predictor.' },
            { label: 'Wealth — GDP per capita (20%)', icon: '💰', desc: 'Inverted-U with peak at $35k. Very poor nations lack infrastructure; very rich nations deprioritise football.' },
            { label: 'Climate — Avg Temperature (15%)', icon: '🌡️', desc: 'Linear decay from optimal 14°C. Nations close to the temperate sweet spot consistently outperform.' },
            { label: 'Population (15%)', icon: '👥', desc: 'Log-scale. Multiplied by 0.3 for non-LatAm nations — large non-football populations dilute the talent pool signal.' },
            { label: 'Home Advantage (5%)', icon: '🏟️', desc: 'Binary bonus for host nations. Smaller effect than in single-host tournaments given the 3-country format.' },
          ].map(({ label, icon, desc }) => (
            <div key={label} className="glass-card rounded-xl p-4 panel-blue">
              <p className="font-heading font-700 text-sm text-[#0D1117] mb-1">{icon} {label}</p>
              <p className="text-sm text-[#4A5260] leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>

        <section className="fade-section fade-delay-3 space-y-4">
          <h2 className="font-heading font-700 text-xl text-[#0D1117]">The Luck Component</h2>
          <div className="bg-[#FEF0EF] border border-red/20 rounded-xl p-4">
            <p className="text-sm text-[#0D1117] leading-relaxed">
              The model uses σ = 0.28 as the residual noise parameter. This means
              <strong> 45% of match variance is unexplained</strong> — encoded in random draws from the
              normal distribution. Every simulation is different. A 70% favourite loses 30% of the time.
              Japan beating Brazil is unlikely — but the model puts it at roughly 15%.
            </p>
          </div>
        </section>

        <section className="fade-section fade-delay-3 space-y-4">
          <h2 className="font-heading font-700 text-xl text-[#0D1117]">Klement&apos;s 2026 Call</h2>
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇳🇱</span>
              <div>
                <p className="font-heading font-800 text-xl text-[#0D1117]">Netherlands</p>
                <Tag variant="green">2026 Predicted Winner</Tag>
              </div>
            </div>
            <p className="text-sm text-[#4A5260] leading-relaxed">
              Klement&apos;s model projects the Netherlands to win their first World Cup —
              path through Morocco (R32), Canada (R16), France (QF), Argentina (SF),
              and Portugal in the final.
            </p>
            <div className="bg-red-soft border border-red/20 rounded-lg p-3 text-sm text-[#0D1117]">
              <strong className="text-red">⚡ Biggest upset:</strong> Japan defeat Brazil in the Round of 32.
            </div>
          </div>
        </section>

        <section className="fade-section fade-delay-3 space-y-3">
          <h2 className="font-heading font-700 text-xl text-[#0D1117]">References</h2>
          <div className="space-y-2 text-sm text-[#4A5260]">
            <p>Klement, J. (2026). <em>FIFA World Cup 2026 Predictions.</em> Panmure Liberum Research, 9 April 2026.</p>
            <p>Hoffmann, R., Ging, L.C. &amp; Ramasamy, B. (2002). The socioeconomic determinants of international soccer performance. <em>Journal of Applied Economics</em>, 5(2), 253–272.</p>
          </div>
        </section>

        <div className="fade-section pt-4 border-t border-[#E2E6EC] flex gap-3">
          <Btn href="/lookup" variant="primary">Try the predictor →</Btn>
          <Btn href="/mc" variant="default">Run simulations</Btn>
        </div>
      </div>
    </PageTransition>
  )
}
