'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface LatestBlogPreviewProps {
  posts: BlogPost[]
}

export function LatestBlogPreview({ posts }: LatestBlogPreviewProps) {
  return (
    <section
      id="blog-preview"
      className="py-24 bg-brand-bg dark:bg-brand-bg-dark"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Latest Writing"
          subtitle="Thoughts on AI, research, and building things that matter. These are older posts, but more are on the way."
        />

        {posts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} variant="full" />
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-text-muted dark:text-brand-text-muted-dark mb-10"
          >
            No posts yet — coming soon.
          </motion.p>
        )}

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-accent dark:text-brand-accent-dark font-medium hover:text-brand-accent-hover dark:hover:text-brand-accent-hover-dark transition-colors duration-200 group"
          >
            Read All Posts
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
