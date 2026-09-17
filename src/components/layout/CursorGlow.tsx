import { useEffect, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery.ts'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'

export function CursorGlow() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduce = usePrefersReducedMotion()
  const [pos, setPos] = useState({ x: -400, y: -400 })

  useEffect(() => {
    if (!fine || reduce) return
    function onMove(event: PointerEvent) {
      setPos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, reduce])

  if (!fine || reduce) return null

  return (
    <div
      className="cursor-glow"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    />
  )
}
