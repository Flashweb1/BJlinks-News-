import { Play } from 'lucide-react'
import './home.css'

interface VideoSectionProps {
  title: string
  description: string
  thumbnail: string
}

export default function VideoSection({ title, description, thumbnail }: VideoSectionProps) {
  return (
    <section className="video-section">
      <div className="video-container">
        <div className="video-thumbnail">
          <img src={thumbnail} alt={title} />
          <div className="video-play-btn">
            <Play size={48} fill="currentColor" />
          </div>
        </div>
        <div className="video-content">
          <h3 className="video-title">{title}</h3>
          <p className="video-description">{description}</p>
          <button className="video-cta">Watch Video</button>
        </div>
      </div>
    </section>
  )
}
