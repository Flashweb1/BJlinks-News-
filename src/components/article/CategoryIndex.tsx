import { categories } from '../../data/articles'

interface CategoryIndexProps {
  onNavigate: (path: string) => void
  activeCategory?: string
}

export default function CategoryIndex({ onNavigate, activeCategory }: CategoryIndexProps) {
  return (
    <div className="category-index">
      {categories.map((cat, i) => (
        <button
          key={cat.slug}
          className={`category-index-item ${activeCategory === cat.slug ? 'active' : ''}`}
          onClick={() => onNavigate(`/category/${cat.slug}`)}
        >
          <span className="category-index-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="category-index-label">{cat.label}</span>
        </button>
      ))}
    </div>
  )
}