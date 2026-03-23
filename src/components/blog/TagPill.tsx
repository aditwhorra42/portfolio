interface TagPillProps {
  label: string
  variant?: 'accent' | 'muted' | 'white'
}

export function TagPill({ label, variant = 'muted' }: TagPillProps) {
  const variantClasses = {
    accent:
      'bg-brand-accent-light dark:bg-brand-accent-light-dark text-brand-accent dark:text-brand-accent-dark',
    muted:
      'bg-brand-bg-muted dark:bg-brand-bg-muted-dark text-brand-text-muted dark:text-brand-text-muted-dark',
    white: 'bg-white/20 text-white backdrop-blur-sm',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}
    >
      {label}
    </span>
  )
}
