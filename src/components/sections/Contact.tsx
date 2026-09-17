import { siteConfig } from '../../siteConfig.ts'
import { isHttpUrl } from '../../utils/contact.ts'
import { Button } from '../ui/Button.tsx'

export function Contact() {
  return (
    <section className="section" id="kontakt" aria-labelledby="kontakt-title">
      <div className="wrap">
        <div className="cta-band">
          <p className="kicker" style={{ color: 'inherit' }}>
            Kontakt
          </p>
          <h2 id="kontakt-title">
            Du hast eine Idee?
            <br />
            Lass uns daraus etwas Starkes machen.
          </h2>
          <p className="muted" style={{ marginTop: 16, maxWidth: '36rem' }}>
            Unverbindlich anfragen, Idee konfigurieren oder – wenn hinterlegt – das Kleinanzeigen-Profil öffnen.
          </p>
          <div className="cta-actions">
            <Button to="/#konfigurator">Projekt konfigurieren</Button>
            <Button href={`mailto:${siteConfig.email}`} variant="ghost">
              Kontakt aufnehmen
            </Button>
            {isHttpUrl(siteConfig.ebayKleinanzeigenUrl) ? (
              <Button href={siteConfig.ebayKleinanzeigenUrl} variant="ghost" external>
                Kleinanzeigen-Profil öffnen
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
