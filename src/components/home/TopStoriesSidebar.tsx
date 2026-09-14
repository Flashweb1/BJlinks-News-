import { Article } from '../../data/articles'
import './home.css'

interface TopStoriesSidebarProps {
  articles: Article[]
  onNavigate: (path: string) => void
}

export default function TopStoriesSidebar({ articles, onNavigate }: TopStoriesSidebarProps) {
  return (
    <aside className="top-stories-sidebar" aria-label="Editor's Picks">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <h2 className="sidebar-title">Editor's Picks</h2>
          <span className="sidebar-badge">Top 5</span>
        </div>
        <p className="sidebar-subtitle">Curated briefings from our newsroom</p>
        <div className="sidebar-rule" />
      </div>

      <ol className="top-stories-list">
        {articles.slice(0, 5).map((article, index) => (
          <li
            key={article.id}
            className="top-story-item"
            onClick={() => onNavigate(`/article/${article.slug}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onNavigate(`/article/${article.slug}`)
              }
            }}
          >
            <span className="story-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="story-content">
              <div className="story-thumbnail">
                <img src={article.image} alt={article.title} loading="lazy" />
              </div>
              <div className="story-text">
                <span className="story-category">{article.category}</span>
                <h3 className="story-headline">{article.title}</h3>
                <div className="story-meta-inline">
                  <time className="story-time">{article.publishedAt}</time>
                  <span className="story-sep">·</span>
                  <span className="story-readtime">{article.readTime}m read</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  )
}
