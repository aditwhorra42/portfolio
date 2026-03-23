'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function CurrentWorkSection() {
  return (
    <section
      id="current-work"
      className="py-24 bg-brand-bg dark:bg-brand-bg-dark"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What I'm Working On" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="border-l-4 border-brand-accent dark:border-brand-accent-dark pl-6 py-2 flex flex-col gap-5">
            {/* Wadhwani AI */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-accent-light dark:bg-brand-accent-light-dark text-brand-accent dark:text-brand-accent-dark">
                  Wadhwani AI
                </span>
                <span className="text-xs text-brand-text-muted dark:text-brand-text-muted-dark">
                  New Delhi, India
                </span>
              </div>
              <p className="text-brand-text-sec dark:text-brand-text-sec-dark leading-relaxed">
                At <strong className="text-brand-text dark:text-brand-text-dark">Wadhwani AI</strong>, I&apos;m working on automatic speech recognition (ASR) and text-to-speech (TTS) systems for Indic languages, technology that most of the world&apos;s speech tools have overlooked. A key application is reading fluency assessment: building tools that help measure learning outcomes for children at scale across India.
              </p>
            </div>

            {/* HIPPO Lab */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-accent-light dark:bg-brand-accent-light-dark text-brand-accent dark:text-brand-accent-dark">
                  HIPPO Lab
                </span>
                <span className="text-xs text-brand-text-muted dark:text-brand-text-muted-dark">
                  TU Delft, Netherlands
                </span>
              </div>
              <p className="text-brand-text-sec dark:text-brand-text-sec-dark leading-relaxed">
                I&apos;m also continuing my affiliation with the <strong className="text-brand-text dark:text-brand-text-dark">HIPPO Lab at TU Delft</strong>, where our work on using multi-agent reinforcement learning to identify fair and equitable climate mitigation policies was presented at IJCAI 2025 in Montreal.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
