interface PublishingOverviewProps {
  published?: number
  drafts?: number
  inReview?: number
}

export default function PublishingOverview({
  published = 0,
  drafts = 0,
  inReview = 0,
}: PublishingOverviewProps) {
  const total = published + drafts + inReview

  // Calculate percentages safely (avoid NaN on total = 0)
  const publishedPercent = total > 0 ? (published / total) * 100 : 0
  const draftsPercent = total > 0 ? (drafts / total) * 100 : 0
  const inReviewPercent = total > 0 ? (inReview / total) * 100 : 0

  // Convert to degrees (0-360)
  const publishedDeg = (publishedPercent / 100) * 360
  const draftsDeg = (draftsPercent / 100) * 360

  const donutBackground =
    total > 0
      ? `conic-gradient(
          #E32626 0deg ${publishedDeg}deg,
          #F2A900 ${publishedDeg}deg ${publishedDeg + draftsDeg}deg,
          #3B82F6 ${publishedDeg + draftsDeg}deg 360deg
        )`
      : '#E5E7EB'

  return (
    <div className="publishing-overview">
      {/* Donut Chart */}
      <div className="donut-chart" style={{ background: donutBackground }}>
        <div className="donut-center">
          <div className="donut-value">{total}</div>
          <div className="donut-label">Total</div>
        </div>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="chart-legend-item">
          <div className="chart-legend-color" style={{ backgroundColor: '#E32626' }}></div>
          <div className="chart-legend-label">Published</div>
          <div className="chart-legend-value">{published}</div>
          <div className="chart-legend-percent">({publishedPercent.toFixed(1)}%)</div>
        </div>

        <div className="chart-legend-item">
          <div className="chart-legend-color" style={{ backgroundColor: '#F2A900' }}></div>
          <div className="chart-legend-label">Drafts</div>
          <div className="chart-legend-value">{drafts}</div>
          <div className="chart-legend-percent">({draftsPercent.toFixed(1)}%)</div>
        </div>

        <div className="chart-legend-item">
          <div className="chart-legend-color" style={{ backgroundColor: '#3B82F6' }}></div>
          <div className="chart-legend-label">In Review</div>
          <div className="chart-legend-value">{inReview}</div>
          <div className="chart-legend-percent">({inReviewPercent.toFixed(1)}%)</div>
        </div>
      </div>
    </div>
  )
}
