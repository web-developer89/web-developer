import { useMemo, useState } from 'react'
import { portfolioFilters, portfolioProjects } from '../../data/portfolio.ts'
import { Section } from '../ui/Section.tsx'
import { Modal } from '../ui/Modal.tsx'
import { Button } from '../ui/Button.tsx'
import { cn } from '../../utils/cn.ts'

type Project = (typeof portfolioProjects)[number]

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]>('Alle')
  const [active, setActive] = useState<Project | null>(null)
  const items = useMemo(
    () => (filter === 'Alle' ? portfolioProjects : portfolioProjects.filter((item) => item.category === filter)),
    [filter],
  )

  return (
    <Section
      id="arbeit"
      kicker="Arbeit"
      title="Konzepte, keine erfundenen Kunden."
      intro="Echte Projekte kommen später hierher. Bis dahin: Demo-Karten, klar als Konzept gekennzeichnet – damit niemand denkt, das seien Referenzen."
    >
      <div className="filters">
        {portfolioFilters.map((item) => (
          <button
            key={item}
            className={cn('filter', item === filter && 'is-on')}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="muted">Keine Projekte in dieser Kategorie.</p>
      ) : (
        <div className="project-grid">
          {items.map((item) => (
            <article className="project-card" key={item.id}>
              <DemoFrame category={item.category} />
              <p className="badge" style={{ marginTop: 12 }}>
                {item.badge}
              </p>
              <h3 style={{ marginTop: 10 }}>{item.title}</h3>
              <p>{item.description}</p>
              <div className="chips" style={{ marginTop: 12 }}>
                {item.features.map((feature) => (
                  <span className="chip" key={feature} style={{ cursor: 'default' }}>
                    {feature}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <Button variant="line" onClick={() => setActive(item)}>
                  Details
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
      <Modal open={Boolean(active)} title={active?.title ?? ''} onClose={() => setActive(null)}>
        {active ? (
          <div>
            <p className="badge">{active.badge}</p>
            <p className="muted" style={{ margin: '12px 0' }}>
              {active.description}
            </p>
            <p>
              <strong>Kategorie:</strong> {active.category}
            </p>
            <p style={{ marginTop: 8 }}>
              <strong>Funktionen:</strong> {active.features.join(', ')}
            </p>
            <p style={{ marginTop: 8 }}>
              <strong>Technik:</strong> {active.technologies.join(', ')}
            </p>
            {active.demo ? (
              <p style={{ marginTop: 16 }}>
                <Button href={active.demo} external>
                  Live-Demo
                </Button>
              </p>
            ) : (
              <p className="muted" style={{ marginTop: 16 }}>
                Noch kein Live-Link. Wenn echte Arbeit live geht, kommt der Link in die Projektdaten.
              </p>
            )}
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}

function DemoFrame({ category }: { category: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 128,
        borderRadius: 16,
        border: '1px solid var(--line)',
        background:
          'linear-gradient(160deg, color-mix(in srgb, var(--accent) 22%, var(--bg)), var(--bg-2))',
        padding: 12,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {category}
      </div>
      <div
        style={{
          marginTop: 18,
          height: 10,
          width: '46%',
          borderRadius: 99,
          background: 'color-mix(in srgb, var(--ink) 18%, transparent)',
        }}
      />
      <div
        style={{
          marginTop: 8,
          height: 8,
          width: '72%',
          borderRadius: 99,
          background: 'color-mix(in srgb, var(--ink) 10%, transparent)',
        }}
      />
    </div>
  )
}
