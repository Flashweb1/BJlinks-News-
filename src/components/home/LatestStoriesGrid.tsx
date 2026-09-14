import { Article } from '../../data/articles'
import ArticleCard from '../article/ArticleCard'
import './home.css'

interface LatestStoriesGridProps {
  articles: Article[]
  onNavigate: (path: string) => void
}

export default function LatestStoriesGrid({ articles, onNavigate }: LatestStoriesGridProps) {
  return (
    <section className="latest-stories-section">
      <div className="section-header-home">
        <h2 className="section-title">Latest Stories</h2>
        <div className="section-rule" />
      </div>
      <div className="latest-grid">
        {articles.slice(0, 12).map((article, i) => (
          <ArticleCard
            key={article.id}
            article={article}
            onNavigate={onNavigate}
            variant="grid"
            reveal
            revealDelay={(i % 4) * 75}
          />
        ))}
      </div>
    </section>
  )
}
