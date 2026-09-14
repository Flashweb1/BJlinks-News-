import { FileText, File, Clock, User } from 'lucide-react'

interface ActivityItem {
  id: number
  type: 'article' | 'draft' | 'review' | 'user'
  text: string
  subtext?: string
  time: string
}

interface RecentActivityProps {
  activities?: ActivityItem[]
  onNavigate?: (path: string) => void
}

const defaultActivities: ActivityItem[] = [
  {
    id: 1,
    type: 'article',
    text: 'Adaobi N. published article',
    subtext: 'CBN Holds Interest Rate Steady at 26.25%',
    time: '1h ago',
  },
  {
    id: 2,
    type: 'draft',
    text: 'Chinedu E. created a draft',
    subtext: 'NITDA Launches AI Strategy',
    time: '3h ago',
  },
  {
    id: 3,
    type: 'review',
    text: 'Ifeanyi O. submitted for review',
    subtext: 'Lagos Blue Line Rail Project Hits 60%',
    time: '5h ago',
  },
  {
    id: 4,
    type: 'user',
    text: 'Editor updated article',
    subtext: 'Tinubu Signs 2025 Appropriation Bill',
    time: '7h ago',
  },
]

export default function RecentActivity({ activities = defaultActivities, onNavigate }: RecentActivityProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Recent Activity</h2>
        <button className="card-link" onClick={() => onNavigate?.('/admin/articles')}>
          View all
        </button>
      </div>

      <div className="card-body">
        <div className="activity-list">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'article' && <FileText size={16} />}
                {activity.type === 'draft' && <File size={16} />}
                {activity.type === 'review' && <Clock size={16} />}
                {activity.type === 'user' && <User size={16} />}
              </div>
              <div className="activity-content">
                <div className="activity-text">{activity.text}</div>
                {activity.subtext && (
                  <div className="activity-subtext">{activity.subtext}</div>
                )}
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
