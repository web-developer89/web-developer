import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { contactOptions, isHttpUrl } from '../../utils/contact.ts'
import { siteConfig } from '../../siteConfig.ts'

export function FloatingContact() {
  const [open, setOpen] = useState(false)
  const options = contactOptions()

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {open ? (
        <div className="sheet" role="dialog" aria-label="Kontakt aufnehmen">
          <p style={{ fontWeight: 800, marginBottom: 8 }}>Wie möchtest du Kontakt aufnehmen?</p>
          {options.map((option) => (
            <a
              key={option.id}
              href={option.href}
              {...(option.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {option.label}
            </a>
          ))}
          <Link to="/#konfigurator" onClick={() => setOpen(false)}>
            Idee konfigurieren
          </Link>
          {isHttpUrl(siteConfig.ebayKleinanzeigenUrl) ? (
            <a href={siteConfig.ebayKleinanzeigenUrl} target="_blank" rel="noopener noreferrer">
              Kleinanzeigen-Profil
            </a>
          ) : null}
        </div>
      ) : null}
      <button className="float-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        Kontakt
      </button>
    </>
  )
}
