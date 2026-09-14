import { Article } from '../../data/articles'
import { useReveal } from '../../hooks/useReveal'
import './home.css'

interface FeaturedMoreNewsletterProps {
  featuredArticle: Article | undefined
  moreNewsArticles: Article[]
  onNavigate: (path: string) => void
}

export default function FeaturedMoreNewsletter({
  featuredArticle,
  moreNewsArticles,
  onNavigate,
}: FeaturedMoreNewsletterProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section ref={ref} className={`featured-more-newsletter ${visible ? 'is-visible' : ''}`}>
      <div className="three-column-layout">
        {/* Featured Section */}
        {featuredArticle && (
          <div className="featured-column">
            <div className="featured-card">
              <img src={featuredArticle.image} alt={featuredArticle.title} />
              <div className="featured-overlay" />
              <div className="featured-content">
                <span className="featured-category">{featuredArticle.category}</span>
                <h3 className="featured-headline">{featuredArticle.title}</h3>
                <div className="featured-meta">
                  <span>{featuredArticle.author}</span>
                  <span>·</span>
                  <span>{featuredArticle.publishedAt}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* More News Section */}
        <div className="more-news-column">
          <div className="more-news-header">
            <h3 className="more-news-title">More News</h3>
            <div className="more-news-rule" />
          </div>
          <div className="more-news-list">
            {moreNewsArticles.slice(0, 5).map((article) => (
              <article
                key={article.id}
                className="more-news-item"
                onClick={() => onNavigate(`/article/${article.slug}`)}
              >
                <h4 className="more-news-headline">{article.title}</h4>
                <span className="more-news-time">{article.publishedAt}</span>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-column">
          <div className="newsletter-card">
            <h3 className="newsletter-title">Stay Updated</h3>
            <p className="newsletter-subtitle">Get daily headlines delivered to your inbox</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            <p className="newsletter-note">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
