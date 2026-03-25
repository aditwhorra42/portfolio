'use client'

import { useEffect, useState } from 'react'

import { ChevronDown } from 'lucide-react'
import { TagPill } from '@/components/blog/TagPill'
import { imgSrc } from '@/lib/path'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const researchInterests = [
  'AI For Social Impact',
  'ASR & Speech',
  'Indic Languages',
  'AI Safety',
]

const TYPING_TEXT = "Hi, I'm Adit!"
const TYPING_SPEED_MS = 75

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    let i = 0
    const typeNext = () => {
      if (i < TYPING_TEXT.length) {
        setDisplayedText(TYPING_TEXT.slice(0, i + 1))
        i++
        setTimeout(typeNext, TYPING_SPEED_MS)
      } else {
        setTypingDone(true)
      }
    }
    // Small delay so the element has faded in before typing starts
    const kickoff = setTimeout(typeNext, 600)
    return () => clearTimeout(kickoff)
  }, [])

  // Blink cursor: stop blinking after typing is done (keep it visible briefly then hide)
  useEffect(() => {
    if (!typingDone) return
    const hide = setTimeout(() => setShowCursor(false), 800)
    return () => clearTimeout(hide)
  }, [typingDone])

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-brand-bg to-brand-bg-muted dark:from-brand-bg-dark dark:to-brand-bg-muted-dark pt-20 pb-16"
    >
      {/* Subtle decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-accent/5 dark:bg-brand-accent-dark/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-accent/5 dark:bg-brand-accent-dark/5 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center md:items-center justify-center gap-12 md:gap-16 lg:gap-20"
        >
          {/* ── Left column: oval portrait ── */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[26rem]">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-[50%] ring-2 ring-brand-accent/25 dark:ring-brand-accent-dark/25 scale-105" />
              {/* relative here so next/image fill clips inside the oval */}
              <div
                className="relative w-full h-full overflow-hidden rounded-[50%] bg-brand-bg-muted dark:bg-brand-bg-muted-dark"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
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

          {/* ── Right column: name, bio, pills ── */}
          <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left flex-1 max-w-2xl">

            {/* Name — typing animation */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl font-bold text-brand-text dark:text-brand-text-dark leading-none tracking-tight"
            >
              {displayedText}
              <span
                aria-hidden="true"
                className={`inline-block w-[3px] h-[0.85em] bg-brand-accent dark:bg-brand-accent-dark align-middle ml-1 rounded-sm transition-opacity duration-300 ${showCursor ? 'opacity-100 animate-pulse' : 'opacity-0'
                  }`}
              />
            </motion.h1>

            {/* Bio paragraphs — stagger in after typing finishes */}
            <motion.div
              initial="hidden"
              animate={typingDone ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
              className="flex flex-col gap-3 text-brand-text-sec dark:text-brand-text-sec-dark leading-relaxed text-base sm:text-lg max-w-xl"
            >
              <motion.p variants={itemVariants}>
                I&apos;m an AI researcher and engineer building systems that create real-world impact. I have worked across climate modeling, animal welfare, and legal tech, all connected by one goal: applying AI to deliver tangible, positive change.
              </motion.p>
              <motion.p variants={itemVariants}>
                I&apos;m currently at{' '}
                <a href="https://www.wadhwaniai.org/" target="_blank" rel="noopener noreferrer" className="text-brand-accent dark:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark rounded px-0.5 transition-colors duration-150">Wadhwani AI</a>
                , India&apos;s largest AI for Social Good research organisation, working on ASR models for Indic languages and contributing to{' '}
                <a href="https://www.wadhwaniai.org/impact/education-solutions/oral-reading-fluency/" target="_blank" rel="noopener noreferrer" className="text-brand-accent dark:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark rounded px-0.5 transition-colors duration-150">tools</a>
                {' '}that measure reading fluency for children at scale across India. I hold an MSc from TU Delft, supervised by{' '}
                <a href="https://sites.google.com/site/elvinisufihp/" target="_blank" rel="noopener noreferrer" className="text-brand-accent dark:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark rounded px-0.5 transition-colors duration-150">Dr. Elvin Isufi</a>
                , a BSc from Ashoka University, and have published at IJCAI.
              </motion.p>
              <motion.p variants={itemVariants}>
                Beyond research, I build things to solve problems I see around me and write about how I approach them from scratch: the thinking, the iteration, and what actually works. The gap between what is possible and what you can build is shrinking fast, and I think that changes what any of us can do about the problems we care about.
              </motion.p>
              <motion.p variants={itemVariants}>
                Outside of AI, I think a lot about geopolitics, personal finance, and mental and physical well-being.
              </motion.p>
            </motion.div>

            {/* Research interest pills — appear after bio */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.65, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-2 w-full"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted dark:text-brand-text-muted-dark">
                Research Interests
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

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-brand-text-muted dark:text-brand-text-muted-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
