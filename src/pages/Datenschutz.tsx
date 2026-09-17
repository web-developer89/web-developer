import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo.tsx'
import { siteConfig } from '../siteConfig.ts'

export function Datenschutz() {
  return (
    <main className="legal wrap">
      <Seo
        title={`Datenschutz — ${siteConfig.brandName}`}
        description="Datenschutzhinweise zur Website. Keine Tracker standardmäßig aktiv."
      />
      <p className="kicker">Rechtliches</p>
      <h1>Datenschutz</h1>
      <p>
        Dieser Text ist eine verständliche Grundlage, kein fertiges Anwaltsschreiben. Passe ihn an, sobald Hosting,
        Formulare oder Analyse dazukommen.
      </p>
      <h2>Verantwortlich</h2>
      <p>
        {siteConfig.legal.name}, {siteConfig.legal.street}, {siteConfig.legal.zipCity}, {siteConfig.legal.email}
      </p>
      <h2>Hosting</h2>
      <p>
        Die Seite ist als statische Website gebaut (GitHub Pages). Beim Aufruf entstehen übliche Server-Logdaten beim
        Anbieter – IP-Adresse, Zeitpunkt, aufgerufene Datei. Dafür ist der Hosting-Anbieter verantwortlich, soweit er
        diese Daten verarbeitet.
      </p>
      <h2>Lokale Speicherung</h2>
      <p>
        Die gewählte Darstellung (Hell/Dunkel, Akzentfarbe) wird in deinem Browser unter{' '}
        <code>localStorage</code> gespeichert, damit die Seite beim nächsten Besuch gleich aussieht. Das ist keine
        werbliche Profilbildung.
      </p>
      <h2>Kontakt und Anfragen</h2>
      <p>
        Schickst du eine Anfrage per E-Mail oder über ein später angebundenes Formular, werden die Angaben verarbeitet,
        die du selbst eingibst – um auf das Vorhaben zu antworten. Ohne konfiguriertes Backend bleibt GitHub Pages bei
        einem Mail-Entwurf bzw. dem kopierten Text.
      </p>
      <h2>Keine Tracker von Haus aus</h2>
      <p>
        Es sind standardmäßig keine Analyse- oder Werbe-Skripte eingebunden. Wenn später Statistik oder Einbettungen
        (Karten, Video) dazukommen, gehört eine Einwilligung davor – nicht danach.
      </p>
      <h2>Deine Rechte</h2>
      <p>
        Du kannst Auskunft, Berichtigung, Löschung und Einschränkung verlangen, soweit die gesetzlichen Voraussetzungen
        vorliegen. Dafür reicht eine Nachricht an {siteConfig.legal.email}.
      </p>
      <p style={{ marginTop: 28 }}>
        <Link to="/">Zur Startseite</Link>
      </p>
    </main>
  )
}
