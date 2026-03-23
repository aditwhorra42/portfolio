'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BOOKS, type Book, type BookStatus } from '@/lib/books'
import { SectionHeading } from '@/components/ui/SectionHeading'

const STATUS_LABEL: Record<BookStatus, string> = {
  reading: 'Reading now',
  read: 'Finished',
  want: 'Want to read',
}

const STATUS_COLORS: Record<BookStatus, string> = {
  reading: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  read: 'bg-brand-accent-light dark:bg-brand-accent-light-dark text-brand-accent dark:text-brand-accent-dark',
  want: 'bg-brand-bg-muted dark:bg-brand-bg-muted-dark text-brand-text-muted dark:text-brand-text-muted-dark',
}

/* ── Tooltip ── */
function BookTooltip({ book, x, y }: { book: Book; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
      transition={{ duration: 0.14, ease: 'easeOut' }}
      className="fixed z-[9999] w-60 pointer-events-none"
      style={{ left: x, top: y, transform: 'translate(-50%, calc(-100% - 12px))' }}
    >
      <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl p-3.5 flex flex-col gap-2.5">
        <div className="flex items-start gap-3">
          {/* Mini book cover */}
          <div
            className="flex-shrink-0 w-8 h-11 rounded-[3px] shadow-md relative overflow-hidden"
            style={{ backgroundColor: book.color }}
          >
            {/* spine highlight on cover */}
            <div className="absolute inset-y-0 left-0 w-1.5 bg-white/15" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-brand-text dark:text-brand-text-dark leading-snug">
              {book.title}
            </p>
            <p className="text-[11px] text-brand-text-muted dark:text-brand-text-muted-dark mt-0.5">
              {book.author}
            </p>
          </div>
        </div>
        {book.note && (
          <p className="text-[11px] text-brand-text-sec dark:text-brand-text-sec-dark leading-snug italic border-t border-zinc-100 dark:border-zinc-700 pt-2">
            {book.note}
          </p>
        )}
        <span className={`self-start inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_COLORS[book.status]}`}>
          {STATUS_LABEL[book.status]}
        </span>
      </div>
    </motion.div>
  )
}

/* ── Spine ── */
function Spine({
  book,
  index,
  onHover,
}: {
  book: Book
  index: number
  onHover: (book: Book | null, x?: number, y?: number) => void
}) {
  // Height based on title length; width gives the book some variation in "thickness"
  const spineHeight = Math.max(140, Math.min(book.title.length * 9 + 60, 240))
  const spineWidth = book.title.length > 30 ? 46 : book.title.length > 18 ? 42 : 38

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onHover(book, rect.left + rect.width / 2, rect.top - 4)
  }, [book, onHover])

  const handleMouseLeave = useCallback(() => onHover(null), [onHover])

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.03, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -12, transition: { duration: 0.18, ease: 'easeOut' } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 self-end cursor-default select-none"
      style={{
        width: `${spineWidth}px`,
        height: `${spineHeight}px`,
        backgroundColor: book.color,
        borderRadius: '2px 2px 1px 1px',
        // Drop shadow for depth
        boxShadow: '3px 3px 8px rgba(0,0,0,0.25), 1px 0 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Left binding highlight — simulates rounded spine */}
      <div
        className="absolute inset-y-0 left-0 w-[5px] rounded-tl-sm"
        style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.22), rgba(255,255,255,0))' }}
      />

      {/* Right shadow edge */}
      <div
        className="absolute inset-y-0 right-0 w-[4px]"
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.25), rgba(0,0,0,0))' }}
      />

      {/* Top cap (headband) */}
      <div
        className="absolute top-0 left-0 right-0 h-[6px] rounded-t-sm"
        style={{ background: 'rgba(0,0,0,0.18)' }}
      />

      {/* Bottom cap */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[4px]"
        style={{ background: 'rgba(0,0,0,0.15)' }}
      />

      {/* Title — vertical, bottom to top */}
      <div
        className="absolute inset-x-0 overflow-hidden flex items-center justify-center"
        style={{
          top: '10px',
          bottom: '8px',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
        }}
      >
        <span
          className="text-white/90 font-medium leading-tight text-center"
          style={{
            fontSize: '10px',
            padding: '4px 2px',
            wordBreak: 'break-word',
            maxHeight: '96%',
          }}
        >
          {book.title}
        </span>
      </div>

      {/* Reading-now dot on top cap */}
      {book.status === 'reading' && (
        <span className="absolute top-[1px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-sm" />
      )}
    </motion.div>
  )
}

/* ── Main section ── */
export function BookshelfSection() {
  const [tooltip, setTooltip] = useState<{ book: Book; x: number; y: number } | null>(null)

  const handleHover = useCallback((book: Book | null, x?: number, y?: number) => {
    if (book && x !== undefined && y !== undefined) {
      setTooltip({ book, x, y })
    } else {
      setTooltip(null)
    }
  }, [])

  return (
    <section className="py-20 bg-brand-bg dark:bg-brand-bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="On My Shelf"
          subtitle="Books I've read, am reading, and want to read."
        />

        <div className="mt-10">
          {/* Scrollable shelf row */}
          <div className="overflow-x-auto pb-1">
            <div className="flex items-end gap-[3px] px-2 min-w-max">
              {BOOKS.map((book, i) => (
                <Spine key={book.title} book={book} index={i} onHover={handleHover} />
              ))}
            </div>
          </div>

          {/* Shelf plank — wood-like */}
          <div
            className="h-5 rounded-b-sm"
            style={{
              background: 'linear-gradient(to bottom, #b5936a, #9a7a56)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              borderTop: '2px solid rgba(255,255,255,0.15)',
            }}
          />
          {/* Shelf underside shadow */}
          <div
            className="h-2 rounded-b-sm"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)' }}
          />
        </div>
      </div>

      {/* Tooltip outside overflow container */}
      <AnimatePresence>
        {tooltip && (
          <BookTooltip key={tooltip.book.title} book={tooltip.book} x={tooltip.x} y={tooltip.y} />
        )}
      </AnimatePresence>
    </section>
  )
}
