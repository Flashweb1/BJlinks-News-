import { Article } from '../../data/articles'
import { ArrowRight } from 'lucide-react'
import './home.css'

interface OpinionSectionProps {
  articles: Article[]
  onNavigate: (path: string) => void
  title?: string
  categorySlug?: string
  subtitle?: string
}

export default function OpinionSection({
  articles,
  onNavigate,
  title = 'Opinion & Analysis',
  categorySlug,
  subtitle,
}: OpinionSectionProps) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="opinion-section">
      <div className="section-header-home">
        <div className="section-title-wrapper">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {categorySlug && (
          <button
            type="button"
            className="section-see-all-link"
            onClick={() => onNavigate(`/category/${categorySlug}`)}
            aria-label={`See all ${title} stories`}
          >
            <span>See all</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        )}
        <div className="section-rule" />
      </div>

      <div className="opinion-grid">
        {articles.slice(0, 3).map((article) => (
          <article
            key={article.id}
            className="opinion-card"
            onClick={() => onNavigate(`/article/${article.slug}`)}
          >
            <div className="opinion-image">
              <img src={article.image} alt={article.title} loading="lazy" />
              <span className="opinion-image-badge">{article.category}</span>
            </div>
            <div className="opinion-content">
              <h3 className="opinion-headline">{article.title}</h3>
              <p className="opinion-dek">{article.dek}</p>
              <div className="opinion-byline">
                <span className="opinion-author">{article.author}</span>
                <span className="opinion-sep">·</span>
                <span className="opinion-date">{article.publishedAt}</span>
              </div>
              <div className="read-more-wrapper">
                <span className="read-more-btn">
                  Read article <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
