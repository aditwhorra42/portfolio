'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Calendar, BookOpen } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { TagPill } from './TagPill'
import { imgSrc } from '@/lib/path'

interface BlogCardProps {
  post: BlogPost
  variant?: 'full' | 'compact'
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-brand-bg-muted to-brand-bg-card dark:from-[#1e1a17] dark:to-[#2a2420]">
      {/* Dot grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" className="text-brand-text dark:text-brand-text-dark" />
      </svg>
      <BookOpen size={36} className="text-brand-text-muted dark:text-brand-text-muted-dark opacity-40 relative z-10" />
      <p className="relative z-10 text-xs font-medium text-brand-text-muted dark:text-brand-text-muted-dark opacity-50 text-center px-8 line-clamp-2 leading-relaxed max-w-[200px]">
        {title}
      </p>
    </div>
  )
}

export function BlogCard({ post, variant = 'full' }: BlogCardProps) {
  if (variant === 'compact') {
    return (
      <motion.article
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="flex gap-4 p-4 rounded-xl border border-brand-bg-muted dark:border-brand-bg-muted-dark bg-brand-bg-card dark:bg-brand-bg-card-dark hover:border-brand-accent/30 dark:hover:border-brand-accent-dark/30 hover:shadow-md transition-all duration-200"
        >
          {/* Small image */}
          <div className="relative shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-brand-bg-muted dark:bg-brand-bg-muted-dark">
            {post.heroImage ? (
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${imgSrc(post.heroImage!)})` }}
              />
            ) : (
              <ImagePlaceholder title={post.title} />
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="font-serif font-bold text-brand-text dark:text-brand-text-dark group-hover:text-brand-accent dark:group-hover:text-brand-accent-dark transition-colors duration-200 line-clamp-2 text-base leading-snug">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-brand-text-muted dark:text-brand-text-muted-dark">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readingTime}
              </span>
            </div>
            <p className="text-xs text-brand-text-muted dark:text-brand-text-muted-dark line-clamp-2 leading-relaxed mt-1">
              {post.excerpt}
            </p>
          </div>
        </Link>
      </motion.article>
    )
  }

  // Full variant
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-brand-bg-muted dark:border-brand-bg-muted-dark bg-brand-bg-card dark:bg-brand-bg-card-dark shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Hero image */}
        <div className="relative h-52 overflow-hidden">
          {post.heroImage ? (
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${imgSrc(post.heroImage!)})` }}
            />
          ) : (
            <ImagePlaceholder title={post.title} />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Tags overlaid at bottom-left */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <TagPill key={tag} label={tag} variant="white" />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <h3 className="font-serif font-bold text-lg text-brand-text dark:text-brand-text-dark group-hover:text-brand-accent dark:group-hover:text-brand-accent-dark transition-colors duration-200 leading-snug line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-4 text-xs text-brand-text-muted dark:text-brand-text-muted-dark">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readingTime}
            </span>
          </div>
          <p className="text-sm text-brand-text-muted dark:text-brand-text-muted-dark leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
