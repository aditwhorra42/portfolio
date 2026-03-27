/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          'bg-dark': '#0D0D0D',
          'bg-card': '#FFFFFF',
          'bg-card-dark': '#1A1A1A',
          'bg-muted': '#F4F4F5',
          'bg-muted-dark': '#141414',
          text: '#09090B',
          'text-dark': '#FAFAFA',
          'text-sec': '#3F3F46',
          'text-sec-dark': '#D4D4D8',
          'text-muted': '#71717A',
          'text-muted-dark': '#A1A1AA',
          accent: '#C17F59',
          'accent-dark': '#D4956A',
          'accent-hover': '#A6694A',
          'accent-hover-dark': '#E8A87C',
          'accent-light': '#C17F5912',
          'accent-light-dark': '#D4956A12',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.text'),
            a: {
              color: theme('colors.brand.accent'),
              '&:hover': {
                color: theme('colors.brand.accent-hover'),
              },
            },
            h1: { color: theme('colors.brand.text'), fontFamily: theme('fontFamily.serif').join(', ') },
            h2: { color: theme('colors.brand.text'), fontFamily: theme('fontFamily.serif').join(', ') },
            h3: { color: theme('colors.brand.text'), fontFamily: theme('fontFamily.serif').join(', ') },
            h4: { color: theme('colors.brand.text') },
            strong: { color: theme('colors.brand.text') },
            blockquote: {
              borderLeftColor: theme('colors.brand.accent'),
              color: theme('colors.brand.text-sec'),
            },
            code: {
              color: theme('colors.brand.accent'),
              backgroundColor: theme('colors.brand.bg-muted'),
              borderRadius: '4px',
              padding: '2px 6px',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
        invert: {
          css: {
            color: theme('colors.brand.text-dark'),
            a: {
              color: theme('colors.brand.accent-dark'),
              '&:hover': {
                color: theme('colors.brand.accent-hover-dark'),
              },
            },
            h1: { color: theme('colors.brand.text-dark') },
            h2: { color: theme('colors.brand.text-dark') },
            h3: { color: theme('colors.brand.text-dark') },
            h4: { color: theme('colors.brand.text-dark') },
            strong: { color: theme('colors.brand.text-dark') },
            blockquote: {
              borderLeftColor: theme('colors.brand.accent-dark'),
              color: theme('colors.brand.text-sec-dark'),
            },
            code: {
              color: theme('colors.brand.accent-dark'),
              backgroundColor: theme('colors.brand.bg-muted-dark'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
