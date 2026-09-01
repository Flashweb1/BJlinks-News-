import { Article } from '../../data/articles'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useBookmarks } from '../../contexts/BookmarkContext'

interface ArticleCardProps {
  article: Article
  onNavigate: (path: string) => void
  variant?: 'default' | 'compact' | 'sidebar'
}

export default function ArticleCard({ article, onNavigate, variant = 'default' }: ArticleCardProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks()

  return (
    <article className={`article-card ${variant}`} onClick={() => onNavigate(`/article/${article.slug}`)}>
      <div className="article-card-image">
        <img src={article.image} alt={article.title} loading="lazy" />
        <span className="kicker">{article.category}</span>
      </div>
      <div className="article-card-body">
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-dek">{article.dek}</p>
        <div className="article-card-meta">
          <span className="article-card-author">{article.author}</span>
          <span className="article-card-sep">·</span>
          <span className="article-card-date">{article.publishedAt}</span>
          <span className="article-card-sep">·</span>
          <span className="article-card-readtime">{article.readTime} min read</span>
          <button
            className="bookmark-btn"
            onClick={(e) => {
              e.stopPropagation()
              toggleBookmark(article.id)
            }}
            title={isBookmarked(article.id) ? 'Remove bookmark' : 'Bookmark'}
          >
            {isBookmarked(article.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>
    </article>
  )
}