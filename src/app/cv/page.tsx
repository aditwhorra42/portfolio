'use client'

import { useEffect } from 'react'

export default function CVPage() {
  useEffect(() => {
    window.location.replace('/cv/adit-whorra-cv.pdf')
  }, [])

  return null
}
