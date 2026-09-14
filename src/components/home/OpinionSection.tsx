import { Article } from '../../data/articles'
import './home.css'

interface OpinionSectionProps {
  articles: Article[]
  onNavigate: (path: string) => void
}

export default function OpinionSection({ articles, onNavigate }: OpinionSectionProps) {
  return (
    <section className="opinion-section">
      <div className="section-header-home">
        <h2 className="section-title">Opinion & Analysis</h2>
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
            </div>
            <div className="opinion-content">
              <span className="opinion-category">{article.category}</span>
              <h3 className="opinion-headline">{article.title}</h3>
              <div className="opinion-byline">
                <span className="opinion-author">{article.author}</span>
                <span className="opinion-sep">·</span>
                <span className="opinion-date">{article.publishedAt}</span>
              </div>
              <button className="read-more-btn">Read more</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
