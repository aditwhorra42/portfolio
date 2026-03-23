import { PROJECTS } from '@/lib/projects'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata = {
  title: 'Projects — Adit Whorra',
  description:
    'Research and personal projects across climate modeling, speech AI, computer vision, legal tech, and more.',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-bg-dark pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionHeading
            title="Projects"
            subtitle="Research work and personal builds. Toggle between them below."
            align="left"
          />
        </div>

        <ProjectsGrid projects={PROJECTS} />
      </div>
    </div>
  )
}
