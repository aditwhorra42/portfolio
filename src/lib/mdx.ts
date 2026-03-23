import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost, BlogFrontmatter } from '@/types/blog'

const contentDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

function ensureDirectoryExists(): boolean {
  try {
    return fs.existsSync(contentDirectory)
  } catch {
    return false
  }
}

export function getAllPosts(): BlogPost[] {
  if (!ensureDirectoryExists()) {
    return []
  }

  try {
    const files = fs.readdirSync(contentDirectory)
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

    const posts = mdxFiles
      .map((filename) => {
        const slug = filename.replace(/\.mdx$/, '')
        const filePath = path.join(contentDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const frontmatter = data as BlogFrontmatter
        const stats = readingTime(content)

        return {
          slug,
          title: frontmatter.title,
          date: frontmatter.date,
          excerpt: frontmatter.excerpt,
          heroImage: frontmatter.heroImage,
          tags: frontmatter.tags || [],
          readingTime: stats.text,
          published: frontmatter.published,
        } as BlogPost
      })
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch {
    return []
  }
}

export function getPostBySlug(slug: string): {
  frontmatter: BlogFrontmatter
  content: string
} | null {
  if (!ensureDirectoryExists()) {
    return null
  }

  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      frontmatter: data as BlogFrontmatter,
      content,
    }
  } catch {
    return null
  }
}
