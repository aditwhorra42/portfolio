interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 mb-12 ${alignClasses}`}>
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text dark:text-brand-text-dark">
        {title}
      </h2>
      <div
        className={`h-1 w-16 rounded-full bg-brand-accent dark:bg-brand-accent-dark ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
      {subtitle && (
        <p className="text-brand-text-muted dark:text-brand-text-muted-dark text-lg max-w-xl mt-1">
          {subtitle}
        </p>
      )}
    </div>
  )
}
