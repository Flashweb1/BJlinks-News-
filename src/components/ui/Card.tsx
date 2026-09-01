import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'flat' | 'elevated' | 'interactive'
  size?: 'sm' | 'md' | 'lg'
  isClickable?: boolean
  onClick?: () => void
}

/**
 * Card - Premium elevated or flat surface component
 * Features:
 * - Multiple elevation variants
 * - Interactive hover states
 * - Size options
 * - Smooth transitions
 */
export function Card({
  children,
  variant = 'flat',
  size = 'md',
  isClickable = false,
  className = '',
  ...props
}: CardProps) {
  const baseClass = `card card-${variant} card-${size}`
  const interactiveClass = isClickable ? 'card-interactive cursor-pointer' : ''
  const classes = [baseClass, interactiveClass, className].filter(Boolean).join(' ')

  return (
    <div className={classes} role={isClickable ? 'button' : undefined} {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title?: string
  subtitle?: string
  actions?: ReactNode
}

export function CardHeader({ children, title, subtitle, actions, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`card-header ${className}`} {...props}>
      {title && <h3>{title}</h3>}
      {subtitle && <p className="text-sm text-tertiary">{subtitle}</p>}
      {children}
      {actions && <div className="card-header-actions">{actions}</div>}
    </div>
  )
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardBody({ children, className = '', ...props }: CardBodyProps) {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  align?: 'start' | 'center' | 'end' | 'between'
}

export function CardFooter({ children, align = 'between', className = '', ...props }: CardFooterProps) {
  const alignClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }[align]

  return (
    <div className={`card-footer ${alignClass} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
