import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    <footer className="border-t border-brand-bg-muted dark:border-brand-bg-muted-dark bg-brand-bg dark:bg-brand-bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <SocialLinks size="md" />
          <p className="text-sm text-brand-text-muted dark:text-brand-text-muted-dark">
            New Delhi, India
          </p>
          <p className="text-sm text-brand-text-muted dark:text-brand-text-muted-dark">
            &copy; {new Date().getFullYear()}{' '}Adit Whorra &middot; Built with Next.js &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
