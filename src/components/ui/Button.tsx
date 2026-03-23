import React from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-accent dark:bg-brand-accent-dark text-white hover:bg-brand-accent-hover dark:hover:bg-brand-accent-hover-dark',
  outline:
    'border border-brand-accent dark:border-brand-accent-dark text-brand-accent dark:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark',
  ghost:
    'text-brand-accent dark:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  onClick,
  target,
  rel,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const allClasses = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if (href) {
    return (
      <Link href={href} className={allClasses} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
