import { HTMLAttributes } from 'react'

const baseSkeletonClass =
  'relative overflow-hidden bg-[var(--card-stroke,#e9e2d7)] rounded-[6px]'

function Shimmer() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
      }}
    />
  )
}

export function SkeletonLine({
  className = '',
  width = '100%',
  height = '1rem',
  ...rest
}: HTMLAttributes<HTMLDivElement> & { width?: string | number; height?: string | number }) {
  return (
    <div
      className={`${baseSkeletonClass} ${className}`}
      style={{ width, height, ...(rest.style ?? {}) }}
      aria-hidden
    >
      <Shimmer />
    </div>
  )
}

export function SkeletonCard({
  className = '',
  showImage = true,
  lines = 3,
}: {
  className?: string
  showImage?: boolean
  lines?: number
}) {
  return (
    <div className={`article-card opacity-80 ${className}`} aria-hidden>
      {showImage && (
        <div className="article-card-image">
          <div className={`${baseSkeletonClass} !rounded-none w-full h-full`}>
            <Shimmer />
          </div>
        </div>
      )}
      <div className="article-card-content" style={{ paddingBlock: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <SkeletonLine width="32%" height="11px" />
        <SkeletonLine width="100%" height="22px" />
        {Array.from({ length: Math.max(1, lines - 1) }).map((_, i) => (
          <SkeletonLine
            key={i}
            width={i === lines - 2 ? '70%' : '100%'}
            height="14px"
          />
        ))}
        <SkeletonLine width="40%" height="12px" style={{ marginTop: 'auto' }} />
      </div>
    </div>
  )
}

export function SkeletonHero() {
  return (
    <section className="feature-hero" aria-hidden>
      <div className="feature-hero-image">
        <div className={`${baseSkeletonClass} !rounded-none w-full h-full`}>
          <Shimmer />
        </div>
      </div>
      <div className="feature-hero-overlay" />
      <div className="feature-hero-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <SkeletonLine width="30%" height="14px" />
        <SkeletonLine width="95%" height="44px" />
        <SkeletonLine width="95%" height="44px" />
        <SkeletonLine width="80%" height="22px" />
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <SkeletonLine width="32px" height="32px" style={{ borderRadius: '999px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <SkeletonLine width="140px" height="14px" />
            <SkeletonLine width="180px" height="11px" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default { SkeletonLine, SkeletonCard, SkeletonHero }
