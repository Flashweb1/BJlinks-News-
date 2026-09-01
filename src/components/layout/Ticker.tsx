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
            {item}
            {i < items.length - 1 && <span className="ticker-sep">·</span>}
          </span>
        ))}
      </div>
    </div>
  )
}