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
      {/* Category tabs */}
      <div className="flex items-center gap-6 border-b border-brand-bg-muted dark:border-brand-bg-muted-dark mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`relative pb-3 text-sm font-medium transition-colors duration-150 focus:outline-none ${
              active === tab.value
                ? 'text-brand-text dark:text-brand-text-dark'
                : 'text-brand-text-muted dark:text-brand-text-muted-dark hover:text-brand-text-sec dark:hover:text-brand-text-sec-dark'
            }`}
          >
            {tab.label}
            {active === tab.value && (
              <motion.span
                layoutId="projects-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent dark:bg-brand-accent-dark"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
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
