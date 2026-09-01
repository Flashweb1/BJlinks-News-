import { useParams } from 'react-router-dom'
import { getArticleBySlug, getRelatedArticles } from '../firebase/articles'
import { useState, useEffect } from 'react'
import ArticleDetail from '../components/article/ArticleDetail'

interface ArticlePageProps {
  onNavigate: (path: string) => void
  slug?: string
}

export default function ArticlePage({ onNavigate, slug: propSlug }: ArticlePageProps) {
  const { slug: routeSlug } = useParams<{ slug: string }>()
  const slug = propSlug || routeSlug
  const [article, setArticle] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])

  useEffect(() => {
    if (!slug) return

    const loadArticle = async () => {
      const articleData = await getArticleBySlug(slug)
      setArticle(articleData)

      if (articleData) {
        getRelatedArticles(articleData.id, articleData.category)
          .then(setRelated)
      }
    }

    loadArticle()
  }, [slug])

  if (!article) {
    return (
      <main className="error-page">
        <h1>Article Not Found</h1>
        <p>The article you're looking for doesn't exist or has been moved.</p>
        <button onClick={() => onNavigate('/')}>← Back to Home</button>
      </main>
    )
  }

  return <ArticleDetail article={article} onNavigate={onNavigate} relatedArticles={related} />
}