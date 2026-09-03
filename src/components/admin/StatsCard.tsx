import { type LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  icon: React.ReactNode
  value: number | string
  label: string
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  variant?: 'primary' | 'success' | 'warning' | 'info'
}

export default function StatsCard({
  icon,
  value,
  label,
  trend,
  variant = 'primary',
}: StatsCardProps) {
  return (
    <div className="admin-stat-card">
      <div className={`admin-stat-icon ${variant}`}>{icon}</div>
      <div className="admin-stat-content">
        <span className="admin-stat-value">{value}</span>
        <div className="admin-stat-label">{label}</div>
        {trend && (
          <div className={`admin-stat-trend ${trend.direction}`}>
            {trend.direction === 'up' ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {trend.value}%
          </div>
        )}
      </div>
    </div>
  )
}
