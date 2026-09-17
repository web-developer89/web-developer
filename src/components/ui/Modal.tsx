import { useEffect, useRef, type ReactNode } from 'react'
import { useLockBody } from '../../hooks/useLockBody.ts'

type ModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useLockBody(open)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <h2 id="dialog-title" style={{ fontSize: '2rem' }}>
            {title}
          </h2>
          <button className="icon-btn" onClick={onClose} ref={closeRef} aria-label="Schließen">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
