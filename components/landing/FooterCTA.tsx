'use client'
import { motion } from 'framer-motion'
import Btn from '@/components/ui/Btn'

export default function FooterCTA() {
  return (
    <section className="bg-[#F4F6F9] py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className="font-heading font-800 text-3xl text-[#0D1117]">
            Ready to run your own prediction?
          </h2>
          <p className="text-[#4A5260] max-w-md mx-auto">
            Pick any matchup from all 48 teams. The model runs in your browser —
            no data sent anywhere.
          </p>
          <Btn href="/lookup" variant="primary" size="lg">
            Predict a Match →
          </Btn>
        </motion.div>
      </div>
    </section>
  )
}
