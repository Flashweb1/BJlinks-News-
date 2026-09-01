import { useState, useEffect } from 'react'
import { FileText, Eye, Clock, AlertCircle, PenLine, User } from 'lucide-react'
import type { Article } from '../../data/articles'
import { getAllArticlesAdmin, getArticlesByStatus } from '../../firebase/articles'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/init'

interface AdminDashboardProps {
  onNavigate: (path: string) => void
  onLogout?: () => void
}

type Stats = { total: number; published: number; drafts: number; reviews: number }

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const currentUser = auth.currentUser
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0, reviews: 0 })
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allArticles, published, drafts, reviews] = await Promise.all([
          getAllArticlesAdmin(),
          getArticlesByStatus('published'),
          getArticlesByStatus('draft'),
          getArticlesByStatus('review'),
        ])
        setArticles(allArticles)
        setStats({
          total: allArticles.length,
          published: published.length,
          drafts: drafts.length,
          reviews: reviews.length,
        })
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error)
        console.error('[admin] Error loading admin data:', msg)
      } finally {
        setLoading(false)
      }
    }
    void loadData()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch {
    }
    if (onLogout) {
      onLogout()
    } else {
      onNavigate('/')
    }
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p className="admin-subtitle">Welcome back, Editor</p>
          <p className="admin-email">
            Signed in as: {currentUser?.email || 'admin@bjlinksnews.com'}
          </p>
        </div>
        <div className="admin-actions">
          <button className="btn-primary" onClick={() => onNavigate('/admin/editor')}>
            <PenLine size={16} /> New Article
          </button>
          <button className="btn-secondary" onClick={() => onNavigate('/')}>
            View Site
          </button>
          <button className="btn-ghost" onClick={handleLogout} title="Sign Out">
            <User size={16} /> Sign Out
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon={<FileText size={20} />} value={stats.total} label="Total Articles" />
        <StatCard icon={<Eye size={20} />} value={stats.published} label="Published" tone="published" />
        <StatCard icon={<Clock size={20} />} value={stats.drafts} label="Drafts" tone="draft" />
        <StatCard icon={<AlertCircle size={20} />} value={stats.reviews} label="In Review" tone="review" />
      </div>

      <section className="admin-section">
        <div className="section-header">
          <h2>All Articles</h2>
        </div>
        <div className="articles-table">
          <div className="table-header">
            <span className="col-title">Title</span>
            <span className="col-category">Category</span>
            <span className="col-status">Status</span>
            <span className="col-date">Date</span>
            <span className="col-actions">Actions</span>
          </div>
          {loading ? (
            <div className="table-row" style={{ justifyContent: 'center', color: '#6f6a63' }}>
              Loading articles…
            </div>
          ) : articles.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem' }}>
              No articles yet — create your first with the “New Article” button.
            </div>
          ) : (
            articles.map((article) => (
              <div key={article.id} className="table-row">
                <span className="col-title">{article.title}</span>
                <span className="col-category">
                  <span className="kicker">{article.category}</span>
                </span>
                <span className="col-status">
                  <span className={`status-badge ${article.status ?? 'draft'}`}>
                    {article.status ?? 'draft'}
                  </span>
                </span>
                <span className="col-date">{article.publishedAt}</span>
                <span className="col-actions">
                  <button
                    className="btn-ghost btn-sm"
                    onClick={() => onNavigate(`/admin/editor/${article.id}`)}
                  >
                    Edit
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

function StatCard({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode
  value: number
  label: string
  tone?: 'published' | 'draft' | 'review'
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone ?? ''}`}>{icon}</div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  )
}
