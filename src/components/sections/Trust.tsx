import { siteConfig } from '../../siteConfig.ts'
import { isHttpUrl } from '../../utils/contact.ts'
import { Button } from '../ui/Button.tsx'
import { Section } from '../ui/Section.tsx'

export function Trust() {
  const ready = isHttpUrl(siteConfig.ebayKleinanzeigenUrl)

  return (
    <Section
      id="vertrauen"
      kicker="Kleinanzeigen"
      title="Du möchtest sehen, wer hinter dem Angebot steckt?"
      intro="Hier findest du mein öffentliches Kleinanzeigen-Profil und meine aktuellen Angebote. Das ist kein Siegel und keine offizielle Prüfung durch eBay Kleinanzeigen – sondern der öffentliche Ort, an dem das Angebot steht."
    >
      <article className="trust-card ebay-card">
        <div>
          <p className="kicker">Externes Profil</p>
          <h3 style={{ fontSize: '1.8rem', margin: '8px 0' }}>Mein Kleinanzeigen-Profil ansehen</h3>
          <p className="muted">
            {ready
              ? 'Der Link öffnet Kleinanzeigen in einem neuen Tab. Schau dir Anzeige und Profil in Ruhe an.'
              : 'Die Profil-Adresse trägst du in der Konfiguration ein (ebayKleinanzeigenUrl). Bis dahin bleibt die Karte vorbereitet, ohne eine erfundene URL vorzutäuschen.'}
          </p>
        </div>
        {ready ? (
          <Button href={siteConfig.ebayKleinanzeigenUrl} external>
            Profil öffnen ↗
          </Button>
        ) : (
          <span className="badge">URL in siteConfig.ts</span>
        )}
      </article>
    </Section>
  )
}
