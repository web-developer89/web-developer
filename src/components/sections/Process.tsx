import { processSteps } from '../../data/process.ts'
import { Section } from '../ui/Section.tsx'

export function Process() {
  return (
    <Section
      id="ablauf"
      kicker="Ablauf"
      title="Einfach halten."
      intro="Kein Agenturtheater. Sechs Schritte, die du nachvollziehen kannst – auch beim ersten Website-Projekt."
    >
      <div className="timeline">
        {processSteps.map((step) => (
          <article className="step" key={step.n}>
            <div className="step-n">{step.n}</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 800 }}>
                {step.title}
              </h3>
              <p className="muted">{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
