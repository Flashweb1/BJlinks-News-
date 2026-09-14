import { Article } from '../../data/articles'
import './home.css'

interface TrendingSectionProps {
  articles: Article[]
  onNavigate: (path: string) => void
}

export default function TrendingSection({ articles, onNavigate }: TrendingSectionProps) {
  return (
    <section className="trending-section">
      <div className="section-header-home">
        <h2 className="section-title">Trending Now</h2>
        <div className="section-rule" />
      </div>
      <div className="trending-list">
        {articles.slice(0, 5).map((article, index) => (
          <article
            key={article.id}
            className="trending-item"
            onClick={() => onNavigate(`/article/${article.slug}`)}
          >
            <div className="trending-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="trending-content">
              <h3 className="trending-headline">{article.title}</h3>
              <div className="trending-meta">
                <span className="trending-views">{Math.floor(Math.random() * 50000) + 5000} views</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
