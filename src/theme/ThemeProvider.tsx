import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export const accents = ['midnight', 'ocean', 'emerald', 'purple', 'minimal'] as const
export type Accent = (typeof accents)[number]
export type ColorMode = 'light' | 'dark'

type Appearance = { theme: ColorMode; accent: Accent }

const STORAGE_KEY = 'studio89-appearance'

type ThemeContextValue = {
  theme: ColorMode
  accent: Accent
  setTheme: (theme: ColorMode) => void
  setAccent: (accent: Accent) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function apply(next: Appearance) {
  document.documentElement.dataset.theme = next.theme
  document.documentElement.dataset.accent = next.accent
  document.documentElement.classList.add('theme-animating')
  window.setTimeout(() => document.documentElement.classList.remove('theme-animating'), 480)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>(() => {
    if (typeof document !== 'undefined') {
      const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
      const accent = accents.includes(document.documentElement.dataset.accent as Accent)
        ? (document.documentElement.dataset.accent as Accent)
        : 'midnight'
      return { theme, accent }
    }
    return { theme: 'dark', accent: 'midnight' }
  })

  const update = useCallback((partial: Partial<Appearance>) => {
    setAppearance((current) => {
      const next = { ...current, ...partial }
      apply(next)
      return next
    })
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: appearance.theme,
      accent: appearance.accent,
      setTheme: (theme) => update({ theme }),
      setAccent: (accent) => update({ accent }),
      toggleTheme: () => update({ theme: appearance.theme === 'dark' ? 'light' : 'dark' }),
    }),
    [appearance, update],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
