'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Project, ProjectCategory } from '@/types/project'

const TABS: { label: string; value: ProjectCategory }[] = [
  { label: 'Research', value: 'research' },
  { label: 'Personal', value: 'personal' },
]

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>('research')

  const filtered = projects.filter((p) => p.category === active)

  return (
    <>
      {/* Toggle pill */}
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-brand-bg-muted dark:bg-brand-bg-muted-dark border border-brand-bg-muted dark:border-brand-bg-muted-dark mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className="relative px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            {/* Sliding active indicator */}
            {active === tab.value && (
              <motion.span
                layoutId="projects-tab-indicator"
                className="absolute inset-0 rounded-full bg-brand-bg dark:bg-brand-bg-dark shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-150 ${
                active === tab.value
                  ? 'text-brand-accent dark:text-brand-accent-dark'
                  : 'text-brand-text-muted dark:text-brand-text-muted-dark hover:text-brand-text dark:hover:text-brand-text-dark'
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))
          ) : (
            <p className="col-span-2 text-brand-text-muted dark:text-brand-text-muted-dark text-sm py-8">
              No projects here yet — check back soon.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
