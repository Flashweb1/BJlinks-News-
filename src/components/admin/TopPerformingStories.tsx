interface Story {
  rank: number
  title: string
  views: number
}

interface TopPerformingStoriesProps {
  stories?: Story[]
}

const NOT_TRACKED: Story[] = []

export default function TopPerformingStories({ stories = NOT_TRACKED }: TopPerformingStoriesProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Top Performing Stories</h2>
        <span className="card-meta-note" style={{ fontSize: '0.75rem', color: '#999', fontWeight: 400 }}>
          Views not yet tracked
        </span>
      </div>

      <div className="card-body">
        {stories.length > 0 ? (
          <div className="stories-list">
            {stories.map((story) => (
              <div key={story.rank} className="story-item">
                <div className="story-rank">{story.rank}</div>
                <div className="story-title">{story.title}</div>
                <div className="story-views">
                  {story.views > 0 ? `${(story.views / 1000).toFixed(1)}K` : '—'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-mini-state" style={{ padding: '1.25rem', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
            No published articles yet.
          </div>
        )}
      </div>
    </div>
  )
}
