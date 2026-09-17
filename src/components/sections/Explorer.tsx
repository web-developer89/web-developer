import { useState } from 'react'
import { explorerTypes } from '../../data/explorer.ts'
import { Section } from '../ui/Section.tsx'
import { SpotlightCard } from '../ui/SpotlightCard.tsx'
import { cn } from '../../utils/cn.ts'

export function Explorer() {
  const [id, setId] = useState<(typeof explorerTypes)[number]['id']>('ferienwohnung')
  const current = explorerTypes.find((item) => item.id === id) ?? explorerTypes[0]

  return (
    <Section
      id="moeglichkeiten"
      kicker="Möglichkeiten"
      title="Was brauchst du – konkret?"
      intro="Wähle einen Typ. Die Seite zeigt, welche Bausteine dort typischerweise Sinn ergeben. Das ist Orientierung, kein fertiges Paket."
    >
      <div className="explorer">
        <div className="chips" role="list">
          {explorerTypes.map((item) => (
            <button
              key={item.id}
              className={cn('chip', item.id === id && 'is-on')}
              onClick={() => setId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <SpotlightCard className="spot-card">
          <p className="kicker">{current.kicker}</p>
          <h3 style={{ fontSize: '2.1rem', margin: '8px 0 10px' }}>{current.label}</h3>
          <p className="muted">{current.intro}</p>
          <ul className="check-list">
            {current.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </SpotlightCard>
      </div>
    </Section>
  )
}
