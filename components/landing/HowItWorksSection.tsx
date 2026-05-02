'use client'
import { motion, type Variants } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger: Variants = { visible: { transition: { staggerChildren: 0.08 } } }

const factors = [
  { icon: '📊', label: 'FIFA Ranking',    weight: 0.45, desc: 'The most direct signal of current squad strength' },
  { icon: '💰', label: 'Wealth',          weight: 0.20, desc: 'Richer nations build better football infrastructure' },
  { icon: '🌡️', label: 'Climate',         weight: 0.15, desc: 'The best football nations share a climate — around 14°C' },
  { icon: '👥', label: 'Population',      weight: 0.15, desc: 'More players only matters where football is the religion' },
  { icon: '🏟️', label: 'Home Advantage', weight: 0.05, desc: 'Hosting helps — but less so when the tournament spans a continent' },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-2"
        >
          <SectionLabel>How the Model Works</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading font-800 text-2xl text-[#0D1117] mb-8"
        >
          Five factors. One number. One prediction.
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {factors.map(({ icon, label, weight, desc }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="glass-card rounded-xl p-4 flex items-center gap-4"
            >
              <span className="text-2xl w-8 text-center flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-heading font-700 text-sm text-[#0D1117]">{label}</span>
                  <span className="text-xs text-[#8892A0]">{(weight * 100).toFixed(0)}% weight</span>
                </div>
                <p className="text-xs text-[#4A5260] leading-relaxed">{desc}</p>
              </div>
              <div className="w-24 flex-shrink-0">
                <div className="h-2 bg-[#EFF1F5] rounded-full overflow-hidden">
                  <div className="h-full bg-blue rounded-full" style={{ width: `${weight * 100 * 2}%` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-xs text-[#8892A0] text-center"
        >
          Model explains 55% of variance between teams. The other 45% is luck — and it&apos;s built in.
        </motion.p>
      </div>
    </section>
  )
}
