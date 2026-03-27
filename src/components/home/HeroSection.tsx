'use client'

import { ChevronDown } from 'lucide-react'
import { TagPill } from '@/components/blog/TagPill'
import { imgSrc } from '@/lib/path'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const researchInterests = [
  'AI for Social Impact',
  'ASR & Speech',
  'AI Safety',
  'Building with AI',
  'AI for Productivity',
]

export function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-brand-bg dark:bg-brand-bg-dark pt-14 pb-16"
    >
      {/* Very subtle background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(193,127,89,0.06),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,149,106,0.05),transparent)] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center md:items-center justify-center gap-12 md:gap-16 lg:gap-24"
        >
          {/* Portrait */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-[22rem]">
              <div
                className="relative w-full h-full overflow-hidden rounded-2xl bg-brand-bg-muted dark:bg-brand-bg-muted-dark"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc('/images/avatar.jpg')}
                  alt="Adit Whorra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left flex-1 max-w-2xl">

            {/* Role label */}
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-widest text-brand-accent dark:text-brand-accent-dark"
            >
              AI Researcher & Engineer
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl font-bold text-brand-text dark:text-brand-text-dark leading-none tracking-tight"
            >
              Adit Whorra
            </motion.h1>

            {/* Bio */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-3 text-brand-text-sec dark:text-brand-text-sec-dark leading-relaxed text-base max-w-xl"
            >
              <motion.p variants={itemVariants}>
                I&apos;m an AI researcher and engineer building systems that create real-world impact. I have worked across climate modeling, animal welfare, and legal tech, all connected by one goal: applying AI to deliver tangible, positive change.
              </motion.p>
              <motion.p variants={itemVariants}>
                I&apos;m currently at{' '}
                <a href="https://www.wadhwaniai.org/" target="_blank" rel="noopener noreferrer" className="text-brand-accent dark:text-brand-accent-dark hover:underline underline-offset-2 transition-colors duration-150">Wadhwani AI</a>
                , India&apos;s largest AI for Social Good research organisation. I work on ASR models for Indic languages and contribute to{' '}
                <a href="https://www.wadhwaniai.org/impact/education-solutions/oral-reading-fluency/" target="_blank" rel="noopener noreferrer" className="text-brand-accent dark:text-brand-accent-dark hover:underline underline-offset-2 transition-colors duration-150">tools</a>
                {' '}that measure reading fluency for children at scale across India, helping millions become better readers. I hold an MSc in AI from TU Delft (Netherlands), supervised by{' '}
                <a href="https://sites.google.com/site/elvinisufihp/" target="_blank" rel="noopener noreferrer" className="text-brand-accent dark:text-brand-accent-dark hover:underline underline-offset-2 transition-colors duration-150">Dr. Elvin Isufi</a>
                , and a BSc from Ashoka University (India).
              </motion.p>
              <motion.p variants={itemVariants}>
                Beyond research, I build things to solve problems I see around me and write about the process. The gap between ideas and execution is shrinking fast and that changes what any of us can do about the problems we care about.
              </motion.p>
              <motion.p variants={itemVariants}>
                Outside of AI, I care about personal finance, building good habits, and mental and physical well-being.
              </motion.p>
            </motion.div>

            {/* Interests */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2.5 w-full"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted dark:text-brand-text-muted-dark">
                Interests
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {researchInterests.map((interest) => (
                  <TagPill key={interest} label={interest} variant="accent" />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-brand-text-muted dark:text-brand-text-muted-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
