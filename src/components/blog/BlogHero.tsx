'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Calendar, Clock } from 'lucide-react'
import { TagPill } from './TagPill'

interface BlogHeroProps {
  title: string
  date: string
  readingTime: string
  tags: string[]
  heroImage?: string
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogHero({ title, date, readingTime, tags, heroImage }: BlogHeroProps) {
  return (
    <div
      className="relative w-full h-screen min-h-[500px] flex items-end overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C1A0E, #5C4033)',
        ...(heroImage
          ? {
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : {}),
      }}
    >
      {/* Dark gradient overlay: bottom-up */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Content at bottom-left */}
      <motion.div
        className="relative z-10 max-w-3xl px-6 sm:px-10 lg:px-16 pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <TagPill key={tag} label={tag} variant="white" />
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {readingTime}
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </div>
    </div>
  )
}
