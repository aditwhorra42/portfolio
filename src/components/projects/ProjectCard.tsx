'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Github, ExternalLink, FileText, BookOpen,
  Brain, Shield, Eye, Network, Target, Leaf,
  Code2, MessageSquare, ChevronDown, ChevronUp,
} from 'lucide-react'
import { Project, ProjectLink } from '@/types/project'
import { TagPill } from '@/components/blog/TagPill'
import { imgSrc } from '@/lib/path'

// ── Icon per project ──────────────────────────────────────────────────────────
function placeholderIcon(project: Project) {
  const tag = (project.tags[0] ?? '').toLowerCase()
  const sz = 34
  if (project.category === 'personal')                              return <Code2 size={sz} />
  if (tag.includes('climate'))                                      return <Leaf size={sz} />
  if (tag.includes('safety') || tag.includes('verification'))      return <Shield size={sz} />
  if (tag.includes('vision') || tag.includes('art'))               return <Eye size={sz} />
  if (tag.includes('graph') || tag.includes('spatio'))             return <Network size={sz} />
  if (tag.includes('reinforcement') || tag.includes('formal'))     return <Target size={sz} />
  if (tag.includes('nlp') || tag.includes('legal') || tag.includes('few-shot')) return <MessageSquare size={sz} />
  return <Brain size={sz} />
}

// ── Placeholder header ────────────────────────────────────────────────────────
function ProjectPlaceholder({ project }: { project: Project }) {
  const uid = project.name.replace(/\s+/g, '-').toLowerCase()
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-brand-bg-muted to-brand-bg-card dark:from-[#1e1a17] dark:to-[#2a2420]">
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`dots-${uid}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${uid})`} className="text-brand-text dark:text-brand-text-dark" />
      </svg>
      <div className="relative z-10 text-brand-text-muted dark:text-brand-text-muted-dark opacity-35">
        {placeholderIcon(project)}
      </div>
    </div>
  )
}

// ── Link icon ─────────────────────────────────────────────────────────────────
function linkIcon(label: string) {
  const l = label.toLowerCase()
  if (l === 'code')                                          return <Github size={13} />
  if (l === 'paper' || l === 'poster' || l === 'report' || l === 'thesis') return <FileText size={13} />
  if (l === 'demo' || l === 'site')                         return <ExternalLink size={13} />
  return <BookOpen size={13} />
}

function LinkButton({ link }: { link: ProjectLink }) {
  if (link.url === '#') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-text-muted dark:text-brand-text-muted-dark px-2.5 py-1 rounded-full border border-brand-bg-muted dark:border-brand-bg-muted-dark">
        {linkIcon(link.label)}
        {link.label} (coming soon)
      </span>
    )
  }
  // Prepend basePath for internal file links (e.g. /files/SDCGAN.pdf)
  const href = link.url.startsWith('/') ? imgSrc(link.url) : link.url
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-accent dark:text-brand-accent-dark hover:text-brand-accent-hover dark:hover:text-brand-accent-hover-dark px-2.5 py-1 rounded-full border border-brand-accent/30 dark:border-brand-accent-dark/30 hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark transition-colors duration-150"
    >
      {linkIcon(link.label)}
      {link.label}
    </a>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function ProjectCard({
  project,
  variant = 'full',
}: {
  project: Project
  variant?: 'full' | 'preview'
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      layout
      whileHover={expanded ? {} : { scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-brand-bg-muted dark:border-brand-bg-muted-dark bg-brand-bg-card dark:bg-brand-bg-card-dark shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image / Placeholder */}
      <div className="relative h-52 overflow-hidden shrink-0">
        {project.image ? (
          <img
            src={imgSrc(project.image!)}
            alt={project.name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <ProjectPlaceholder project={project} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        {/* Tags at bottom-left */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagPill key={tag} label={tag} variant="white" />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5">
        <h3 className="font-serif font-bold text-lg text-brand-text dark:text-brand-text-dark leading-snug">
          {project.name}
        </h3>

        {/* Description with clamp + expand */}
        <div>
          <p className={`text-sm text-brand-text-sec dark:text-brand-text-sec-dark leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
            {project.description}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-accent dark:text-brand-accent-dark hover:text-brand-accent-hover dark:hover:text-brand-accent-hover-dark transition-colors duration-150"
          >
            {expanded ? (
              <><ChevronUp size={13} /> Show less</>
            ) : (
              <><ChevronDown size={13} /> Read more</>
            )}
          </button>
        </div>

        {/* Links */}
        {project.links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-brand-bg-muted dark:border-brand-bg-muted-dark">
            {project.links.map((link) => (
              <LinkButton key={link.label} link={link} />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
