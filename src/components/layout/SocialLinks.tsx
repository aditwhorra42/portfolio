import { Linkedin, Github, GraduationCap, BookOpen } from 'lucide-react'

interface SocialLinksProps {
  size?: 'sm' | 'md'
  className?: string
}

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aditwhorra',
    icon: Linkedin,
  },
  {
    label: 'Medium',
    href: 'https://aditwhorra.medium.com/',
    icon: BookOpen,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/aditwhorra42',
    icon: Github,
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=33BkSpgAAAAJ&hl=en',
    icon: GraduationCap,
  },
]

export function SocialLinks({ size = 'md', className = '' }: SocialLinksProps) {
  const iconSize = size === 'sm' ? 16 : 20
  const buttonSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${buttonSize} flex items-center justify-center rounded-lg text-brand-text-muted dark:text-brand-text-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark transition-all duration-200`}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  )
}
