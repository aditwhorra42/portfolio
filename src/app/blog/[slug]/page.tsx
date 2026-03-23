import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { BlogHero } from '@/components/blog/BlogHero'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const result = getPostBySlug(slug)
  if (!result) {
    return { title: 'Post Not Found — Adit Whorra' }
  }

  return {
    title: `${result.frontmatter.title} — Adit Whorra`,
    description: result.frontmatter.excerpt,
    openGraph: {
      title: result.frontmatter.title,
      description: result.frontmatter.excerpt,
      type: 'article',
      publishedTime: result.frontmatter.date,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const result = getPostBySlug(slug)

  if (!result) {
    notFound()
  }

  const { frontmatter, content } = result
  const stats = readingTime(content)

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
  })

  return (
    <article>
      <BlogHero
        title={frontmatter.title}
        date={frontmatter.date}
        readingTime={stats.text}
        tags={frontmatter.tags}
        heroImage={frontmatter.heroImage}
      />

      <div className="bg-brand-bg dark:bg-brand-bg-dark py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-brand-accent dark:prose-a:text-brand-accent-dark prose-blockquote:border-brand-accent dark:prose-blockquote:border-brand-accent-dark">
            {mdxContent}
          </div>
        </div>
      </div>
    </article>
  )
}
