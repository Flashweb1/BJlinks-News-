import { useParams } from 'react-router-dom'
import { getArticlesByCategory, categories } from '../data/articles'
import ArticleCard from '../components/article/ArticleCard'
import CategoryIndex from '../components/article/CategoryIndex'

interface CategoryPageProps {
  onNavigate: (path: string) => void
  slug?: string
}

export default function CategoryPage({ onNavigate, slug: propSlug }: CategoryPageProps) {
  const { slug: routeSlug } = useParams<{ slug: string }>()
  const slug = (propSlug ?? routeSlug ?? '').toLowerCase()
  const category = categories.find((c) => c.slug === slug)
  const articlesList = getArticlesByCategory(slug)

  return (
    <main className="category-page">
      <CategoryIndex onNavigate={onNavigate} activeCategory={slug} />

      <div className="section">
        <div className="section-header">
          <h1>{category?.label || 'Category'}</h1>
          <p className="section-count">{articlesList.length} articles</p>
        </div>
        <div className="section-rule" />

        {articlesList.length > 0 ? (
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