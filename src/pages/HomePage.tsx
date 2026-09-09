import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import type { Article } from '../data/articles'
import { getFeaturedArticles, getLatestArticles, getArticlesByCategory } from '../firebase/articles'
import HeroSlider from '../components/article/HeroSlider'
import ArticleCard from '../components/article/ArticleCard'
import CategoryIndex from '../components/article/CategoryIndex'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import HomeSidebar from '../components/home/HomeSidebar'
import { SkeletonHero, SkeletonCard, SkeletonLine } from '../components/common/SkeletonLoader'
import { buildCanonicalUrl, getSiteConfig } from '../utils/security'

interface HomePageProps {
  onNavigate: (path: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const cfg = getSiteConfig()
  const [featured, setFeatured] = useState<Article[]>([])
  const [latest, setLatest] = useState<Article[]>([])
  const [politics, setPolitics] = useState<Article[]>([])
  const [business, setBusiness] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancelled = false

    void Promise.all([
      getFeaturedArticles(4),
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
            {featured.length > 0 && <HeroSlider articles={featured} onNavigate={onNavigate} />}

            <CategoryIndex onNavigate={onNavigate} />

            <section className="section">
              <Reveal>
                <SectionHeader title="Latest News" accent="Live" count={latest.length} />
              </Reveal>
              <div className="home-main-grid">
                <div className="article-grid">
                  {latest.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onNavigate={onNavigate}
                      variant="grid"
                      reveal
                      revealDelay={(i % 3) * 90}
                    />
                  ))}
                </div>
                <Reveal variant="fade" delay={150} className="home-sidebar-sticky">
                  <HomeSidebar articles={latest} onNavigate={onNavigate} />
                </Reveal>
              </div>
            </section>

            {politics.length > 0 && (
              <section className="section">
                <Reveal>
                  <SectionHeader
                    title="Politics"
                    accent="D.C. & Abuja Desk"
                    onSeeAll={() => onNavigate('/category/politics')}
                  />
                </Reveal>
                <div className="article-row">
                  {politics.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onNavigate={onNavigate}
                      variant="compact"
                      reveal
                      revealDelay={i * 90}
                    />
                  ))}
                </div>
              </section>
            )}

            {business.length > 0 && (
              <section className="section">
                <Reveal>
                  <SectionHeader
                    title="Business"
                    accent="Markets & Money"
                    onSeeAll={() => onNavigate('/category/business')}
                  />
                </Reveal>
                <div className="article-row">
                  {business.map((article, i) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onNavigate={onNavigate}
                      variant="compact"
                      reveal
                      revealDelay={i * 90}
                    />
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