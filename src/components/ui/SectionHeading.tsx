interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-2 mb-12 ${alignClasses}`}>
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-text dark:text-brand-text-dark tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brand-text-muted dark:text-brand-text-muted-dark text-base max-w-xl mt-1">
          {subtitle}
        </p>
      )}
    </div>
  )
}
