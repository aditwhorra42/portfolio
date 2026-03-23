import { HeroSection } from '@/components/home/HeroSection'
import { LatestAnnouncements } from '@/components/home/LatestAnnouncements'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { LatestBlogPreview } from '@/components/home/LatestBlogPreview'
import { BookshelfSection } from '@/components/home/BookshelfSection'
import { PROJECTS } from '@/lib/projects'
import { getAllPosts } from '@/lib/mdx'

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4)
  const latestPosts = getAllPosts().slice(0, 4)

  return (
    <>
      <HeroSection />
      <LatestAnnouncements />
      <FeaturedProjects projects={featuredProjects} />
      <LatestBlogPreview posts={latestPosts} />
      <BookshelfSection />
    </>
  )
}
