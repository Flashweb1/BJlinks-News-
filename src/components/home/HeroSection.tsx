import { Article } from '../../data/articles'
import { useReveal } from '../../hooks/useReveal'
import './home.css'

interface HeroSectionProps {
  article: Article
  onNavigate: (path: string) => void
}

export default function HeroSection({ article, onNavigate }: HeroSectionProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section
      ref={ref}
      className={`hero-section ${visible ? 'is-visible' : ''}`}
      onClick={() => onNavigate(`/article/${article.slug}`)}
    >
      <img src={article.image} alt={article.title} className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">{article.category}</div>
        <h1 className="hero-title">{article.title}</h1>
        <p className="hero-dek">{article.dek}</p>
        <div className="hero-meta">
          <span className="hero-author">{article.author}</span>
          <span className="hero-sep">·</span>
          <span className="hero-date">{article.publishedAt}</span>
          <span className="hero-sep">·</span>
          <span className="hero-readtime">{article.readTime} min read</span>
        </div>
      </div>
    </section>
  )
}
