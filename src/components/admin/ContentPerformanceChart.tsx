/* Simple Line Chart for Content Performance */

export default function ContentPerformanceChart() {
  // Sample data
  const data = [
    { date: 'May 24', views: 24, engagement: 11 },
    { date: 'May 25', views: 27, engagement: 10 },
    { date: 'May 26', views: 36, engagement: 14 },
    { date: 'May 27', views: 25, engagement: 10 },
    { date: 'May 28', views: 45, engagement: 17 },
    { date: 'May 29', views: 29, engagement: 12 },
    { date: 'May 30', views: 23, engagement: 9 },
  ]

  // Find max values for scaling
  const maxViews = Math.max(...data.map(d => d.views))
  const maxEngagement = Math.max(...data.map(d => d.engagement))

  // SVG dimensions
  const width = 600
  const height = 220
  const padding = 40
  const plotWidth = width - padding * 2
  const plotHeight = height - padding * 2

  // Calculate points
  const viewsPoints = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * plotWidth,
    y: height - padding - (d.views / maxViews) * plotHeight,
  }))

  const engagementPoints = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * plotWidth,
    y: height - padding - (d.engagement / maxEngagement) * plotHeight,
  }))

  // Generate path data
  const viewsPath = `M${viewsPoints.map(p => `${p.x},${p.y}`).join('L')}`
  const engagementPath = `M${engagementPoints.map(p => `${p.x},${p.y}`).join('L')}`

  // Generate area fill path for views
  const viewsAreaPath = `M${padding},${height - padding}L${viewsPoints.map(p => `${p.x},${p.y}`).join('L')}L${width - padding},${height - padding}Z`

  return (
    <div className="chart-container">
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
        {/* Background gradient */}
        <defs>
          <linearGradient id="viewsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E32626" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E32626" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i * plotHeight) / 4}
            x2={width - padding}
            y2={padding + (i * plotHeight) / 4}
            stroke="#E5E7EB"
            strokeWidth="0.5"
            strokeDasharray="4"
            opacity="0.5"
          />
        ))}

        {/* Axis lines */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#E5E7EB" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#E5E7EB" strokeWidth="1" />

        {/* Views area fill */}
        <path d={viewsAreaPath} fill="url(#viewsGradient)" />

        {/* Engagement line */}
        <path d={engagementPath} stroke="#F2A900" strokeWidth="2" fill="none" />

        {/* Views line */}
        <path d={viewsPath} stroke="#E32626" strokeWidth="2.5" fill="none" />

        {/* Data points - views */}
        {viewsPoints.map((p, i) => (
          <circle key={`v${i}`} cx={p.x} cy={p.y} r="3" fill="#E32626" />
        ))}

        {/* Data points - engagement */}
        {engagementPoints.map((p, i) => (
          <circle key={`e${i}`} cx={p.x} cy={p.y} r="2.5" fill="#F2A900" />
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={`x${i}`}
            x={padding + (i / (data.length - 1)) * plotWidth}
            y={height - padding + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#98A2B3"
          >
            {d.date.split(' ')[1]}
          </text>
        ))}

        {/* Y-axis labels (left) */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={`y${i}`}
            x={padding - 10}
            y={height - padding - (i * plotHeight) / 4 + 4}
            textAnchor="end"
            fontSize="12"
            fill="#98A2B3"
          >
            {Math.round(((4 - i) * maxViews) / 4)}k
          </text>
        ))}
      </svg>
    </div>
  )
}
