import { useReveal } from '../../hooks/useReveal'

type RevealVariant = 'fade' | 'fade-up' | 'fade-left' | 'fade-right' | 'scale'

interface RevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

const NAMED_VARIANTS: RevealVariant[] = ['fade-up', 'fade-left', 'fade-right', 'scale']

export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  const Tag = as as 'div'
  const variantClass = NAMED_VARIANTS.includes(variant) ? variant : 'fade'

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal reveal-${variantClass} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}