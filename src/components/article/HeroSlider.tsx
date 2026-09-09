import { useCallback, useEffect, useState } from 'react'
import type { Article } from '../../data/articles'
import FeatureHero from './FeatureHero'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface HeroSliderProps {
  articles: Article[]
  onNavigate: (path: string) => void
}

const SLIDE_MS = 6000

export default function HeroSlider({ articles, onNavigate }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = articles.length

  const go = useCallback(
    (i: number) => {
      setCurrent(((i % count) + count) % count)
    },
    [count]
  )

  useEffect(() => {
    if (count <= 1 || paused) return
    const id = window.setInterval(() => setCurrent((c) => (c + 1) % count), SLIDE_MS)
    return () => window.clearInterval(id)
  }, [count, paused])

  if (count === 0) return null

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') go(current + 1)
    if (e.key === 'ArrowLeft') go(current - 1)
  }

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured stories"
    >
      <div className="hero-slides">
        {articles.map((article, i) => (
          <FeatureHero
            key={article.id}
            article={article}
            onNavigate={onNavigate}
            active={i === current}
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <div className="hero-controls">
            <button
              type="button"
              className="hero-arrow"
              aria-label="Previous story"
              onClick={() => go(current - 1)}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              className="hero-arrow"
              aria-label="Next story"
              onClick={() => go(current + 1)}
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="hero-pager" role="tablist" aria-label="Featured stories">
            {articles.map((article, i) => (
              <button
                key={article.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Story ${i + 1}: ${article.title}`}
                className={`hero-dot ${i === current ? 'active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}