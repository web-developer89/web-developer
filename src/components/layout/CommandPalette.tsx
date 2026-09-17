import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLockBody } from '../../hooks/useLockBody.ts'
import { useTheme } from '../../theme/ThemeProvider.tsx'
import { siteConfig } from '../../siteConfig.ts'
import { isHttpUrl } from '../../utils/contact.ts'

type Command = { id: string; label: string; hint: string; run: () => void }

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  useLockBody(open)

  const commands = useMemo<Command[]>(
    () => [
      { id: 'services', label: 'Leistungen ansehen', hint: 'Übersicht', run: () => navigate('/#leistungen') },
      { id: 'config', label: 'Projekt konfigurieren', hint: 'Anfrage', run: () => navigate('/#konfigurator') },
      { id: 'work', label: 'Portfolio öffnen', hint: 'Demos', run: () => navigate('/#arbeit') },
      { id: 'contact', label: 'Kontakt', hint: 'Schreiben', run: () => navigate('/#kontakt') },
      { id: 'theme', label: 'Theme wechseln', hint: 'Hell / Dunkel', run: () => toggleTheme() },
      ...(isHttpUrl(siteConfig.ebayKleinanzeigenUrl)
        ? [
            {
              id: 'ebay',
              label: 'Kleinanzeigen öffnen',
              hint: 'Extern',
              run: () => window.open(siteConfig.ebayKleinanzeigenUrl, '_blank', 'noopener,noreferrer'),
            },
          ]
        : []),
    ],
    [navigate, toggleTheme],
  )

  const filtered = commands.filter((item) =>
    `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase().trim()),
  )

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((v) => !v)
        setQuery('')
        setActive(0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  function run(command: Command) {
    command.run()
    setOpen(false)
  }

  return (
    <div
      className="palette-backdrop"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Befehle"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Springen, umschalten, öffnen…"
          aria-label="Befehl suchen"
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false)
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)))
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActive((i) => Math.max(i - 1, 0))
            }
            if (event.key === 'Enter' && filtered[active]) run(filtered[active])
          }}
        />
        <div role="listbox" aria-label="Treffer">
          {filtered.length === 0 ? (
            <p className="muted" style={{ padding: '12px 18px' }}>
              Nichts gefunden.
            </p>
          ) : (
            filtered.map((item, index) => (
              <button
                key={item.id}
                className={index === active ? 'is-active' : undefined}
                role="option"
                aria-selected={index === active}
                onClick={() => run(item)}
              >
                {item.label}
                <span className="muted" style={{ marginLeft: 8, fontWeight: 500 }}>
                  {item.hint}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
