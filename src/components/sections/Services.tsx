import { useMemo, useState } from 'react'
import { Section } from '../ui/Section.tsx'
import { serviceCategories } from '../../data/services.ts'
import { cn } from '../../utils/cn.ts'

export function Services() {
  const [active, setActive] = useState<(typeof serviceCategories)[number]['id']>('websites')
  const [expanded, setExpanded] = useState(false)
  const category = serviceCategories.find((item) => item.id === active) ?? serviceCategories[0]
  const items = useMemo(() => {
    if (expanded) return category.items
    return category.items.slice(0, 8)
  }, [category, expanded])

  return (
    <Section
      id="leistungen"
      kicker="Leistungen"
      title="Was ich bauen kann."
      intro="Nicht sechs austauschbare Kacheln – sondern die Bandbreite, die echte Vorhaben brauchen. Du musst nicht alles auf einmal wollen."
    >
      <div className="tabs" role="tablist" aria-label="Leistungskategorien">
        {serviceCategories.map((item) => (
          <button
            key={item.id}
            className={cn('tab', item.id === active && 'is-on')}
            role="tab"
            aria-selected={item.id === active}
            onClick={() => {
              setActive(item.id)
              setExpanded(false)
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="muted" style={{ marginBottom: 16 }}>
        {category.intro}
      </p>
      <div className="service-grid">
        {items.map((item) => (
          <article className="service-card" key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
      {category.items.length > 8 ? (
        <div style={{ marginTop: 16 }}>
          <button className="chip" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Weniger zeigen' : `Alle ${category.items.length} Punkte in ${category.label}`}
          </button>
        </div>
      ) : null}
    </Section>
  )
}
