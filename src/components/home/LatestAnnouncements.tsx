'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ANNOUNCEMENTS } from '@/lib/announcements'

const INITIAL_COUNT = 3

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const expandItemVariants = {
  hidden: { opacity: 0, height: 0, marginBottom: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    marginBottom: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

function parseYear(date: string): number {
  const match = date.match(/\d{4}/)
  return match ? parseInt(match[0], 10) : 0
}

function AnnouncementCard({ item }: { item: (typeof ANNOUNCEMENTS)[number] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 p-5 rounded-lg bg-brand-bg-card dark:bg-brand-bg-card-dark border border-brand-bg-muted dark:border-brand-bg-muted-dark hover:border-brand-accent/20 dark:hover:border-brand-accent-dark/20 transition-all duration-200">
      {/* Date badge */}
      <span className="shrink-0 inline-flex items-center text-xs font-medium text-brand-accent dark:text-brand-accent-dark whitespace-nowrap self-start mt-1 min-w-[110px]">
        {item.date}
      </span>

      {/* Content */}
      <div className="flex flex-col gap-1 min-w-0">
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition-colors duration-200 group"
          >
            {item.headline}
            <ExternalLink
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            />
          </a>
        ) : (
          <p className="font-semibold text-brand-text dark:text-brand-text-dark">
            {item.headline}
          </p>
        )}
        <p className="text-sm text-brand-text-muted dark:text-brand-text-muted-dark leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export function LatestAnnouncements() {
  // Derive sorted unique years
  const years = useMemo(() => {
    const ys = Array.from(new Set(ANNOUNCEMENTS.map((a) => parseYear(a.date))))
    return ys.sort((a, b) => b - a) // newest first
  }, [])

  // Default: current year if it has data, else most recent year with data
  const currentYear = new Date().getFullYear()
  const defaultYear = years.includes(currentYear) ? currentYear : years[0]

  const [selectedYear, setSelectedYear] = useState<number | 'all'>(defaultYear)
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(() => {
    if (selectedYear === 'all') return ANNOUNCEMENTS
    return ANNOUNCEMENTS.filter((a) => parseYear(a.date) === selectedYear)
  }, [selectedYear])

  const visible = filtered.slice(0, INITIAL_COUNT)
  const hidden = filtered.slice(INITIAL_COUNT)
  const hasMore = hidden.length > 0

  function handleYearChange(year: number | 'all') {
    setSelectedYear(year)
    setExpanded(false)
  }

  return (
    <section
      id="announcements"
      className="py-24 bg-brand-bg-muted dark:bg-brand-bg-muted-dark"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Latest News"
          subtitle="Recent milestones, publications, and career updates."
        />

        {/* Year filter tabs */}
        <div className="flex items-center gap-5 border-b border-brand-bg-muted dark:border-brand-bg-muted-dark mb-8">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`pb-3 text-sm font-medium transition-colors duration-150 relative ${
                selectedYear === year
                  ? 'text-brand-text dark:text-brand-text-dark'
                  : 'text-brand-text-muted dark:text-brand-text-muted-dark hover:text-brand-text-sec dark:hover:text-brand-text-sec-dark'
              }`}
            >
              {year}
              {selectedYear === year && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent dark:bg-brand-accent-dark" />
              )}
            </button>
          ))}
          <button
            onClick={() => handleYearChange('all')}
            className={`pb-3 text-sm font-medium transition-colors duration-150 relative ${
              selectedYear === 'all'
                ? 'text-brand-text dark:text-brand-text-dark'
                : 'text-brand-text-muted dark:text-brand-text-muted-dark hover:text-brand-text-sec dark:hover:text-brand-text-sec-dark'
            }`}
          >
            All
            {selectedYear === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent dark:bg-brand-accent-dark" />
            )}
          </button>
        </div>

        {/* Announcements list */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={String(selectedYear)}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {visible.length === 0 ? (
              <motion.li variants={itemVariants}>
                <p className="text-sm text-brand-text-muted dark:text-brand-text-muted-dark py-4 text-center">
                  No announcements for {selectedYear} yet.
                </p>
              </motion.li>
            ) : (
              visible.map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <AnnouncementCard item={item} />
                </motion.li>
              ))
            )}
          </motion.ul>
        </AnimatePresence>

        {/* Expandable extra items */}
        {hasMore && (
          <>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  key="extra"
                  variants={expandItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-4 mt-4 overflow-hidden"
                >
                  {hidden.map((item, index) => (
                    <li key={index}>
                      <AnnouncementCard item={item} />
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border border-brand-accent/30 dark:border-brand-accent-dark/30 text-brand-accent dark:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark transition-all duration-200"
              >
                {expanded ? (
                  <>Show less <ChevronUp size={16} /></>
                ) : (
                  <>Show {hidden.length} more <ChevronDown size={16} /></>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
