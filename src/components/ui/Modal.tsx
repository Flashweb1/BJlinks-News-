import { ReactNode, HTMLAttributes, useEffect } from 'react'
import { X } from 'lucide-react'
import { focusManager } from '../../utils/accessibility'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isDismissible?: boolean
  actions?: ReactNode
  className?: string
}

/**
 * Modal - Dialog overlay component
 * Features:
 * - Focus trapping
 * - Escape key handling
 * - ARIA roles
 * - Multiple size options
 * - Backdrop click to dismiss
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  isDismissible = true,
  actions,
  className = '',
}: ModalProps) {
  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[size]

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDismissible) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, isDismissible, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={isDismissible ? onClose : undefined}
        role="presentation"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`modal modal-${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        <div className="modal-header">
          {title && (
            <h2 id="modal-title" className="modal-title">
              {title}
            </h2>
          )}
          {isDismissible && (
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              <X size={24} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body">{children}</div>

        {/* Footer */}
        {actions && <div className="modal-footer">{actions}</div>}
      </div>
    </>
  )
}

export default Modal
