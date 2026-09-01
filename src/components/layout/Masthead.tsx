import { useTheme } from '../../contexts/ThemeContext'
import { Sun, Moon, Bookmark, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface MastheadProps {
  onNavigate: (path: string) => void
}

export default function Masthead({ onNavigate }: MastheadProps) {
  const { isDark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <header className="masthead" role="banner">
      <div className="masthead-left">
        <span className="masthead-date" aria-label={`Current date: ${todayStr}`}>
          <span className="location-dot" aria-hidden="true" /> Lagos, NG • {todayStr}
        </span>
      </div>

      <button 
        className="logo" 
        onClick={() => onNavigate('/')} 
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Bjlinks News - Home"
      >
        Bjlinks<span className="accent"> News</span>
      </button>

      <nav className="masthead-nav" aria-label="Header navigation">
        <button 
          className="icon-btn theme-toggle-btn" 
          onClick={toggle} 
          aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          aria-pressed={isDark}
        >
          {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          <span className="btn-tooltip" aria-hidden="true">{isDark ? 'Light' : 'Dark'}</span>
        </button>
        <button 
          className="icon-btn" 
          onClick={() => onNavigate('/bookmarks')} 
          aria-label="Saved Bookmarks"
        >
          <Bookmark size={18} aria-hidden="true" />
        </button>
        <button 
          className="icon-btn mobile-menu" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div 
          className="mobile-nav-overlay" 
          onClick={() => setMenuOpen(false)}
          role="dialog"
          aria-label="Navigation menu"
        >
          <nav 
            className="mobile-nav-panel" 
            id="mobile-nav-panel"
            onClick={(e) => e.stopPropagation()}
            aria-label="Main navigation"
          >
            <div className="mobile-nav-header">
              <span className="logo-small">Bjlinks<span className="accent">.</span></span>
              <button 
                className="icon-btn" 
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/'); setMenuOpen(false) }}
            >
              Home
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/politics'); setMenuOpen(false) }}
            >
              Politics
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/news'); setMenuOpen(false) }}
            >
              News
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/business'); setMenuOpen(false) }}
            >
              Business
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/world'); setMenuOpen(false) }}
            >
              World
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/tech'); setMenuOpen(false) }}
            >
              Tech
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/health'); setMenuOpen(false) }}
            >
              Health
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/sports'); setMenuOpen(false) }}
            >
              Sports
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/religion'); setMenuOpen(false) }}
            >
              Religion
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/category/education'); setMenuOpen(false) }}
            >
              Education
            </a>
            <a 
              role="menuitem"
              onClick={() => { onNavigate('/bookmarks'); setMenuOpen(false) }}
            >
              Saved Bookmarks
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}