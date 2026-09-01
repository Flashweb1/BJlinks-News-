import { ReactNode, HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  isDot?: boolean
}

/**
 * Badge - Inline status indicator component
 * Features:
 * - Semantic color variants
 * - Icon support
 * - Dot variant
 * - Accessible
 */
export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isDot = false,
  className = '',
  ...props
}: BadgeProps) {
  const baseClass = `badge badge-${variant}`
  const sizeClass = isDot ? 'badge-dot' : `badge-${size}`
  const classes = [baseClass, sizeClass, className].filter(Boolean).join(' ')

  if (isDot) {
    return <span className={classes} role="status" aria-label={`${variant}: ${children}`} {...props} />
  }

  return (
    <span className={classes} role="status" {...props}>
      {icon && <span className="badge-icon" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
