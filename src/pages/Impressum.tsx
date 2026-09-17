import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo.tsx'
import { siteConfig } from '../siteConfig.ts'

export function Impressum() {
  const legal = siteConfig.legal
  return (
    <main className="legal wrap">
      <Seo
        title={`Impressum — ${siteConfig.brandName}`}
        description="Impressum und gesetzliche Angaben. Platzhalter, bis echte Daten eingetragen sind."
      />
      <p className="kicker">Rechtliches</p>
      <h1>Impressum</h1>
      <p>
        Die folgenden Angaben sind Platzhalter. Trage deine echten Daten in <code>src/siteConfig.ts</code> unter{' '}
        <code>legal</code> ein, bevor die Seite öffentlich beworben wird.
      </p>
      <div className="legal-card" style={{ marginTop: 24 }}>
        <p>
          <strong>{legal.name}</strong>
        </p>
        <p>{legal.street}</p>
        <p>{legal.zipCity}</p>
        <p>{legal.phone}</p>
        <p>
          <a href={`mailto:${legal.email}`}>{legal.email}</a>
        </p>
      </div>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>{legal.responsible}</p>
      <h2>Hinweis</h2>
      <p>
        Es werden keine erfundenen Register-, Umsatzsteuer- oder Kammerdaten ausgegeben. Sobald du sie brauchst,
        ergänze sie hier.
      </p>
      <p style={{ marginTop: 28 }}>
        <Link to="/">Zur Startseite</Link>
      </p>
    </main>
  )
}
