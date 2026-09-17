import { useState, type MouseEvent, type ReactNode } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery.ts'

export function SpotlightCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [spot, setSpot] = useState({ x: 50, y: 40 })

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (!fine) return
    const rect = event.currentTarget.getBoundingClientRect()
    setSpot({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      className={className}
      onMouseMove={onMove}
      style={{
        background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, var(--glow), transparent 42%), var(--elevated)`,
      }}
    >
      {children}
    </div>
  )
}
