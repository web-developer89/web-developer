import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.ts'

export function HashScroll() {
  const { pathname, hash } = useLocation()
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [pathname, hash, reduce])

  return null
}
