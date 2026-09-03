import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PenLine,
  Eye,
} from 'lucide-react'
import { auth } from '../../firebase/init'

interface AdminSidebarProps {
  collapsed: boolean
  currentPage: string
  onNavigate: (path: string) => void
  onToggle: () => void
  onLogout: () => void
}

const navItems = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
      { id: 'articles', label: 'Articles', icon: FileText, path: '/admin/articles', badge: null },
      { id: 'media', label: 'Media', icon: Image, path: '/admin/media' },
      { id: 'comments', label: 'Comments', icon: MessageSquare, path: '/admin/comments', badge: 3 },
    ],
  },
  {
    section: 'Analytics',
    items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    ],
  },
  {
    section: 'Management',
    items: [
      { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
      { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
  },
]

const quickActions = [
  { label: 'New Article', icon: PenLine, path: '/admin/editor' },
  { label: 'View Site', icon: Eye, path: '/' },
]

export default function AdminSidebar({
  collapsed,
  currentPage,
  onNavigate,
  onToggle,
  onLogout,
}: AdminSidebarProps) {
  const user = auth.currentUser
  const userInitial = user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'A'
  const userName = user?.displayName || user?.email?.split('@')[0] || 'Admin'
  const userRole = 'Editor'

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        <a href="/admin" className="admin-logo" onClick={(e) => { e.preventDefault(); onNavigate('/admin') }}>
          <div className="admin-logo-icon">B</div>
          <span className="admin-logo-text">Bjlinks</span>
        </a>
      </div>

      <nav className="admin-nav" aria-label="Admin navigation">
        {navItems.map((section) => (
          <div key={section.section} className="admin-nav-section">
            <div className="admin-nav-label">{section.section}</div>
            {section.items.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <a
                  key={item.id}
                  href={item.path}
                  className={`admin-nav-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); onNavigate(item.path) }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
                </a>
              )
            })}
          </div>
        ))}

        <div className="admin-nav-section">
          <div className="admin-nav-label">Quick Actions</div>
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.label}
                href={action.path}
                className="admin-nav-item"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(action.path)
                }}
                title={collapsed ? action.label : undefined}
              >
                <Icon size={20} />
                <span>{action.label}</span>
              </a>
            )
          })}
        </div>
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user">
          <div className="admin-user-avatar">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={userName} />
            ) : (
              userInitial
            )}
          </div>
          <div className="admin-user-info">
            <div className="admin-user-name">{userName}</div>
            <div className="admin-user-role">{userRole}</div>
          </div>
        </div>
        <button
          className="admin-nav-item"
          onClick={onLogout}
          style={{ width: '100%', marginTop: '0.5rem' }}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      <button
        onClick={onToggle}
        className="admin-nav-item"
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: collapsed ? '50%' : '0.75rem',
          transform: collapsed ? 'translateX(50%)' : 'none',
          justifyContent: 'center',
          padding: '0.5rem',
          margin: '0 0.75rem',
          width: collapsed ? '36px' : 'calc(100% - 1.5rem)',
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        {!collapsed && <span>Collapse</span>}
      </button>
    </aside>
  )
}
