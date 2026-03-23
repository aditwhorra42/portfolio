import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-bg-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-serif font-bold text-brand-accent dark:text-brand-accent-dark mb-4">
          404
        </p>
        <h1 className="text-2xl font-serif font-bold text-brand-text dark:text-brand-text-dark mb-3">
          Page not found
        </h1>
        <p className="text-brand-text-muted dark:text-brand-text-muted-dark mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white font-medium hover:opacity-90 transition-opacity duration-200"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
