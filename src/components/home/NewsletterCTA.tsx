import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import './home.css'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    // TODO: Submit to Firebase
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="newsletter-cta-section">
      <div className="newsletter-cta-panel">
        <div className="newsletter-cta-icon">
          <Mail size={32} />
        </div>
        <h2 className="newsletter-cta-title">Never miss a story</h2>
        <p className="newsletter-cta-subtitle">
          Subscribe to our newsletter for daily headlines and in-depth analysis
        </p>
        <form className="newsletter-cta-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="newsletter-cta-input"
              disabled={submitted}
            />
            <button type="submit" className="newsletter-cta-btn" disabled={submitted}>
              {submitted ? (
                <>
                  <CheckCircle size={18} />
                  <span>Subscribed!</span>
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          {error && <span className="form-error">{error}</span>}
        </form>
        <p className="newsletter-cta-note">We'll never share your email. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
