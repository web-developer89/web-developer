import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setValue(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="progress"
      style={{ transform: `scaleX(${value})` }}
      aria-hidden="true"
    />
  )
}
