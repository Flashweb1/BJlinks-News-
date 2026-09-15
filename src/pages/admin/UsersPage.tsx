import { useState, useEffect } from 'react'
import { Check, XCircle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db, functions } from '../../firebase/init'
import { httpsCallable } from 'firebase/functions'

interface UsersPageProps {
  onNavigate: (path: string) => void
}

interface PendingUser {
  uid: string
  email?: string | null
  displayName?: string | null
  createdAt?: any
}

export default function UsersPage({ onNavigate }: UsersPageProps) {
  const [pending, setPending] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'pendingUsers'))
    const unsub = onSnapshot(q, (snap) => {
      const arr: PendingUser[] = []
      snap.forEach((d) => arr.push({ uid: d.id, ...(d.data() as any) }))
      setPending(arr)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const approveUser = async (uid: string, role: string = 'editor') => {
    try {
      const fn = httpsCallable(functions, 'setApproved')
      const res = await fn({ uid, role })
      // success
    } catch (e) {
      console.error('approve error', e)
      alert('Failed to approve user: ' + String(e))
    }
  }

  const rejectUser = async (uid: string) => {
    try {
      await deleteDoc(doc(db, 'pendingUsers', uid))
    } catch (e) {
      console.error('reject error', e)
      alert('Failed to reject user: ' + String(e))
    }
  }

  return (
    <AdminLayout currentPage="users" onNavigate={onNavigate}>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Users</h1>
          <p className="admin-page-subtitle">{pending.length} pending approval</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Created</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((u) => (
                <tr key={u.uid}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--admin-accent), var(--admin-gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8125rem', fontWeight: 600, flexShrink: 0 }}>{(u.displayName || (u.email || '').split('@')[0] || 'U').charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{u.displayName || 'User'}</div>
                        <div className="admin-text-sm admin-text-muted">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="admin-text-sm admin-text-muted">{u.createdAt?.toDate ? u.createdAt.toDate().toLocaleString() : ''}</td>
                  <td>
                    <button className="btn-admin-primary" onClick={() => approveUser(u.uid)} title="Approve"><Check size={14} /> Approve</button>
                    <button className="btn-admin-danger" style={{ marginLeft: 8 }} onClick={() => rejectUser(u.uid)} title="Reject"><XCircle size={14} /> Reject</button>
                  </td>
                </tr>
              ))}
              {!pending.length && (
                <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1.5rem' }}>No pending users</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
