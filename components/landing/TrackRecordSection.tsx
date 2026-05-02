'use client'
import { motion, type Variants } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Tag from '@/components/ui/Tag'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger: Variants = { visible: { transition: { staggerChildren: 0.08 } } }

const predictions = [
  { year: '2014', team: 'Germany', flag: '🇩🇪' },
  { year: '2018', team: 'France',  flag: '🇫🇷' },
  { year: '2022', team: 'Argentina', flag: '🇦🇷' },
]

export default function TrackRecordSection() {
  return (
    <section className="bg-[#F4F6F9] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-8"
        >
          <SectionLabel>Klement&apos;s Track Record</SectionLabel>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {predictions.map(({ year, team, flag }) => (
            <motion.div key={year} variants={fadeUp} className="glass-card rounded-2xl p-6 text-center">
              <span className="text-5xl block mb-3">{flag}</span>
              <p className="text-xs text-[#8892A0] font-medium mb-1">{year}</p>
              <p className="font-heading font-800 text-xl text-[#0D1117] mb-2">{team}</p>
              <Tag variant="green">Predicted ✓</Tag>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-heading text-lg italic text-[#4A5260]">
            &ldquo;I built this model to prove econometrics can&apos;t predict football. Then it did.&rdquo;
          </p>
          <footer className="mt-2 text-sm text-[#8892A0]">— Joachim Klement, Panmure Liberum</footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
