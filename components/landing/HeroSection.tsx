'use client'
import { motion, type Variants } from 'framer-motion'
import HeroBanner from '@/components/ui/HeroBanner'
import Btn from '@/components/ui/Btn'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading font-800 text-4xl md:text-5xl leading-tight text-[#0D1117]"
          >
            Who wins the{' '}
            <span className="hl">2026 World Cup?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.06 }}
            className="text-lg text-[#4A5260] leading-relaxed"
          >
            An econometric model that called 2014, 2018 and 2022 correctly —
            now running on all 48 teams.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
          >
            <Btn href="/lookup" variant="primary" size="lg">
              Predict a Match →
            </Btn>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.18 }}
            className="flex flex-wrap gap-4 text-xs text-[#8892A0]"
          >
            {[
              '3 correct predictions',
              '48 teams',
              'R²≈0.55',
              'No score guessing',
            ].map(item => (
              <span key={item} className="flex items-center gap-1">
                <span className="text-green font-semibold">✓</span> {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <HeroBanner />
        </motion.div>
      </div>
    </section>
  )
}
