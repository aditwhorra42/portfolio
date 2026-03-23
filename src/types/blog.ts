export interface BlogFrontmatter {
  title: string
  date: string
  excerpt: string
  heroImage: string
  tags: string[]
  published: boolean
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  heroImage: string
  tags: string[]
  readingTime: string
  published: boolean
}
