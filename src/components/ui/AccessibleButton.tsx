import { ButtonHTMLAttributes, ReactNode } from 'react'

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  isDisabled?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  ariaLabel?: string
  ariaDescribedBy?: string
  ariaExpanded?: boolean
  ariaPressed?: boolean
  ariaControls?: string
}

/**
 * AccessibleButton - WCAG 2.1 AA compliant button component
 * Features:
 * - Proper focus management
 * - ARIA attributes
 * - Loading state indication
 * - Keyboard navigation
 * - Touch target size (44px minimum)
 */
export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaPressed,
  ariaControls,
  ...props
}: AccessibleButtonProps) {
  const baseClass = `btn btn-${variant} btn-${size}`
  const classes = [baseClass, className].filter(Boolean).join(' ')

  // Combine variant and disabled state for accessibility
  const isButtonDisabled = isDisabled || isLoading

  return (
    <button
      className={classes}
      disabled={isButtonDisabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      aria-controls={ariaControls}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="spinner" role="status" aria-label="Loading">
          <span className="sr-only">Loading...</span>
        </span>
      )}

      <span className={`flex items-center gap-2 ${isLoading ? 'opacity-50' : ''}`}>
        {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
      </span>
    </button>
  )
}

export default AccessibleButton
