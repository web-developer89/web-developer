import { useMemo, useState } from 'react'
import { siteConfig } from '../../siteConfig.ts'
import {
  configuratorFeatures,
  configuratorNeeds,
  configuratorSizes,
  configuratorTimelines,
  contactPreferences,
} from '../../data/configurator.ts'
import { copyText } from '../../utils/clipboard.ts'
import { Button } from '../ui/Button.tsx'
import { Section } from '../ui/Section.tsx'
import { cn } from '../../utils/cn.ts'

type Draft = {
  need: string
  features: string[]
  size: string
  budget: string
  timeline: string
  description: string
  name: string
  email: string
  phone: string
  contactMethod: string
}

const empty: Draft = {
  need: '',
  features: [],
  size: '',
  budget: '',
  timeline: '',
  description: '',
  name: '',
  email: '',
  phone: '',
  contactMethod: 'email',
}

function labelOf(id: string, list: readonly { id: string; label: string }[]) {
  return list.find((item) => item.id === id)?.label ?? id
}

export function buildRequestText(draft: Draft) {
  const need = labelOf(draft.need, configuratorNeeds)
  const size = labelOf(draft.size, configuratorSizes)
  const budget = siteConfig.budgetRanges.find((item) => item.id === draft.budget)?.label ?? draft.budget
  const timeline = labelOf(draft.timeline, configuratorTimelines)
  const method = contactPreferences.find((item) => item.id === draft.contactMethod)?.label ?? draft.contactMethod
  return [
    `Projektanfrage – ${siteConfig.brandName}`,
    '',
    `Vorhaben: ${need}`,
    `Größe: ${size}`,
    `Funktionen: ${draft.features.length ? draft.features.join(', ') : 'keine Angabe'}`,
    `Budget: ${budget}`,
    `Zeitraum: ${timeline}`,
    '',
    'Idee:',
    draft.description || '—',
    '',
    `Name: ${draft.name}`,
    `E-Mail: ${draft.email}`,
    `Telefon: ${draft.phone || '—'}`,
    `Kontaktweg: ${method}`,
  ].join('\n')
}

export function Configurator() {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft>(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const last = 7

  const summary = useMemo(
    () => ({
      need: labelOf(draft.need, configuratorNeeds) || 'Noch offen',
      count: draft.features.length,
      budget: siteConfig.budgetRanges.find((item) => item.id === draft.budget)?.label ?? 'Offen',
      timeline: labelOf(draft.timeline, configuratorTimelines) || 'Offen',
    }),
    [draft],
  )

  function toggleFeature(name: string) {
    setDraft((current) => ({
      ...current,
      features: current.features.includes(name)
        ? current.features.filter((item) => item !== name)
        : [...current.features, name],
    }))
  }

  function next() {
    const nextErrors: Record<string, string> = {}
    if (step === 0 && !draft.need) nextErrors.need = 'Bitte wähle, was du vorhast.'
    if (step === 2 && !draft.size) nextErrors.size = 'Bitte wähle eine Größenordnung.'
    if (step === 3 && !draft.budget) nextErrors.budget = 'Bitte wähle eine Spanne oder „noch offen“.'
    if (step === 4 && !draft.timeline) nextErrors.timeline = 'Bitte wähle einen Zeitraum.'
    if (step === 6) {
      if (!draft.name.trim()) nextErrors.name = 'Name fehlt.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) nextErrors.email = 'Bitte eine gültige E-Mail angeben.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStep((value) => Math.min(value + 1, last))
  }

  async function send() {
    const text = buildRequestText(draft)
    setSending(true)
    setStatus('')
    try {
      if (siteConfig.formEndpoint) {
        const response = await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(draft),
        })
        if (!response.ok) throw new Error('send-failed')
        setStatus('Anfrage ist raus. Ich melde mich.')
        return
      }
      const subject = encodeURIComponent(`Projektanfrage: ${summary.need}`)
      const body = encodeURIComponent(text)
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
      setStatus('Dein Mailprogramm sollte sich öffnen. Falls nicht: Text kopieren.')
    } catch {
      setStatus('Senden hat nicht geklappt. Bitte den Text kopieren oder später noch einmal versuchen.')
    } finally {
      setSending(false)
    }
  }

  async function copy() {
    const ok = await copyText(buildRequestText(draft))
    setStatus(ok ? 'Anfrage in die Zwischenablage kopiert.' : 'Kopieren nicht möglich – bitte manuell markieren.')
  }

  return (
    <Section
      id="konfigurator"
      kicker="Konfigurator"
      title="Was hast du vor?"
      intro="Acht kurze Schritte. Kein Preisdruck, keine Pflichtfelder-Orgie – nur genug, damit ich verstehe, worum es geht."
    >
      <div className="spot-card wizard">
        <div className="wizard-nav" aria-hidden="true">
          {Array.from({ length: last + 1 }, (_, index) => (
            <span key={index} className={cn('dot-step', index <= step && 'is-on')} />
          ))}
        </div>
        <p className="muted">Schritt {step + 1} von {last + 1}</p>

        {step === 0 ? (
          <fieldset>
            <legend className="sr-only">Was brauchst du?</legend>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, marginBottom: 12 }}>
              Was brauchst du?
            </h3>
            <div className="choice-grid">
              {configuratorNeeds.map((item) => (
                <button
                  key={item.id}
                  className={cn('choice', draft.need === item.id && 'is-on')}
                  onClick={() => setDraft((d) => ({ ...d, need: item.id }))}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {errors.need ? <p className="field-error">{errors.need}</p> : null}
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="sr-only">Funktionen</legend>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, marginBottom: 12 }}>
              Welche Funktionen sind wichtig?
            </h3>
            <p className="muted" style={{ marginBottom: 12 }}>
              Mehrfachauswahl. Nichts muss.
            </p>
            <div className="choice-grid">
              {configuratorFeatures.map((item) => (
                <button
                  key={item}
                  className={cn('choice', draft.features.includes(item) && 'is-on')}
                  onClick={() => toggleFeature(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <ChoiceStep
            title="Wie groß ist das Projekt?"
            items={configuratorSizes}
            value={draft.size}
            error={errors.size}
            onChange={(size) => setDraft((d) => ({ ...d, size }))}
          />
        ) : null}

        {step === 3 ? (
          <ChoiceStep
            title="Budget – grobe Richtung"
            items={siteConfig.budgetRanges}
            value={draft.budget}
            error={errors.budget}
            onChange={(budget) => setDraft((d) => ({ ...d, budget }))}
          />
        ) : null}

        {step === 4 ? (
          <ChoiceStep
            title="Zeitraum"
            items={configuratorTimelines}
            value={draft.timeline}
            error={errors.timeline}
            onChange={(timeline) => setDraft((d) => ({ ...d, timeline }))}
          />
        ) : null}

        {step === 5 ? (
          <label className="field">
            <span>Erzähl mir kurz von deiner Idee…</span>
            <textarea
              value={draft.description}
              onChange={(event) => setDraft((d) => ({ ...d, description: event.target.value }))}
              placeholder="Branche, Ziel, was schon existiert, was fehlen darf."
            />
          </label>
        ) : null}

        {step === 6 ? (
          <div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, marginBottom: 12 }}>
              Wie erreiche ich dich?
            </h3>
            <label className="field">
              <span>Name</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft((d) => ({ ...d, name: event.target.value }))}
                autoComplete="name"
              />
              {errors.name ? <span className="field-error">{errors.name}</span> : null}
            </label>
            <label className="field">
              <span>E-Mail</span>
              <input
                type="email"
                value={draft.email}
                onChange={(event) => setDraft((d) => ({ ...d, email: event.target.value }))}
                autoComplete="email"
              />
              {errors.email ? <span className="field-error">{errors.email}</span> : null}
            </label>
            <label className="field">
              <span>Telefon (optional)</span>
              <input
                type="tel"
                value={draft.phone}
                onChange={(event) => setDraft((d) => ({ ...d, phone: event.target.value }))}
                autoComplete="tel"
              />
            </label>
            <p style={{ fontWeight: 700, margin: '8px 0' }}>Bevorzugter Kontakt</p>
            <div className="chips">
              {contactPreferences.map((item) => (
                <button
                  key={item.id}
                  className={cn('chip', draft.contactMethod === item.id && 'is-on')}
                  onClick={() => setDraft((d) => ({ ...d, contactMethod: item.id }))}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 7 ? (
          <article className="summary-card summary">
            <p className="kicker">Dein Projekt</p>
            <h3 style={{ fontSize: '2rem', margin: '8px 0 16px' }}>{summary.need}</h3>
            <dl>
              <div>
                <dt>Funktionen</dt>
                <dd>{summary.count} ausgewählt</dd>
              </div>
              <div>
                <dt>Budget</dt>
                <dd>{summary.budget}</dd>
              </div>
              <div>
                <dt>Zeitraum</dt>
                <dd>{summary.timeline}</dd>
              </div>
            </dl>
            <div className="wizard-actions" style={{ marginTop: 18 }}>
              <Button onClick={() => void send()} magnetic>
                {sending ? 'Senden…' : 'Anfrage senden'}
              </Button>
              <Button variant="line" onClick={() => void copy()}>
                Text kopieren
              </Button>
            </div>
            {status ? <p className="muted" style={{ marginTop: 12 }}>{status}</p> : null}
            {!siteConfig.formEndpoint ? (
              <p className="muted" style={{ marginTop: 8, fontSize: '0.88rem' }}>
                GitHub Pages hat kein eigenes Backend. Ohne formEndpoint öffnet sich eine E-Mail – oder du kopierst den Text.
              </p>
            ) : null}
          </article>
        ) : null}

        <div className="wizard-actions">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((value) => Math.max(0, value - 1))}>
              Zurück
            </Button>
          ) : (
            <span />
          )}
          {step < last ? (
            <Button onClick={next}>Weiter</Button>
          ) : (
            <Button variant="ghost" onClick={() => { setDraft(empty); setStep(0); setStatus(''); }}>
              Neu starten
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}

function ChoiceStep({
  title,
  items,
  value,
  error,
  onChange,
}: {
  title: string
  items: readonly { id: string; label: string }[]
  value: string
  error?: string
  onChange: (id: string) => void
}) {
  return (
    <fieldset>
      <legend className="sr-only">{title}</legend>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, marginBottom: 12 }}>{title}</h3>
      <div className="choice-grid">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn('choice', value === item.id && 'is-on')}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </fieldset>
  )
}
