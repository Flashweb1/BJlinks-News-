import { useState } from 'react'
import { Menu, X, Bell, Settings, LogOut } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/init'

interface AdminLayoutProps {
  children: React.ReactNode
  currentPage: string
  onNavigate: (path: string) => void
}

export default function AdminLayout({ children, currentPage, onNavigate }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      onNavigate('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="admin-shell">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />

      <div className="admin-content" style={{ marginLeft: sidebarCollapsed ? 'var(--admin-sidebar-collapsed-width)' : 'var(--admin-sidebar-width)' }}>
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <Menu size={16} /> : <X size={16} />}
            </button>
            <nav className="admin-breadcrumb" aria-label="Breadcrumb">
              <span className="admin-breadcrumb-item">Admin</span>
              <span className="admin-breadcrumb-separator">/</span>
              <span className="admin-breadcrumb-current">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </span>
            </nav>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-search">
              <SearchIcon className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search articles, comments..."
                className="admin-search-input"
                aria-label="Search"
              />
            </div>

            <button className="admin-topbar-btn" aria-label="Notifications">
              <Bell size={16} />
              <span className="notification-dot" />
            </button>

            <button className="admin-topbar-btn" aria-label="Settings">
              <Settings size={16} />
            </button>
          </div>
        </header>

        <main className="admin-page">
          {children}
        </main>
      </div>
    </div>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
