import { useState } from 'react'
import { Search } from 'lucide-react'
import { searchArticles } from '../data/articles'
import ArticleCard from '../components/article/ArticleCard'
import { useLocation } from 'react-router-dom'

interface SearchPageProps {
  onNavigate: (path: string) => void
}

export default function SearchPage({ onNavigate }: SearchPageProps) {
  const location = useLocation()
  const [query, setQuery] = useState(() => location.state?.query || '')
  const results = query.length >= 2 ? searchArticles(query) : []

  return (
    <main className="search-page">
      <div className="search-header">
        <h1>Search</h1>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search articles, topics, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="search-input"
          />
        </div>
      </div>

      <div className="search-results">
        {query.length >= 2 && (
          <p className="search-count">
            {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
          </p>
        )}

        {results.length > 0 ? (
          <div className="article-grid">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="empty-state">
            <p>No articles found matching your search.</p>
          </div>
        ) : (
          <div className="empty-state">
            <p>Start typing to search for articles.</p>
          </div>
        )}
      </div>
    </main>
  )
}