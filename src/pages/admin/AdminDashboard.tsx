import { useState, useEffect } from 'react'
import { FileText, Eye, Clock, AlertCircle } from 'lucide-react'
import type { Article } from '../../data/articles'
import { getAllArticlesAdmin } from '../../firebase/articles'
import AdminLayout from '../../components/admin/AdminLayout'
import RecentArticlesTable from '../../components/admin/RecentArticlesTable'
import RecentActivity from '../../components/admin/RecentActivity'
import TopPerformingStories from '../../components/admin/TopPerformingStories'
import ContentPerformanceChart from '../../components/admin/ContentPerformanceChart'
import PublishingOverview from '../../components/admin/PublishingOverview'

interface AdminDashboardProps {
  onNavigate: (path: string) => void
}

type Stats = { total: number; published: number; drafts: number; reviews: number }

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
        console.error('[admin] Error loading dashboard data:', msg)
      } finally {
        setLoading(false)
      }
    }
    void loadData()
  }, [])

  const formattedArticles = articles.map(a => ({
    id: a.id,
    title: a.title,
    category: a.category,
    author: a.author || 'Editor',
    status: a.status as 'published' | 'draft' | 'review',
    views: 0, // Articles don't have view count in current schema
    date: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    thumbnail: a.image
  }))

  const topStories = articles
    .filter(a => a.status === 'published')
    .slice(0, 5)
    .map((a, idx) => ({
      rank: idx + 1,
      title: a.title,
      views: 0 // Placeholder view counts
    }))

  // Get current time greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <AdminLayout currentPage="dashboard" onNavigate={onNavigate}>
      {/* Greeting Section */}
      <div className="dashboard-greeting">
        <div className="greeting-content">
          <h1 className="greeting-title">
            {greeting}, Editor<span className="greeting-accent">.</span>
          </h1>
          <p className="greeting-subtitle">{date}</p>
        </div>
        <div className="greeting-actions">
          <button className="btn-primary-new" onClick={() => onNavigate('/admin/editor')}>
            <span>+</span>
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon">
              <FileText size={20} />
            </div>
          </div>
          <div className="kpi-value">{stats.total}</div>
          <div className="kpi-label">Total Articles</div>
          <div className="kpi-trend positive">↑ 12% vs last 7 days</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon">
              <Eye size={20} />
            </div>
          </div>
          <div className="kpi-value">{stats.published}</div>
          <div className="kpi-label">Published</div>
          <div className="kpi-trend positive">↑ 18% vs last 7 days</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon">
              <FileText size={20} />
            </div>
          </div>
          <div className="kpi-value">{stats.drafts}</div>
          <div className="kpi-label">Drafts</div>
          <div className="kpi-trend negative">↓ 8% vs last 7 days</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-header">
            <div className="kpi-icon">
              <Clock size={20} />
            </div>
          </div>
          <div className="kpi-value">{stats.reviews}</div>
          <div className="kpi-label">In Review</div>
          <div className="kpi-trend positive">↑ 6% vs last 7 days</div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="analytics-grid">
        {/* Content Performance Chart */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h2 className="analytics-card-title">Content Performance</h2>
            <button className="analytics-dropdown">Last 7 days ▼</button>
          </div>
          <ContentPerformanceChart />
        </div>

        {/* Publishing Overview */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h2 className="analytics-card-title">Publishing Overview</h2>
          </div>
          <div className="card-body">
            <PublishingOverview />
          </div>
        </div>
      </div>

      {/* Content Grid - Recent Articles + Activity */}
      <div className="content-grid">
        <div className="content-main">
          {loading ? (
            <div className="card">
              <div className="card-body" style={{ textAlign: 'center', padding: '2rem' }}>
                Loading articles...
              </div>
            </div>
          ) : (
            <RecentArticlesTable 
              articles={formattedArticles}
              onNavigate={onNavigate}
            />
          )}
        </div>

        <div className="content-sidebar">
          <RecentActivity />
          <TopPerformingStories stories={topStories} />
        </div>
      </div>
    </AdminLayout>
  )
}
