import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../ui/Button.tsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import { isHttpUrl } from '../../utils/contact.ts'
import { siteConfig } from '../../siteConfig.ts'

const scenes = [
  {
    id: 'restaurant',
    url: 'restaurant.studio',
    title: 'Restaurant → Reservierung',
    body: (
      <div className="mini-grid">
        <div className="mini-card">
          <div className="mini-title">Tisch & Feuer</div>
          <div className="mini-row">
            <span>Heute 18–22 Uhr</span>
            <span>Karte öffnen</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-title">Tisch anfragen</div>
          <div className="mini-row">
            <span>2 Personen</span>
            <span>Fr 19:30</span>
          </div>
          <div className="mini-row">
            <span>Name, Mail, Wunsch</span>
            <strong>Senden</strong>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'stay',
    url: 'kueste.studio',
    title: 'Ferienwohnung → Kalender',
    body: (
      <div className="mini-card">
        <div className="mini-title">Haus am Deich</div>
        <div className="mini-row">
          <span>4 Gäste · WLAN · Strandnähe</span>
          <span>Anfragen</span>
        </div>
        <div className="cal" aria-hidden="true">
          {Array.from({ length: 21 }, (_, i) => (
            <span key={i} className={i === 9 || i === 10 || i === 11 ? 'on' : undefined}>
              {i + 8}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'business',
    url: 'betrieb.studio',
    title: 'Business → Anfrage',
    body: (
      <div className="mini-grid">
        <div className="mini-card">
          <div className="mini-title">Was dürfen wir für Sie tun?</div>
          <div className="mini-row">
            <span>Projektumfang</span>
            <span>Zeitraum</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-row">
            <span>Name / Firma</span>
            <strong>Unverbindlich senden</strong>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'shop',
    url: 'atelier.studio',
    title: 'Shop → Produkte',
    body: (
      <div className="mini-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {['Edition 01', 'Edition 02', 'Set Holz', 'Pflege'].map((item) => (
          <div className="mini-card" key={item}>
            <div className="mini-title">{item}</div>
            <div className="mini-row">
              <span>Details</span>
              <span>Merken</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'community',
    url: 'northwatch.studio',
    title: 'Community → Bereich',
    body: (
      <div className="mini-grid">
        <div className="mini-card">
          <div className="mini-title">Willkommen zurück</div>
          <div className="mini-row">
            <span>Mitglied</span>
            <span>Dashboard</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-row">
            <span>Nächstes Event</span>
            <span>Sa 20:00</span>
          </div>
          <div className="mini-row">
            <span>Interner Bereich</span>
            <strong>Öffnen</strong>
          </div>
        </div>
      </div>
    ),
  },
] as const

export function Hero() {
  const reduce = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const scene = scenes[index] ?? scenes[0]

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % scenes.length)
    }, 3800)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="kicker">Webentwicklung & digitale Services</p>
        <h1>
          {siteConfig.taglineLead}
          <br />
          <em>{siteConfig.taglineAccent}</em>
        </h1>
        <p>{siteConfig.shortPitch}</p>
        <div className="hero-actions">
          <Button to="/#konfigurator" magnetic>
            Projekt starten
          </Button>
          <Button to="/#leistungen" variant="ghost">
            Leistungen entdecken
          </Button>
        </div>
        <p className="hero-note">
          Für Betriebe, Unterkünfte, Vereine, Creator und private Vorhaben – von der One-Page bis zur
          Plattform.
          {isHttpUrl(siteConfig.ebayKleinanzeigenUrl)
            ? ' Öffentliches Kleinanzeigen-Profil verlinkt weiter unten.'
            : null}
        </p>
      </div>
      <div className="browser" aria-label="Beispielhafte Website-Konzepte">
        <div className="browser-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <div className="browser-url">{scene.url}</div>
        </div>
        <div className="browser-stage">
          <p className="kicker">{scene.title}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {scene.body}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
