import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import type { Article } from '../../data/articles'
import NewsletterForm from '../newsletter/NewsletterForm'

interface HomeSidebarProps {
  articles: Article[]
  onNavigate: (path: string) => void
}

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  { label: 'X / Twitter', href: 'https://twitter.com', Icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com', Icon: Youtube },
]

export default function HomeSidebar({ articles, onNavigate }: HomeSidebarProps) {
  const top = articles.slice(0, 5)

  return (
    <aside className="home-sidebar" aria-label="Most read and updates">
      <section className="sidebar-widget">
        <div className="sidebar-widget-head">
          <span className="sidebar-widget-icon">
            <span className="accent-dot" aria-hidden="true" />
          </span>
          <h3>Most Read</h3>
        </div>
        <ol className="most-read">
          {top.map((article, i) => (
            <li key={article.id} className="most-read-item">
              <span className="most-read-rank" aria-hidden="true">
                {i + 1}
              </span>
              <button
                className="most-read-title"
                onClick={() => onNavigate(`/article/${article.slug}`)}
              >
                {article.title}
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="sidebar-widget">
        <NewsletterForm variant="sidebar" />
      </section>

      <section className="sidebar-widget">
        <div className="sidebar-widget-head">
          <span className="sidebar-widget-icon">
            <span aria-hidden="true">@</span>
          </span>
          <h3>Follow Us</h3>
        </div>
        <div className="social-circles">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle"
              aria-label={label}
              title={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </section>
    </aside>
  )
}