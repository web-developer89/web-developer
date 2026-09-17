import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo.tsx'
import { siteConfig } from '../siteConfig.ts'

export function NotFound() {
  return (
    <main className="legal wrap">
      <Seo title={`Seite nicht gefunden — ${siteConfig.brandName}`} />
      <p className="kicker">404</p>
      <h1>Diese Adresse gibt es hier nicht.</h1>
      <p className="muted">Vielleicht ein Tippfehler – oder ein alter Link.</p>
      <p style={{ marginTop: 24 }}>
        <Link to="/">Zur Startseite</Link>
      </p>
    </main>
  )
}
