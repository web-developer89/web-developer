export const configuratorNeeds = [
  { id: 'new', label: 'Neue Website' },
  { id: 'refresh', label: 'Bestehende Website modernisieren' },
  { id: 'onepager', label: 'One-Page' },
  { id: 'company', label: 'Unternehmenswebsite' },
  { id: 'stay', label: 'Ferienwohnung / Unterkunft' },
  { id: 'gastro', label: 'Restaurant' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'community', label: 'Community' },
  { id: 'custom', label: 'Individuelles Projekt' },
  { id: 'unsure', label: 'Noch nicht sicher' },
] as const

export const configuratorFeatures = [
  'Kontaktformular',
  'Galerie',
  'Bewertungen',
  'Kalender',
  'Buchungsanfrage',
  'Login',
  'Adminbereich',
  'Blog',
  'Mehrsprachigkeit',
  'Maps',
  'WhatsApp',
  'Animationen',
  'Dark Mode',
  'Individuelle Funktionen',
] as const

export const configuratorSizes = [
  { id: 'one', label: 'Kleine One-Page' },
  { id: 'small', label: 'Kleine Website' },
  { id: 'mid', label: 'Mittelgroße Website' },
  { id: 'large', label: 'Umfangreiche Website' },
  { id: 'app', label: 'Individuelle Web-Anwendung' },
  { id: 'unknown', label: 'Weiß ich noch nicht' },
] as const

export const configuratorTimelines = [
  { id: 'asap', label: 'So schnell wie möglich' },
  { id: '1-2w', label: '1–2 Wochen' },
  { id: '2-4w', label: '2–4 Wochen' },
  { id: '1-3m', label: '1–3 Monate' },
  { id: 'flex', label: 'Flexibel' },
] as const

export const contactPreferences = [
  { id: 'email', label: 'E-Mail' },
  { id: 'phone', label: 'Telefon' },
  { id: 'whatsapp', label: 'WhatsApp' },
] as const
