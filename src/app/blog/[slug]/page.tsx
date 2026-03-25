import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { visit } from 'unist-util-visit'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { BlogHero } from '@/components/blog/BlogHero'

// Rehype plugin: prepend basePath to all local image src attributes at the AST
// level — runs before React rendering so it catches both markdown-generated
// and inline JSX <img> tags equally.
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/portfolio' : ''

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rehypePrefixImgSrc() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // 1. Regular rehype element nodes (from markdown ![]() syntax)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, 'element', (node: any) => {
      if (
        node.tagName === 'img' &&
        typeof node.properties?.src === 'string' &&
        node.properties.src.startsWith('/')
      ) {
        node.properties.src = BASE_PATH + node.properties.src
      }
    })

    // 2. MDX JSX element nodes (from inline <img /> JSX in MDX files)
    // These are represented as mdxJsxFlowElement / mdxJsxTextElement nodes,
    // NOT as regular rehype element nodes, so they need separate handling.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node: any) => {
      if (node.name === 'img' && Array.isArray(node.attributes)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const srcAttr = node.attributes.find((a: any) => a.name === 'src')
        if (srcAttr && typeof srcAttr.value === 'string' && srcAttr.value.startsWith('/')) {
          srcAttr.value = BASE_PATH + srcAttr.value
        }
      }
    })
  }
}

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
      mdxOptions: {
        rehypePlugins: [rehypePrefixImgSrc],
      },
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
