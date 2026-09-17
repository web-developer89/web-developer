import { useState } from 'react'
import { universeFeatures } from '../../data/features.ts'
import { cn } from '../../utils/cn.ts'

export function FeatureUniverse() {
  const [id, setId] = useState<(typeof universeFeatures)[number]['id'] | null>('kalender')
  const current = universeFeatures.find((item) => item.id === id)

  return (
    <section className="section" id="universum" aria-labelledby="universum-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Feature-Universum</p>
          <h2 id="universum-title">Deine Website kann mehr.</h2>
          <p className="muted">
            Tippe auf einen Begriff. Es erscheint eine kurze Erklärung – nicht ein Verkaufstext.
          </p>
        </div>
        <div className="universe">
          {universeFeatures.map((item) => (
            <button
              key={item.id}
              className={cn('pill', item.id === id && 'is-on')}
              onClick={() => setId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="feature-detail" aria-live="polite">
          {current ? (
            <>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 800 }}>
                {current.label}
              </h3>
              <p className="muted" style={{ marginTop: 8 }}>
                {current.blurb}
              </p>
            </>
          ) : (
            <p className="muted">Wähle ein Feature.</p>
          )}
        </div>
      </div>
    </section>
  )
}
