import { useState, useEffect } from 'react'
import {
  FileText,
  Eye,
  Clock,
  AlertCircle,
  PenLine,
  PlusCircle,
  Image,
  MessageSquare,
  ExternalLink,
  Edit3,
  Trash2,
} from 'lucide-react'
import type { Article } from '../../data/articles'
import { getAllArticlesAdmin } from '../../firebase/articles'
import StatsCard from '../../components/admin/StatsCard'
import AdminLayout from '../../components/admin/AdminLayout'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/init'

interface AdminDashboardProps {
  onNavigate: (path: string) => void
}

type Stats = { total: number; published: number; drafts: number; reviews: number }

const statusColors: Record<string, string> = {
  published: 'published',
  draft: 'draft',
  review: 'review',
  archived: 'archived',
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0, reviews: 0 })
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const allArticles = await getAllArticlesAdmin()
        setArticles(allArticles.slice(0, 5))
        setStats({
          total: allArticles.length,
          published: allArticles.filter((a) => a.status === 'published').length,
          drafts: allArticles.filter((a) => a.status === 'draft').length,
          reviews: allArticles.filter((a) => a.status === 'review').length,
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
      onNavigate('/admin/login')
    } catch {
      onNavigate('/')
    }
  }

  const recentActivity = [
    { id: 1, type: 'article', text: 'Governor Oborevwori article was published', time: '2 hours ago' },
    { id: 2, type: 'comment', text: 'New comment on "Warri Tech Hub" article', time: '4 hours ago' },
    { id: 3, type: 'article', text: 'Draft "Lagos Light Rail" saved', time: '6 hours ago' },
    { id: 4, type: 'user', text: 'Editor Adebayo Samuel signed in', time: '1 day ago' },
  ]

  return (
    <AdminLayout currentPage="dashboard" onNavigate={onNavigate}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">
          Welcome back, {auth.currentUser?.displayName?.split(' ')[0] || 'Editor'}
        </p>
      </div>

      <div className="admin-stats-grid">
        <StatsCard
          icon={<FileText size={20} />}
          value={stats.total}
          label="Total Articles"
          variant="primary"
        />
        <StatsCard
          icon={<Eye size={20} />}
          value={stats.published}
          label="Published"
          variant="success"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          icon={<Clock size={20} />}
          value={stats.drafts}
          label="Drafts"
          variant="warning"
        />
        <StatsCard
          icon={<AlertCircle size={20} />}
          value={stats.reviews}
          label="In Review"
          variant="info"
        />
      </div>

      <div className="admin-quick-actions">
        <button className="admin-quick-action" onClick={() => onNavigate('/admin/editor')}>
          <PlusCircle size={20} />
          <div>
            <div style={{ fontWeight: 600 }}>Write New Article</div>
            <div className="admin-text-sm admin-text-muted">Create fresh content</div>
          </div>
        </button>
        <button className="admin-quick-action" onClick={() => onNavigate('/admin/articles')}>
          <FileText size={20} />
          <div>
            <div style={{ fontWeight: 600 }}>Manage Articles</div>
            <div className="admin-text-sm admin-text-muted">Edit or delete posts</div>
          </div>
        </button>
        <button className="admin-quick-action" onClick={() => onNavigate('/')}>
          <ExternalLink size={20} />
          <div>
            <div style={{ fontWeight: 600 }}>View Live Site</div>
            <div className="admin-text-sm admin-text-muted">See changes live</div>
          </div>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Articles</h2>
            <button
              className="btn-admin-ghost"
              onClick={() => onNavigate('/admin/articles')}
            >
              View All
            </button>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="admin-table-empty">Loading...</td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="admin-table-empty">
                      No articles yet — create your first one.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article.id}>
                      <td>
                        <div className="admin-table-title">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              onNavigate(`/admin/editor/${article.id}`)
                            }}
                          >
                            {article.title.length > 50
                              ? article.title.slice(0, 50) + '...'
                              : article.title}
                          </a>
                        </div>
                      </td>
                      <td>
                        <span className="kicker" style={{ marginBottom: 0 }}>
                          {article.category}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge ${statusColors[article.status] || 'draft'}`}>
                          {article.status || 'draft'}
                        </span>
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          <button
                            className="btn-admin-icon"
                            onClick={() => onNavigate(`/admin/editor/${article.id}`)}
                            title="Edit"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className="btn-admin-icon"
                            onClick={() => onNavigate(`/article/${article.slug}`)}
                            title="View"
                          >
                            <ExternalLink size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Activity</h2>
          </div>
          <div className="admin-card-body">
            <div className="admin-activity">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="admin-activity-item">
                  <div className={`admin-activity-icon ${activity.type}`}>
                    {activity.type === 'article' && <FileText size={14} />}
                    {activity.type === 'comment' && <MessageSquare size={14} />}
                    {activity.type === 'user' && <Eye size={14} />}
                  </div>
                  <div className="admin-activity-content">
                    <div className="admin-activity-text">{activity.text}</div>
                    <div className="admin-activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Quick Stats</h2>
          </div>
          <div className="admin-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div>
              <div className="admin-text-xs admin-text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Categories
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>10</div>
              <div className="admin-text-sm admin-text-muted">Active sections</div>
            </div>
            <div>
              <div className="admin-text-xs admin-text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Featured Articles
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>
                {articles.filter((a) => a.featured).length}
              </div>
              <div className="admin-text-sm admin-text-muted">On homepage</div>
            </div>
            <div>
              <div className="admin-text-xs admin-text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Comments
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>24</div>
              <div className="admin-text-sm admin-text-muted">Pending review</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
