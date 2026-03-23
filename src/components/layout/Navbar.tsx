'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { label: 'Home', href: '/', external: false },
  { label: 'Blog', href: '/blog', external: false },
  { label: 'Projects', href: '/projects', external: false },
  { label: 'CV', href: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/files/CV.pdf`, external: true },
  { label: 'Contact', href: '/contact', external: false },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aditwhorra',
    icon: <Linkedin size={17} />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/aditwhorra42',
    icon: <Github size={17} />,
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@aditwhorra',
    icon: (
      /* Medium SVG — not in lucide-react */
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=33BkSpgAAAAJ&hl=en',
    icon: (
      /* Google Scholar SVG */
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z" />
      </svg>
    ),
  },
]

const iconBtnCls =
  'w-9 h-9 flex items-center justify-center rounded-lg text-brand-text-muted dark:text-brand-text-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark transition-all duration-200'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-md bg-brand-bg/90 dark:bg-brand-bg-dark/90 border-b border-brand-bg-muted dark:border-brand-bg-muted-dark shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-18">

          {/* Left: social icons — absolutely pinned left */}
          <div className="absolute left-0 hidden md:flex items-center gap-1">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={iconBtnCls}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Center: nav links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ label, href, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-base font-medium text-brand-text-sec dark:text-brand-text-sec-dark hover:text-brand-accent dark:hover:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark rounded-lg transition-all duration-200"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="px-5 py-2.5 text-base font-medium text-brand-text-sec dark:text-brand-text-sec-dark hover:text-brand-accent dark:hover:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark rounded-lg transition-all duration-200"
                >
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Right: theme toggle — absolutely pinned right */}
          <div className="absolute right-0 hidden md:flex items-center">
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger — absolutely pinned right */}
          <div className="absolute right-0 flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-brand-text-muted dark:text-brand-text-muted-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden backdrop-blur-md bg-brand-bg/95 dark:bg-brand-bg-dark/95 border-b border-brand-bg-muted dark:border-brand-bg-muted-dark"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href, external }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-base font-medium text-brand-text-sec dark:text-brand-text-sec-dark hover:text-brand-accent dark:hover:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark rounded-lg transition-all duration-200"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-base font-medium text-brand-text-sec dark:text-brand-text-sec-dark hover:text-brand-accent dark:hover:text-brand-accent-dark hover:bg-brand-accent-light dark:hover:bg-brand-accent-light-dark rounded-lg transition-all duration-200"
                    >
                      {label}
                    </Link>
                  )}
                </motion.div>
              ))}
              {/* Socials in mobile menu */}
              <div className="flex items-center gap-2 px-4 pt-3 pb-1 border-t border-brand-bg-muted dark:border-brand-bg-muted-dark mt-2">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onClick={closeMobileMenu}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-brand-text-muted dark:text-brand-text-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
