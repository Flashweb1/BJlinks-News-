import { useState } from 'react'
import { categories } from '../../data/articles'
import { Mail, Check } from 'lucide-react'

interface FooterProps {
  onNavigate: (path: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="site-footer">
      <div className="newsletter-card">
        <div className="newsletter-content">
          <div className="newsletter-badge">EDITORIAL BRIEFING</div>
          <h3>The Morning Digest</h3>
          <p>Get curated investigative reporting and breaking intelligence sent directly to your inbox every weekday morning.</p>
        </div>
        {subscribed ? (
          <div className="newsletter-success">
            <Check size={20} /> Thank you for subscribing to Bjlinks Daily Digest.
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="input-wrapper">
              <Mail size={16} />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>

      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            Bjlinks<span className="accent"> News</span>
          </div>
          <p className="footer-tagline">Information for living</p>
        </div>

        <div className="footer-sections">
          <h4>Sections</h4>
          <div className="footer-links">
            {categories.map((cat) => (
              <button key={cat.slug} onClick={() => onNavigate(`/category/${cat.slug}`)}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="footer-about">
          <h4>About</h4>
          <p>Bjlinks News delivers premium journalism covering politics, business, technology, and more from Nigeria and around the world.</p>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Bjlinks News. All rights reserved.</p>
        <div className="footer-legal">
          <button onClick={() => onNavigate('/privacy')}>Privacy Policy</button>
          <button onClick={() => onNavigate('/terms')}>Terms of Service</button>
        </div>
      </div>
    </footer>
  )
}