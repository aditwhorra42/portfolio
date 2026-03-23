const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : ''

export function imgSrc(src: string): string {
  if (!src) return src
  // Already absolute URL (http/https) — leave as-is
  if (src.startsWith('http')) return src
  return `${basePath}${src}`
}
