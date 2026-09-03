import { useParams } from 'react-router-dom'
import { categories } from '../data/articles'
import { getArticlesByCategory } from '../firebase/articles'
import ArticleCard from '../components/article/ArticleCard'
import CategoryIndex from '../components/article/CategoryIndex'
import { SkeletonCard, SkeletonLine } from '../components/common/SkeletonLoader'
import { useState, useEffect } from 'react'
import type { Article } from '../data/articles'

interface CategoryPageProps {
  onNavigate: (path: string) => void
  slug?: string
}

export default function CategoryPage({ onNavigate, slug: propSlug }: CategoryPageProps) {
  const { slug: routeSlug } = useParams<{ slug: string }>()
  const slug = (propSlug ?? routeSlug ?? '').toLowerCase()
  const category = categories.find((c) => c.slug === slug)
  const [articlesList, setArticlesList] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    void (async () => {
      const label = category?.label ?? slug
      const data = await getArticlesByCategory(label)
      if (!cancelled) {
        setArticlesList(data)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug, category])

  return (
    <main className="category-page">
      <CategoryIndex onNavigate={onNavigate} activeCategory={slug} />

      <div className="section">
        <div className="section-header">
          <h1>{category?.label || 'Category'}</h1>
          {!loading && <p className="section-count">{articlesList.length} articles</p>}
        </div>
        <div className="section-rule" />

        {loading ? (
          <div className="article-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ paddingBottom: '0.5rem' }}>
                <SkeletonLine width="30%" height="12px" />
                <div style={{ height: '0.4rem' }} />
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : articlesList.length > 0 ? (
          <div className="article-grid">
            {articlesList.map((article) => (
              <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No articles found in this category yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}