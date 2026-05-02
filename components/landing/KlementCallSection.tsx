'use client'
import { motion, type Variants } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Btn from '@/components/ui/Btn'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function KlementCallSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#F4F6F9] rounded-3xl p-10 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <SectionLabel>The 2026 Prediction</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="font-heading font-800 text-3xl md:text-4xl text-[#0D1117] mt-2 mb-4"
          >
            The model says:{' '}
            <span className="hl-green">Netherlands.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.10 }}
            className="text-[#4A5260] max-w-xl mx-auto mb-6 leading-relaxed"
          >
            For the first time in their history, the Netherlands are projected to lift the trophy.
            The model gives them a path through Morocco, Canada, France, and — in the final — Portugal.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.20 }}
            className="max-w-lg mx-auto bg-red-soft border border-red/20 rounded-xl p-4 mb-6 text-left"
          >
            <p className="text-sm text-[#0D1117] leading-relaxed">
              <span className="font-semibold text-red">⚡ Biggest upset:</span>{' '}
              Japan defeat Brazil in the Round of 32 — one of the most shocking results
              in World Cup history, according to the model.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.26 }}
            className="space-y-3"
          >
            <p className="text-xs text-[#8892A0] max-w-md mx-auto">
              This is a probabilistic forecast, not a guarantee. With 45% randomness built in,
              every simulation can produce a different winner.
            </p>
            <Btn href="/mc" variant="default" size="md">
              Run 1,000 simulations →
            </Btn>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
