import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import type { Article } from '../data/articles'
import { getFeaturedArticle, getLatestArticles, getArticlesByCategory } from '../firebase/articles'
import FeatureHero from '../components/article/FeatureHero'
import ArticleCard from '../components/article/ArticleCard'
import CategoryIndex from '../components/article/CategoryIndex'
import { SkeletonHero, SkeletonCard, SkeletonLine } from '../components/common/SkeletonLoader'
import { buildCanonicalUrl, getSiteConfig } from '../utils/security'

interface HomePageProps {
  onNavigate: (path: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const cfg = getSiteConfig()
  const [featured, setFeatured] = useState<Article | undefined>(undefined)
  const [latest, setLatest] = useState<Article[]>([])
  const [politics, setPolitics] = useState<Article[]>([])
  const [business, setBusiness] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancelled = false

    void Promise.all([
      getFeaturedArticle(),
      getLatestArticles(8),
      getArticlesByCategory('Politics'),
      getArticlesByCategory('Business'),
    ]).then(([f, l, p, b]) => {
      if (cancelled) return
      setFeatured(f)
      setLatest(l)
      setPolitics(p.slice(0, 3))
      setBusiness(b.slice(0, 3))
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="home-page">
      <Helmet>
        <title>{cfg.name} — Information for living</title>
        <meta name="description" content={cfg.description} />
        <meta property="og:title" content={`${cfg.name} — Information for living`} />
        <meta property="og:description" content={cfg.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={buildCanonicalUrl('/')} />
      </Helmet>

      {loading ? (
        <div className="section" style={{ paddingBlock: '2.5rem 1rem' }} aria-busy="true">
          <SkeletonHero />
          <div className="section-header" style={{ marginTop: '2.5rem', marginBottom: '0.5rem' }}>
            <SkeletonLine width="28%" height="22px" />
            <div className="section-rule" />
          </div>
          <div className="article-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      ) : (
          <>
            {featured && <FeatureHero article={featured} onNavigate={onNavigate} />}

            <CategoryIndex onNavigate={onNavigate} />

            <section className="section">
              <div className="section-header">
                <h2>Latest News</h2>
                <div className="section-rule" />
              </div>
              <div className="article-grid">
                {latest.map((article) => (
                  <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
                ))}
              </div>
            </section>

            {politics.length > 0 && (
              <section className="section">
                <div className="section-header">
                  <h2>Politics</h2>
                  <button className="see-all" onClick={() => onNavigate('/category/politics')}>
                    See all →
                  </button>
                </div>
                <div className="section-rule" />
                <div className="article-row">
                  {politics.map((article) => (
                    <ArticleCard key={article.id} article={article} onNavigate={onNavigate} variant="compact" />
                  ))}
                </div>
              </section>
            )}

            {business.length > 0 && (
              <section className="section">
                <div className="section-header">
                  <h2>Business</h2>
                  <button className="see-all" onClick={() => onNavigate('/category/business')}>
                    See all →
                  </button>
                </div>
                <div className="section-rule" />
                <div className="article-row">
                  {business.map((article) => (
                    <ArticleCard key={article.id} article={article} onNavigate={onNavigate} variant="compact" />
                  ))}
                </div>
              </section>
            )}
          </>
        )
      }
    </main>
  )
}
