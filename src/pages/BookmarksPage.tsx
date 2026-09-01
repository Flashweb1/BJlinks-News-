import { useBookmarks } from '../contexts/BookmarkContext'
import { articles } from '../data/articles'
import ArticleCard from '../components/article/ArticleCard'

interface BookmarksPageProps {
  onNavigate: (path: string) => void
}

export default function BookmarksPage({ onNavigate }: BookmarksPageProps) {
  const { bookmarks } = useBookmarks()
  const bookmarkedArticles = articles.filter((a) => bookmarks.includes(a.id))

  return (
    <main className="bookmarks-page">
      <div className="section-header">
        <h1>Bookmarks</h1>
        <p className="section-count">{bookmarkedArticles.length} saved articles</p>
      </div>
      <div className="section-rule" />

      {bookmarkedArticles.length > 0 ? (
        <div className="article-grid">
          {bookmarkedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No bookmarks yet. Save articles to read later by clicking the bookmark icon.</p>
          <button className="btn-primary" onClick={() => onNavigate('/')}>
            Browse Articles
          </button>
        </div>
      )}
    </main>
  )
}