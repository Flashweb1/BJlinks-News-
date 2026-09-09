import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  onSeeAll?: () => void
  accent?: string
  count?: number
  as?: 'h1' | 'h2'
}

export default function SectionHeader({ title, onSeeAll, accent, count, as = 'h2' }: SectionHeaderProps) {
  const Heading = as

  return (
    <div className="section-header">
      <div className="section-heading">
        <span className="heading-rule" aria-hidden="true" />
        <Heading>{title}</Heading>
        {accent && (
          <span className="heading-accent">
            <span className="accent-dot" aria-hidden="true" />
            {accent}
            {typeof count === 'number' && <em className="accent-count">{count}</em>}
          </span>
        )}
      </div>
      {onSeeAll && (
        <button className="see-all" onClick={onSeeAll} type="button">
          See all <ArrowRight size={14} />
        </button>
      )}
    </div>
  )
}