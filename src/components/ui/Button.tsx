import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.ts'
import { useMediaQuery } from '../../hooks/useMediaQuery.ts'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'line'
  href?: string
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  magnetic?: boolean
  external?: boolean
}

export function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  type = 'button',
  className,
  magnetic = false,
  external = false,
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null)
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduce = usePrefersReducedMotion()
  const canMagnet = magnetic && fine && !reduce
  const classes = cn('btn', `btn-${variant}`, className)

  function onMove(event: MouseEvent<HTMLElement>) {
    if (!canMagnet || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  const magnet = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  }

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        onClick={onClick}
        ref={(node) => {
          ref.current = node
        }}
        {...magnet}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        ref={(node) => {
          ref.current = node
        }}
        {...magnet}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      ref={(node) => {
        ref.current = node
      }}
      {...magnet}
    >
      {children}
    </button>
  )
}
