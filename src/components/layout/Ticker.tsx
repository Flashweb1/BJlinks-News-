import { breakingNews } from '../../data/articles'

export default function Ticker() {
  const items = [...breakingNews, ...breakingNews]

  return (
    <div className="ticker">
      <span className="breaking">
        <span className="live-pulse-dot" /> Live Breaking
      </span>
      <div className="ticker-scroll">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-text">{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}