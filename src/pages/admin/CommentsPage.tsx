import { useState } from 'react'
import { Check, X, Trash2, Flag, MessageSquare, User, Clock } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

interface CommentsPageProps {
  onNavigate: (path: string) => void
}

interface Comment {
  id: string
  articleId: string
  articleTitle: string
  author: string
  authorEmail: string
  body: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
}

const sampleComments: Comment[] = [
  {
    id: '1',
    articleId: '1',
    articleTitle: 'Governor Oborevwori Commissions Landmark Secretariat Complex',
    author: 'Emeka Nwosu',
    authorEmail: 'emeka.nwosu@email.com',
    body: 'This is fantastic news for Delta State. The modern infrastructure will surely boost administrative efficiency.',
    createdAt: '2 hours ago',
    status: 'pending',
  },
  {
    id: '2',
    articleId: '3',
    articleTitle: 'Warri Tech Hub Launches Pioneer AI & Renewable Energy Innovation Center',
    author: 'Chidinma Adebayo',
    authorEmail: 'chidinma.a@techhub.ng',
    body: 'Finally, Warri is getting the recognition it deserves in the tech space. Looking forward to the programs!',
    createdAt: '4 hours ago',
    status: 'pending',
  },
  {
    id: '3',
    articleId: '2',
    articleTitle: 'Nigerian Economy Shows Resilient Growth',
    author: 'Obinna Okeke',
    authorEmail: 'obinna.okeke@business.ng',
    body: 'The fintech sector growth is particularly impressive. We need more policies that support this trajectory.',
    createdAt: '6 hours ago',
    status: 'approved',
  },
  {
    id: '4',
    articleId: '5',
    articleTitle: 'Super Eagles Qualify for 2027 AFCON',
    author: 'Adebayo Samuel',
    authorEmail: 'samueladebayo@sports.com',
    body: 'What a thrilling qualifier! The team showed great character. AFCON 2027 will be exciting.',
    createdAt: '1 day ago',
    status: 'approved',
  },
  {
    id: '5',
    articleId: '4',
    articleTitle: 'Nigerian Universities Partner with International Tech Firms',
    author: 'Ngozi Federal',
    authorEmail: 'ngozi.f@university.edu',
    body: 'This partnership will open doors for many students. AI research is the future.',
    createdAt: '1 day ago',
    status: 'pending',
  },
  {
    id: '6',
    articleId: '8',
    articleTitle: 'Nigeria Joins Global Initiative for Digital Health Transformation',
    author: 'Dr. Okonkwo',
    authorEmail: 'okonkwo@hospital.ng',
    body: 'Telemedicine expansion is crucial for reaching rural communities. This is a step in the right direction.',
    createdAt: '2 days ago',
    status: 'rejected',
  },
]

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected'

export default function CommentsPage({ onNavigate }: CommentsPageProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filteredComments = statusFilter === 'all'
    ? comments
    : comments.filter((c) => c.status === statusFilter)

  const pendingCount = comments.filter((c) => c.status === 'pending').length

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredComments.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredComments.map((c) => c.id)))
    }
  }

  const approve = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' as const } : c))
    )
  }

  const reject = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' as const } : c))
    )
  }

  const remove = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id))
    setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next })
  }

  const bulkApprove = () => {
    setComments((prev) =>
      prev.map((c) => selectedIds.has(c.id) ? { ...c, status: 'approved' as const } : c)
    )
    setSelectedIds(new Set())
  }

  const bulkReject = () => {
    setComments((prev) =>
      prev.map((c) => selectedIds.has(c.id) ? { ...c, status: 'rejected' as const } : c)
    )
    setSelectedIds(new Set())
  }

  const bulkDelete = () => {
    setComments((prev) => prev.filter((c) => !selectedIds.has(c.id)))
    setSelectedIds(new Set())
  }

  const statusBadge = (status: Comment['status']) => {
    const statusStyles: Record<Comment['status'], { bg: string; color: string }> = {
      pending: { bg: 'var(--admin-warning-soft)', color: 'var(--admin-warning)' },
      approved: { bg: 'var(--admin-success-soft)', color: 'var(--admin-success)' },
      rejected: { bg: 'var(--admin-error-soft)', color: 'var(--admin-error)' },
    }
    const s = statusStyles[status]
    return (
      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '100px', fontSize: '0.6875rem', fontWeight: 600, background: s.bg, color: s.color }}>
        {status}
      </span>
    )
  }

  return (
    <AdminLayout currentPage="comments" onNavigate={onNavigate}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Comments</h1>
        <p className="admin-page-subtitle">
          {comments.length} total · {pendingCount} pending review
        </p>
      </div>

      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-icon warning">
            <Flag size={20} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{pendingCount}</span>
            <div className="admin-stat-label">Pending Review</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon success">
            <Check size={20} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{comments.filter((c) => c.status === 'approved').length}</span>
            <div className="admin-stat-label">Approved</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon info">
            <MessageSquare size={20} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{comments.length}</span>
            <div className="admin-stat-label">Total Comments</div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-filters">
          <div className="admin-filter-group">
            {(['all', 'pending', 'approved', 'rejected'] as StatusFilter[]).map((status) => (
              <button
                key={status}
                className={`admin-filter-btn ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span style={{ marginLeft: '0.375rem', opacity: 0.7 }}>
                    ({status === 'pending' ? pendingCount : comments.filter((c) => c.status === status).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {selectedIds.size > 0 && (
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--admin-accent)', fontWeight: 500 }}>
                {selectedIds.size} selected
              </span>
              <button className="btn-admin-ghost" onClick={bulkApprove}><Check size={14} /> Approve</button>
              <button className="btn-admin-ghost" onClick={bulkReject}><X size={14} /> Reject</button>
              <button className="btn-admin-danger" onClick={bulkDelete}><Trash2 size={14} /> Delete</button>
              <button className="btn-admin-ghost" onClick={() => setSelectedIds(new Set())}>Clear</button>
            </div>
          )}
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    className="admin-table-checkbox"
                    checked={selectedIds.size === filteredComments.length && filteredComments.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Comment</th>
                <th>Article</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="admin-table-empty">
                    No {statusFilter !== 'all' ? statusFilter : ''} comments found.
                  </td>
                </tr>
              ) : (
                filteredComments.map((comment) => (
                  <tr key={comment.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="admin-table-checkbox"
                        checked={selectedIds.has(comment.id)}
                        onChange={() => toggleSelect(comment.id)}
                      />
                    </td>
                    <td>
                      <div style={{ maxWidth: '300px' }}>
                        <div style={{ fontSize: '0.875rem', lineHeight: 1.4 }}>{comment.body}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ maxWidth: '200px', fontSize: '0.8125rem' }}>
                        <div className="admin-truncate" title={comment.articleTitle}>
                          {comment.articleTitle}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8125rem' }}>
                        <div>{comment.author}</div>
                        <div className="admin-text-faded">{comment.authorEmail}</div>
                      </div>
                    </td>
                    <td>{statusBadge(comment.status)}</td>
                    <td className="admin-text-sm admin-text-muted">{comment.createdAt}</td>
                    <td>
                      <div className="admin-table-actions">
                        {comment.status === 'pending' && (
                          <>
                            <button
                              className="btn-admin-icon"
                              style={{ color: 'var(--admin-success)' }}
                              onClick={() => approve(comment.id)}
                              title="Approve"
                            >
                              <Check size={15} />
                            </button>
                            <button
                              className="btn-admin-icon"
                              style={{ color: 'var(--admin-error)' }}
                              onClick={() => reject(comment.id)}
                              title="Reject"
                            >
                              <X size={15} />
                            </button>
                          </>
                        )}
                        <button
                          className="btn-admin-danger"
                          onClick={() => remove(comment.id)}
                          title="Delete"
                        >
                          <Trash2 size={15} />
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
    </AdminLayout>
  )
}
