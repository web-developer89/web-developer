export const siteConfig = {
  developerName: 'Web-Developer',
  brandName: 'Web-Developer',
  mark: 'WD',
  taglineLead: 'Websites, die nicht nur gut aussehen.',
  taglineAccent: 'Sondern etwas können.',
  shortPitch:
    'Von der modernen One-Page bis zur individuellen Web-Plattform – ich entwickle digitale Lösungen passend zu deinem Projekt.',
  location: 'Deutschland',
  email: 'hello@example.com',
  phone: '',
  whatsapp: '',
  ebayKleinanzeigenUrl:
    'https://www.kleinanzeigen.de/s-bestandsliste.html?userId=65258619&utm_source=sharesheet&utm_campaign=socialbuttons&utm_medium=social_profil&utm_content=app_android',
  githubUrl: 'https://github.com/web-developer89',
  siteUrl: 'https://web-developer89.github.io/web-developer',
  socialLinks: [] as { label: string; href: string }[],
  formEndpoint: '',
  legal: {
    name: '[Vorname Nachname]',
    street: '[Straße Nr.]',
    zipCity: '[PLZ Ort]',
    email: 'hello@example.com',
    phone: '[Telefon]',
    responsible: '[Vorname Nachname]',
  },
  budgetRanges: [
    { id: 'under-250', label: 'unter 250 €' },
    { id: '250-500', label: '250–500 €' },
    { id: '500-1000', label: '500–1.000 €' },
    { id: '1000-2500', label: '1.000–2.500 €' },
    { id: '2500-plus', label: '2.500 €+' },
    { id: 'open', label: 'Noch offen / Beratung erwünscht' },
  ],
  nav: [
    { href: '/#leistungen', label: 'Leistungen' },
    { href: '/#moeglichkeiten', label: 'Möglichkeiten' },
    { href: '/#konfigurator', label: 'Konfigurator' },
    { href: '/#arbeit', label: 'Arbeit' },
    { href: '/#ablauf', label: 'Ablauf' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#kontakt', label: 'Kontakt' },
  ],
}

export type BudgetRange = (typeof siteConfig.budgetRanges)[number]
