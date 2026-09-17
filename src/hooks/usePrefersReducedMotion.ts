import { useMediaQuery } from './useMediaQuery.ts'

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
