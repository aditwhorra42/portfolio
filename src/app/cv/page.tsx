'use client'

import { useEffect } from 'react'

export default function CVPage() {
  useEffect(() => {
    const base = process.env.NODE_ENV === 'production' ? '/portfolio' : ''
    window.location.replace(`${base}/files/CV.pdf`)
  }, [])

  return null
}
