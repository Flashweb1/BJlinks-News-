import { useState } from 'react'
import { Article } from '../../data/articles'
import { Bookmark, BookmarkCheck, ArrowLeft, Clock, Share2, Type, Play, Pause, Check, Volume2 } from 'lucide-react'
import { useBookmarks } from '../../contexts/BookmarkContext'

interface ArticleDetailProps {
  article: Article
  onNavigate: (path: string) => void
  relatedArticles?: Article[]
}

export default function ArticleDetail({ article, onNavigate, relatedArticles = [] }: ArticleDetailProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal')
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.dek,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio)
  }

  return (
    <article className={`article-detail font-size-${fontSize} font-family-${fontFamily}`}>
      {showToast && (
        <div className="toast-notification">
          <Check size={16} /> Link copied to clipboard
        </div>
      )}

      <div className="article-detail-header">
        <button className="back-btn" onClick={() => onNavigate('/')}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="article-reader-toolbar">
          <div className="toolbar-group" title="Adjust text size">
            <button
              className={`toolbar-btn ${fontSize === 'normal' ? 'active' : ''}`}
              onClick={() => setFontSize('normal')}
            >
              A<sup>-</sup>
            </button>
            <button
              className={`toolbar-btn ${fontSize === 'large' ? 'active' : ''}`}
              onClick={() => setFontSize('large')}
            >
              A
            </button>
            <button
              className={`toolbar-btn ${fontSize === 'xlarge' ? 'active' : ''}`}
              onClick={() => setFontSize('xlarge')}
            >
              A<sup>+</sup>
            </button>
          </div>

          <div className="toolbar-divider" />

          <button
            className={`toolbar-btn ${fontFamily === 'serif' ? 'active' : ''}`}
            onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
            title="Toggle Serif / Sans Font"
          >
            <Type size={15} />
            <span>{fontFamily === 'serif' ? 'Serif' : 'Sans'}</span>
          </button>
        </div>

        <div className="article-detail-actions">
          <button
            className="icon-btn"
            onClick={() => toggleBookmark(article.id)}
            title={isBookmarked(article.id) ? 'Remove bookmark' : 'Bookmark'}
          >
            {isBookmarked(article.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
          <button className="icon-btn" onClick={handleShare} title="Share Article">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <header className="article-detail-hero">
        <img src={article.image} alt={article.title} />
        <div className="article-detail-hero-overlay">
          <span className="kicker">{article.category}</span>
          <h1>{article.title}</h1>
        </div>
      </header>

      <div className="article-detail-content">
        <div className="article-detail-meta">
          <div className="byline">
            <span className="author">{article.author}</span>
            <span className="author-role">{article.authorRole}</span>
          </div>
          <div className="article-detail-info">
            <span>{article.publishedAt}</span>
            <span className="sep">·</span>
            <Clock size={14} />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        {/* Audio Listen Bar */}
        <div className="audio-listen-bar">
          <button className="audio-play-btn" onClick={toggleAudio}>
            {isPlayingAudio ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <div className="audio-info">
            <div className="audio-title">
              <Volume2 size={14} /> Listen to Article (Audio Version)
            </div>
            <div className="audio-subtitle">
              {isPlayingAudio ? 'Playing AI Narration...' : `${article.readTime} min audio summary available`}
            </div>
          </div>
        </div>

        <p className="article-dek">{article.dek}</p>

        {/* Key Takeaways Box */}
        <div className="key-takeaways">
          <h4><span className="gold-bullet">❖</span> Executive Summary</h4>
          <ul>
            <li>Core insights and major updates reported in this official release.</li>
            <li>Key decisions affecting local commerce, infrastructure, and community development.</li>
          </ul>
        </div>

        <div className="article-body">
          {article.body.map((paragraph, i) => (
            <p key={i} className={i === 0 ? 'first-paragraph' : ''}>
              {i === 0 && <span className="drop-cap">{paragraph.charAt(0)}</span>}
              {i === 0 ? paragraph.slice(1) : paragraph}
            </p>
          ))}
        </div>

        <div className="article-tags">
          {article.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="article-end-mark">■</div>
      </div>

      {relatedArticles.length > 0 && (
        <aside className="related-articles">
          <h3>Related Stories</h3>
          <div className="related-grid">
            {relatedArticles.map((related) => (
              <div
                key={related.id}
                className="related-card"
                onClick={() => onNavigate(`/article/${related.slug}`)}
              >
                <img src={related.image} alt={related.title} loading="lazy" />
                <div>
                  <span className="kicker">{related.category}</span>
                  <h4>{related.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </article>
  )
}