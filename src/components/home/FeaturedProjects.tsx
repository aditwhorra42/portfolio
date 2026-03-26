'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Project } from '@/types/project'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface FeaturedProjectsProps {
  projects: Project[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      id="projects-preview"
      className="py-24 bg-brand-bg-muted dark:bg-brand-bg-muted-dark"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Selected work spanning research, industry, and open-source."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
        >
          {projects.map((project, i) => (
            <motion.div key={project.name} variants={itemVariants} className={`h-full${i >= 2 ? ' hidden sm:block' : ''}`}>
              <ProjectCard project={project} variant="preview" />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-brand-accent dark:text-brand-accent-dark font-medium hover:text-brand-accent-hover dark:hover:text-brand-accent-hover-dark transition-colors duration-200 group"
          >
            View All Projects
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
