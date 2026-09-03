import { useState } from 'react'
import { UserPlus, Trash2, Shield, Mail, Crown, X } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

interface UsersPageProps {
  onNavigate: (path: string) => void
}

interface AdminUser {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'editor'
  joinedAt: string
  lastActive: string
  avatar?: string
}

const sampleUsers: AdminUser[] = [
  { id: '1', name: 'Blessing Johnson', email: 'blessing@bjlinksnews.com', role: 'owner', joinedAt: 'Jan 15, 2026', lastActive: '2 hours ago' },
  { id: '2', name: 'Emmanuel Okafor', email: 'emmanuel@bjlinksnews.com', role: 'admin', joinedAt: 'Feb 20, 2026', lastActive: '1 day ago' },
  { id: '3', name: 'Chidinma Adebayo', email: 'chidinma@bjlinksnews.com', role: 'editor', joinedAt: 'Mar 10, 2026', lastActive: '3 days ago' },
  { id: '4', name: 'Tunde Oladipo', email: 'tunde@bjlinksnews.com', role: 'editor', joinedAt: 'Apr 5, 2026', lastActive: '1 week ago' },
]

export default function UsersPage({ onNavigate }: UsersPageProps) {
  const [users, setUsers] = useState<AdminUser[]>(sampleUsers)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'editor'>('editor')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    const newUser: AdminUser = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0] || 'User',
      email: inviteEmail,
      role: inviteRole,
      joinedAt: 'Just now',
      lastActive: 'Never',
    }
    setUsers([...users, newUser])
    setInviteEmail('')
    setShowInvite(false)
  }

  const handleRemove = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
    setShowDeleteConfirm(null)
  }

  const roleBadge = (role: AdminUser['role']) => {
    const styles = {
      owner: { bg: 'var(--admin-gold-soft)', color: 'var(--admin-gold)', icon: Crown },
      admin: { bg: 'var(--admin-accent-soft)', color: 'var(--admin-accent)', icon: Shield },
      editor: { bg: 'var(--admin-info-soft)', color: 'var(--admin-info)', icon: null },
    }
    const s = styles[role]
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', borderRadius: '100px', fontSize: '0.6875rem', fontWeight: 600, background: s.bg, color: s.color }}>
        {s.icon && <s.icon size={10} />}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    )
  }

  return (
    <AdminLayout currentPage="users" onNavigate={onNavigate}>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Users</h1>
          <p className="admin-page-subtitle">{users.length} team member{users.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-admin-primary" onClick={() => setShowInvite(true)}>
          <UserPlus size={16} /> Invite User
        </button>
      </div>

      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-icon primary"><Crown size={20} /></div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{users.filter((u) => u.role === 'owner').length}</span>
            <div className="admin-stat-label">Owner</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon success"><Shield size={20} /></div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{users.filter((u) => u.role === 'admin').length}</span>
            <div className="admin-stat-label">Admins</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon info"><Mail size={20} /></div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{users.filter((u) => u.role === 'editor').length}</span>
            <div className="admin-stat-label">Editors</div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Last Active</th>
                <th style={{ width: 80 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--admin-accent), var(--admin-gold))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{user.name}</div>
                        <div className="admin-text-sm admin-text-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{roleBadge(user.role)}</td>
                  <td className="admin-text-sm admin-text-muted">{user.joinedAt}</td>
                  <td className="admin-text-sm admin-text-muted">{user.lastActive}</td>
                  <td>
                    {user.role !== 'owner' && (
                      <button
                        className="btn-admin-danger"
                        onClick={() => setShowDeleteConfirm(user.id)}
                        title="Remove user"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showInvite && (
        <div className="admin-modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Invite Team Member</h3>
              <button className="btn-admin-icon" onClick={() => setShowInvite(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-label">Email Address</label>
                <input
                  type="email"
                  className="admin-input"
                  placeholder="colleague@bjlinksnews.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Role</label>
                <select
                  className="admin-select"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'admin' | 'editor')}
                >
                  <option value="editor">Editor — Can create and edit own articles</option>
                  <option value="admin">Admin — Can manage all content and users</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-admin-secondary" onClick={() => setShowInvite(false)}>Cancel</button>
              <button className="btn-admin-primary" onClick={handleInvite} disabled={!inviteEmail.trim()}>
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Remove User</h3>
            </div>
            <div className="admin-modal-body">
              <p>Are you sure you want to remove this user? They will lose access to the admin panel.</p>
              <p className="admin-text-sm admin-text-muted" style={{ marginTop: '0.5rem' }}>
                {users.find((u) => u.id === showDeleteConfirm)?.email}
              </p>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-admin-secondary" onClick={() => setShowDeleteConfirm(null)}>Cancel</button>
              <button className="btn-admin-primary" style={{ background: 'var(--admin-error)' }} onClick={() => handleRemove(showDeleteConfirm)}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
