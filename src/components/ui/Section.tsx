import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  kicker: string
  title: string
  intro?: string
  children: ReactNode
}

export function Section({ id, kicker, title, intro, children }: SectionProps) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">{kicker}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          {intro ? <p className="muted">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}
