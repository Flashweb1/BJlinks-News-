import { Edit3, ExternalLink, MoreVertical } from 'lucide-react'

interface Article {
  id: string
  title: string
  category: string
  author: string
  status: 'published' | 'draft' | 'review'
  views: number
  date: string
  thumbnail?: string
}

interface RecentArticlesTableProps {
  articles: Article[]
  onEdit?: (id: string) => void
  onView?: (id: string) => void
  onNavigate?: (path: string) => void
}

const categoryColors: Record<string, string> = {
  'Politics': 'badge-politics',
  'Business': 'badge-business',
  'Technology': 'badge-technology',
  'Metro': 'badge-metro',
  'Sports': 'badge-sports',
}

const statusClasses: Record<string, string> = {
  'published': 'status-published',
  'draft': 'status-draft',
  'review': 'status-review',
}

export default function RecentArticlesTable({ articles, onEdit, onView, onNavigate }: RecentArticlesTableProps) {
  const handleEditClick = (id: string) => {
    if (onEdit) {
      onEdit(id)
    } else if (onNavigate) {
      onNavigate(`/admin/editor/${id}`)
    }
  }

  const handleViewClick = (id: string) => {
    if (onView) {
      onView(id)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Recent Articles</h2>
        <button className="card-link" onClick={() => onNavigate?.('/admin/articles')}>
          View all articles
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Views</th>
              <th>Date</th>
              <th style={{ width: '80px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                    No articles yet. Create your first one to get started.
                  </div>
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id}>
                  <td data-label="Article">
                    <div className="table-article">
                      {article.thumbnail && (
                        <img src={article.thumbnail} alt="" className="table-article-thumb" />
                      )}
                      <div>
                        <div
                          className="table-article-title"
                          onClick={() => handleViewClick(article.id)}
                        >
                          <div className="table-article-title-short">{article.title}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Category">
                    <span className={`badge ${categoryColors[article.category] || 'badge-politics'}`}>
                      {article.category}
                    </span>
                  </td>
                  <td data-label="Author" style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {article.author}
                  </td>
                  <td data-label="Status">
                    <span className={`status-badge ${statusClasses[article.status]}`}>
                      {article.status}
                    </span>
                  </td>
                  <td data-label="Views">
                    <div className="table-views">
                      {article.views > 0 ? (
                        <>
                          <div>{(article.views / 1000).toFixed(1)}k</div>
                          <div className="table-views-count">views</div>
                        </>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                      )}
                    </div>
                  </td>
                  <td data-label="Date" style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {article.date}
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button
                        className="btn-icon"
                        onClick={() => handleEditClick(article.id)}
                        title="Edit article"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="btn-icon"
                        title="More options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {articles.length > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing 1 to {Math.min(5, articles.length)} of {articles.length} articles
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>
              Previous
            </button>
            <div className="pagination-page active">1</div>
            <button className="pagination-btn">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
