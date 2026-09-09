import { Article } from '../../data/articles'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useBookmarks } from '../../contexts/BookmarkContext'

interface FeatureHeroProps {
  article: Article
  onNavigate: (path: string) => void
  active?: boolean
}

export default function FeatureHero({ article, onNavigate, active = true }: FeatureHeroProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks()

  return (
    <div className={`hero-slide ${active ? 'active' : ''}`} aria-hidden={!active}>
      <section className="feature-hero" onClick={() => onNavigate(`/article/${article.slug}`)}>
      <img src={article.image} alt={article.title} loading="eager" />
      <div className="feature-hero-overlay">
        <span className="kicker">{article.category}</span>
        <h1 className="feature-hero-title">{article.title}</h1>
        <p className="feature-hero-dek">{article.dek}</p>
        <div className="feature-hero-meta">
          <span className="byline">
            <span className="author">{article.author}</span>
            <span className="sep">·</span>
            <span>{article.publishedAt}</span>
            <span className="sep">·</span>
            <span>{article.readTime} min read</span>
          </span>
          <button
            className="bookmark-btn-light"
            onClick={(e) => {
              e.stopPropagation()
              toggleBookmark(article.id)
            }}
            title={isBookmarked(article.id) ? 'Remove bookmark' : 'Bookmark'}
          >
            {isBookmarked(article.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
      </div>
    </section>
    </div>
  )
}