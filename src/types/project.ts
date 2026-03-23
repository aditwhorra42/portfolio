export type ProjectCategory = 'research' | 'personal'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  name: string
  description: string
  tags: string[]
  links: ProjectLink[]
  featured: boolean
  category: ProjectCategory
  image?: string
}
