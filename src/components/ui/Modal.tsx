import type { ReactNode } from 'react'
import { useEffect } from 'react'

type ModalProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className="modal"
        role="dialog"
      >
        <div className="modal__heading">
          <h2 id="modal-title">{title}</h2>
          <button
            aria-label="Close dialog"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
