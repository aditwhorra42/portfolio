import { getAllPosts } from '@/lib/mdx'
import { BlogCard } from '@/components/blog/BlogCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const metadata = {
  title: 'Writing — Adit Whorra',
  description:
    'Thoughts on AI research, machine learning, and building technology for social impact.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-bg-dark pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeading
            title="Writing"
            subtitle="Thoughts on AI research, machine learning, and building technology for social impact."
            align="left"
          />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-brand-text-muted dark:text-brand-text-muted-dark mb-3">
              Posts coming soon
            </p>
            <p className="text-brand-text-muted dark:text-brand-text-muted-dark">
              Check back shortly for the first article.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} variant="full" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
