import { useState } from 'react'
import { BarChart3, TrendingUp, Eye, Clock, FileText, Users } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import StatsCard from '../../components/admin/StatsCard'

interface AnalyticsPageProps {
  onNavigate: (path: string) => void
}

const monthlyData = [
  { label: 'Jan', value: 4200 },
  { label: 'Feb', value: 5100 },
  { label: 'Mar', value: 4800 },
  { label: 'Apr', value: 6200 },
  { label: 'May', value: 7100 },
  { label: 'Jun', value: 6800 },
  { label: 'Jul', value: 7900 },
  { label: 'Aug', value: 8400 },
]

const topArticles = [
  { title: 'Governor Oborevwori Commissions Landmark Secretariat Complex', views: 12400, reads: 8200 },
  { title: 'Super Eagles Qualify for 2027 AFCON', views: 9800, reads: 7100 },
  { title: 'Nigerian Economy Shows Resilient Growth', views: 7600, reads: 5400 },
  { title: 'Warri Tech Hub Launches Pioneer AI Center', views: 6200, reads: 4800 },
  { title: 'Central Bank Maintains Interest Rate at 18%', views: 5100, reads: 3900 },
]

const categoryPerformance = [
  { category: 'Politics', views: 28400, percentage: 32 },
  { category: 'Business', views: 22100, percentage: 25 },
  { category: 'Sports', views: 17800, percentage: 20 },
  { category: 'Tech', views: 14200, percentage: 16 },
  { category: 'Health', views: 6200, percentage: 7 },
]

const trafficSources = [
  { source: 'Direct', visits: 34200, percentage: 48 },
  { source: 'Social Media', visits: 18900, percentage: 27 },
  { source: 'Search', visits: 14200, percentage: 20 },
  { source: 'Referral', visits: 3800, percentage: 5 },
]

export default function AnalyticsPage({ onNavigate }: AnalyticsPageProps) {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month')
  const maxValue = Math.max(...monthlyData.map((d) => d.value))

  return (
    <AdminLayout currentPage="analytics" onNavigate={onNavigate}>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Analytics</h1>
          <p className="admin-page-subtitle">Track your content performance and audience engagement</p>
        </div>
        <div className="admin-filter-group">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              className={`admin-filter-btn ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatsCard
          icon={<Eye size={20} />}
          value="71.2K"
          label="Total Page Views"
          trend={{ value: 18, direction: 'up' }}
          variant="primary"
        />
        <StatsCard
          icon={<Users size={20} />}
          value="24.8K"
          label="Unique Visitors"
          trend={{ value: 12, direction: 'up' }}
          variant="info"
        />
        <StatsCard
          icon={<Clock size={20} />}
          value="3.4 min"
          label="Avg. Read Time"
          trend={{ value: 5, direction: 'up' }}
          variant="success"
        />
        <StatsCard
          icon={<FileText size={20} />}
          value="67%"
          label="Read Rate"
          trend={{ value: 3, direction: 'down' }}
          variant="warning"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Page Views</h2>
            <span className="admin-text-sm admin-text-muted">Last 8 months</span>
          </div>
          <div className="admin-chart-container" style={{ height: '260px' }}>
            <div className="admin-chart-bars">
              {monthlyData.map((item) => (
                <div key={item.label} className="admin-chart-bar">
                  <div
                    className="admin-chart-bar-fill"
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                    title={`${item.value.toLocaleString()} views`}
                  />
                  <span className="admin-chart-bar-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Traffic Sources</h2>
          </div>
          <div className="admin-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span className="admin-text-sm" style={{ fontWeight: 500 }}>{source.source}</span>
                    <span className="admin-text-sm admin-text-muted">{source.visits.toLocaleString()} ({source.percentage}%)</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--admin-surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${source.percentage}%`,
                        background: 'linear-gradient(90deg, var(--admin-accent), var(--admin-gold))',
                        borderRadius: '3px',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Top Articles</h2>
            <span className="admin-text-sm admin-text-muted">By views this month</span>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Views</th>
                  <th>Reads</th>
                </tr>
              </thead>
              <tbody>
                {topArticles.map((article, index) => (
                  <tr key={index}>
                    <td className="admin-text-muted">{index + 1}</td>
                    <td>
                      <div style={{ maxWidth: '280px' }}>
                        <div className="admin-text-sm admin-truncate">{article.title}</div>
                      </div>
                    </td>
                    <td className="admin-text-sm">{article.views.toLocaleString()}</td>
                    <td className="admin-text-sm admin-text-muted">{article.reads.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Category Performance</h2>
          </div>
          <div className="admin-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {categoryPerformance.map((cat) => (
                <div key={cat.category} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="kicker" style={{ marginBottom: 0, minWidth: '80px' }}>{cat.category}</span>
                  <div style={{ flex: 1, height: '8px', background: 'var(--admin-surface-3)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${cat.percentage}%`,
                        background: 'var(--admin-accent)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </div>
                  <span className="admin-text-sm admin-text-muted" style={{ minWidth: '50px', textAlign: 'right' }}>
                    {cat.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
