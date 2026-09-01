import { ReactNode, HTMLAttributes } from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  isDismissible?: boolean
  onDismiss?: () => void
  role?: string
}

const variantIcons = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
}

/**
 * Alert - Status message component
 * Features:
 * - Semantic color variants
 * - Icon indicators
 * - Dismissible option
 * - Accessible roles
 */
export function Alert({
  children,
  variant = 'info',
  title,
  isDismissible = false,
  onDismiss,
  className = '',
  ...props
}: AlertProps) {
  const baseClass = `alert alert-${variant}`
  const classes = [baseClass, className].filter(Boolean).join(' ')

  const roleMap = {
    success: 'status',
    error: 'alert',
    warning: 'alert',
    info: 'status',
  }

  return (
    <div className={classes} role={roleMap[variant]} aria-live="polite" {...props}>
      <div className="alert-icon" aria-hidden="true">
        {variantIcons[variant]}
      </div>

      <div className="alert-content">
        {title && <h4 className="alert-title">{title}</h4>}
        <div className="alert-description">{children}</div>
      </div>

      {isDismissible && (
        <button
          className="alert-close"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          type="button"
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export default Alert
