interface Story {
  rank: number
  title: string
  views: number
}

interface TopPerformingStoriesProps {
  stories?: Story[]
}

const defaultStories: Story[] = [
  { rank: 1, title: 'Tinubu Signs 2025 Appropriation Bill Amid Calls for Fiscal Discipline', views: 24600 },
  { rank: 2, title: 'CBN Holds Interest Rate Steady at 26.25% as Inflation Eases', views: 18700 },
  { rank: 3, title: 'NITDA Launches AI Strategy to Boost Nigeria Digital Economy', views: 15200 },
  { rank: 4, title: 'INEC Begins Nationwide Voter Registration for 2026 Elections', views: 12800 },
  { rank: 5, title: 'FAAN to Upgrade 5 Major Airports Under New RFP Model', views: 9400 },
]

export default function TopPerformingStories({ stories = defaultStories }: TopPerformingStoriesProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Top Performing Stories</h2>
        <button className="card-link">View all</button>
      </div>

      <div className="card-body">
        <div className="stories-list">
          {stories.map((story) => (
            <div key={story.rank} className="story-item">
              <div className="story-rank">{story.rank}</div>
              <div className="story-title">{story.title}</div>
              <div className="story-views">{(story.views / 1000).toFixed(1)}K</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
