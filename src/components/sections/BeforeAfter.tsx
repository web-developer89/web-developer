import { useRef, useState, type PointerEvent } from 'react'
import { Section } from '../ui/Section.tsx'

export function BeforeAfter() {
  const [pos, setPos] = useState(52)
  const ref = useRef<HTMLDivElement>(null)

  function setFromClientX(clientX: number) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(92, Math.max(8, next)))
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    setFromClientX(event.clientX)
  }

  return (
    <Section
      id="vergleich"
      kicker="Vorher / Nachher"
      title="Alt muss nicht bleiben."
      intro="Kein bestehendes Unternehmen kopiert – nur die Idee: unübersichtlich gegen klar. Ziehe den Regler."
    >
      <div
        className="compare"
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) setFromClientX(event.clientX)
        }}
      >
        <div className="compare-pane mock-new">
          <p className="kicker">Modern</p>
          <h3 style={{ fontSize: '2rem', margin: '8px 0' }}>Ruhig. Lesbar. Auf dem Handy zuerst.</h3>
          <p className="muted">Große Typo, klare Anfrage, Bilder mit Luft.</p>
          <div className="chips" style={{ marginTop: 16 }}>
            <span className="chip is-on">Anfrage</span>
            <span className="chip">Galerie</span>
          </div>
        </div>
        <div className="compare-pane compare-old mock-old" style={{ width: `${pos}%` }}>
          <p style={{ fontSize: 13 }}>Willkommen auf unserer Homepage!!!</p>
          <p style={{ marginTop: 8 }}>Klicken Sie hier · Unterseiten · News 12/2009</p>
          <p style={{ marginTop: 18, fontSize: 28 }}>UNSER BETRIEB</p>
          <p>Besuchen Sie uns. Rufen Sie an. Faxen Sie uns.</p>
        </div>
        <div className="compare-handle" style={{ left: `${pos}%` }}>
          <span aria-hidden="true">↔</span>
        </div>
      </div>
      <label className="sr-only" htmlFor="compare-range">
        Vergleichsregler
      </label>
      <input
        id="compare-range"
        type="range"
        min={8}
        max={92}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        style={{ width: '100%', marginTop: 14 }}
      />
    </Section>
  )
}
