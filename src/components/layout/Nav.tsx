import { categories } from '../../data/articles'

interface NavProps {
  onNavigate: (path: string) => void
  activeCategory?: string
}

export default function Nav({ onNavigate, activeCategory }: NavProps) {
  return (
    <nav className="main-nav">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          className={`nav-link ${activeCategory === cat.slug ? 'active' : ''}`}
          onClick={() => onNavigate(`/category/${cat.slug}`)}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  )
}