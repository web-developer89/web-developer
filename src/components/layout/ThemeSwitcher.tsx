import { useEffect, useRef, useState } from 'react'
import { accents, useTheme } from '../../theme/ThemeProvider.tsx'

const accentLabel: Record<(typeof accents)[number], string> = {
  midnight: 'Midnight',
  ocean: 'Ocean',
  emerald: 'Emerald',
  purple: 'Purple',
  minimal: 'Minimal',
}

export function ThemeSwitcher() {
  const { theme, accent, setAccent, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        className="icon-btn"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Darstellung wählen"
        onClick={() => setOpen((v) => !v)}
      >
        {theme === 'dark' ? '☾' : '☼'}
      </button>
      {open ? (
        <div className="theme-pop" role="dialog" aria-label="Theme">
          <p className="kicker" style={{ marginBottom: 10 }}>
            Darstellung
          </p>
          <div className="theme-row">
            <button className={theme === 'light' ? 'chip is-on' : 'chip'} onClick={() => setTheme('light')}>
              Hell
            </button>
            <button className={theme === 'dark' ? 'chip is-on' : 'chip'} onClick={() => setTheme('dark')}>
              Dunkel
            </button>
          </div>
          <p className="kicker" style={{ margin: '8px 0' }}>
            Akzent
          </p>
          <div className="chips">
            {accents.map((item) => (
              <button
                key={item}
                className={accent === item ? 'chip is-on' : 'chip'}
                onClick={() => setAccent(item)}
              >
                {accentLabel[item]}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
