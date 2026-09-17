import { useState } from 'react'
import { faqItems } from '../../data/faq.ts'
import { Section } from '../ui/Section.tsx'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section
      id="faq"
      kicker="FAQ"
      title="Kurze Antworten, ohne Versprechen aus der Luft."
      intro="Wenn etwas unsicher ist, steht das auch so da."
    >
      <div>
        {faqItems.map((item, index) => {
          const expanded = open === index
          return (
            <article className="faq-item" key={item.q}>
              <h3>
                <button
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  {item.q}
                  <span aria-hidden="true">{expanded ? '–' : '+'}</span>
                </button>
              </h3>
              {expanded ? <p>{item.a}</p> : null}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
