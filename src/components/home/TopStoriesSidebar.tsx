import { Article } from '../../data/articles'
import './home.css'

interface TopStoriesSidebarProps {
  articles: Article[]
  onNavigate: (path: string) => void
}

export default function TopStoriesSidebar({ articles, onNavigate }: TopStoriesSidebarProps) {
  return (
    <aside className="top-stories-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Editor's Picks</h2>
        <div className="sidebar-rule" />
      </div>
      <ul className="top-stories-list">
        {articles.slice(0, 5).map((article, index) => (
          <li key={article.id} className="top-story-item">
            <div className="story-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="story-content" onClick={() => onNavigate(`/article/${article.slug}`)}>
              <div className="story-thumbnail">
                <img src={article.image} alt={article.title} loading="lazy" />
              </div>
              <div className="story-text">
                <span className="story-category">{article.category}</span>
                <h3 className="story-headline">{article.title}</h3>
                <time className="story-time">{article.publishedAt}</time>
              </div>
            </div>
            {index < 4 && <div className="story-divider" />}
          </li>
        ))}
      </ul>
    </aside>
  )
}
