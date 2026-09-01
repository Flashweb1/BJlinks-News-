import { Helmet } from 'react-helmet-async'
import { Scale, ShieldCheck, AlertTriangle } from 'lucide-react'
import { buildCanonicalUrl, getSiteConfig } from '../utils/security'

export default function TermsPage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const cfg = getSiteConfig()
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const year = new Date().getFullYear()

  return (
    <main className="page-content terms-page" style={{ maxWidth: 760, marginInline: 'auto' }}>
      <Helmet>
        <title>Terms of Service — {cfg.name}</title>
        <meta name="description" content={`Terms of Service for ${cfg.name}.`} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={buildCanonicalUrl('/terms')} />
        <meta property="og:title" content={`Terms of Service — ${cfg.name}`} />
        <meta property="og:url" content={buildCanonicalUrl('/terms')} />
      </Helmet>

      <article style={{ padding: '2.5rem 1.25rem 4rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.3rem 0.7rem',
              borderRadius: 999,
              background: '#fff3ec',
              color: '#b7281e',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Scale size={13} /> Legal
          </div>
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: '0.5rem',
            }}
          >
            Terms of Service
          </h1>
          <p style={{ color: '#6f6a63', margin: 0 }}>
            Last updated: {today} · Effective {year}
          </p>
        </header>

        <div
          className="article-detail prose"
          style={{ fontSize: 16, lineHeight: 1.7, color: '#1a1714' }}
        >
          <p className="article-dek">
            These Terms of Service ("Terms") are a binding legal agreement between you and{' '}
            <strong>{cfg.name}</strong> ("we", "us", "our"). By accessing or using {cfg.name},
            you agree to be bound by these Terms. If you do not agree, please do not use the
            service.
          </p>

          <h2>1. Description of service</h2>
          <p>
            {cfg.name} is a digital news publication providing editorial, analysis, and
            opinion content, along with reader features including bookmarks, search, and a
            newsletter subscription. The service is provided "as is" without warranty of any kind.
          </p>

          <h2>2. Eligibility and accounts</h2>
          <ul>
            <li>You must be at least 13 years old to use the service.</li>
            <li>
              You agree to provide accurate, complete, and current account information and
              to update it promptly.
            </li>
            <li>
              You are responsible for safeguarding your account credentials and for any
              activity conducted under your account.
            </li>
            <li>
              You must be at least 16 years old to create an account and agree to these Terms.
              If you are under 16, you may use the service only with parental consent.
            </li>
          </ul>

          <h2>3. Acceptable use</h2>
          <p>You agree <strong>not</strong> to:</p>
          <ul>
            <li>
              Violate any applicable law, regulation, or third-party right, including
              copyright, trademark, privacy, and publicity.
            </li>
            <li>
              Engage in scraping, crawling, automated access, volume article downloading, or
              data extraction without our written consent.
            </li>
            <li>
              Circumvent or disable any security, authentication, or access-control feature
              of the service.
            </li>
            <li>
              Upload, post, or transmit any content that contains viruses, malware, or other
              harmful code.
            </li>
            <li>
              Use the service for commercial purposes (e.g., republishing, reselling, or
              syndicating our content) without our written consent.
            </li>
            <li>
              Intentionally interfere with the proper working of the service or any activities
              conducted on the service.
            </li>
            <li>
             Harass, abuse, threaten, or intimidate any person or entity.
            </li>
          </ul>

          <h2>4. Intellectual property rights</h2>
          <p>
            Except as otherwise noted, all content published on {cfg.name} — including
            articles, photos, illustrations, graphics, logos, audio, and source code — is
            owned or licensed by us and is protected by copyright, trademark, and other
            intellectual property laws.
          </p>
          <p>
            You may view, download, and print individual pages for your personal, non-commercial
            use only, provided you:
          </p>
          <ul>
            <li>Maintain all copyright and other notices contained in the material</li>
            <li>Do not modify the material in any way</li>
            <li>Do not use the material for public performance or commercial purposes</li>
            <li>Do not reproduce, republish, or distribute the material without our express written consent</li>
          </ul>
          <p>
            All rights not expressly granted herein are reserved by {cfg.name} and its
            licensors. Unauthorized use of the materials may violate copyright, trademark,
            and other laws.
          </p>

          <h2>5. User-generated content and comments</h2>
          <p>
            While we do not currently support user comments, if you submit any content (articles,
            feedback, suggestions, etc.), you represent and warrant that:
          </p>
          <ul>
            <li>You own all rights to the content or have necessary permissions</li>
            <li>The content does not violate any third-party rights</li>
            <li>The content is accurate and not misleading</li>
            <li>You grant {cfg.name} a perpetual, irrevocable, worldwide, royalty-free license</li>
          </ul>
          <p>
            We reserve the right to remove any content that violates these Terms or is otherwise
            inappropriate.
          </p>

          <h2>6. Newsletter subscriptions and communications</h2>
          <p>
            If you subscribe to our newsletter(s), you agree to receive electronic
            communications from us. You may unsubscribe at any time via the one-click
            unsubscribe link contained in every message or by contacting{' '}
            <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a>.
          </p>
          <p>
            By subscribing, you consent to receiving marketing communications and agree that
            our Privacy Policy governs the processing of your email address and other personal
            data provided during subscription.
          </p>

          <h2>7. Third-party links and content</h2>
          <p>
            Our service may contain links to third-party websites or content. We do not control,
            endorse, or accept responsibility for these external resources. You access them at
            your own risk. We recommend reviewing their terms and privacy policies.
          </p>

          <h2>8. Disclaimer of warranties</h2>
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 12,
              background: '#fff8f0',
              border: '1px solid #ffe0c8',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <AlertTriangle size={18} style={{ color: '#ca8a04' }} />
              <strong>Important Disclaimer</strong>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              The service and all content are provided on an "AS IS" and "AS AVAILABLE" basis.
              We disclaim all warranties, express or implied, including warranties of
              merchantability, fitness for a particular purpose, title, and non-infringement.
              We do not warrant that the service will be uninterrupted, error-free, secure, or
              free of viruses or other harmful components.
            </p>
          </div>
          <p>
            News content may change rapidly. While we strive for accuracy, we do not guarantee
            the completeness or timeliness of information on the site.
          </p>

          <h2>9. Limitation of liability</h2>
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 12,
              background: '#fff8f0',
              border: '1px solid #ffe0c8',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={18} style={{ color: '#059669' }} />
              <strong>Limitation Liability Clause</strong>
            </div>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              To the maximum extent permitted by applicable law, in no event shall {cfg.name}
              or its directors, officers, employees, or agents be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits,
              revenues, data, or use, arising out of or related to these Terms or the service,
              even if advised of the possibility of such damages. Our total aggregate liability
              to you for any claim arising out of these Terms shall not exceed the total amount
              you paid (if any) to use the service in the twelve (12) months preceding the
              claim.
            </p>
          </div>
          <p>
            This limitation applies to all causes of action, including but not limited to:
            breach of contract, negligence, tort, defamation, invasion of privacy, and
            unauthorized use.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless {cfg.name} and its officers,
            directors, employees, and agents from and against any claim, action, demand,
            damage, loss, liability, cost, or expense (including reasonable attorney fees)
            arising out of or related to your breach of these Terms, your use of the
            service, your violation of any third-party right, or any content you submit.
          </p>

          <h2>11. Modification of terms and service</h2>
          <p>
            We may revise these Terms from time to time. The most current version will be
            posted on this page with the "Last updated" date. Your continued use of
            the service after changes become effective constitutes your acceptance of the
            revised Terms.
          </p>
          <p>
            For material changes, we will attempt to notify registered users via email or
            website banner at least 30 days before the changes take effect.
          </p>

          <h2>12. Termination</h2>
          <p>
            We may suspend or terminate your access to the service immediately, without prior
            notice or liability, for any reason including but not limited to:
          </p>
          <ul>
            <li>Breach of these Terms</li>
            <li>Illegal or improper use of the service</li>
            <li>Security concerns or suspected fraudulent activity</li>
            <li>Extended inactivity on your account</li>
          </ul>
          <p>
            Upon termination, your right to use the service will cease immediately, but
            provisions regarding intellectual property, disclaimers, limitations of liability,
            and indemnification will survive.
          </p>

          <h2>13. Governing law and jurisdiction</h2>
          <p>
            These Terms shall be governed by the laws of the Federal Republic of Nigeria,
            without regard to its conflict-of-law principles. Any dispute arising out of or
            related to these Terms or the service shall first be resolved through good-faith
            negotiation; if unresolved, the parties submit to the exclusive jurisdiction of
            the competent courts in Lagos, Nigeria.
          </p>
          <p>
            Notwithstanding the foregoing, we may seek injunctive or remedial relief in any
            court of competent jurisdiction to protect our intellectual property or enforce
            this Agreement.
          </p>

          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, that
            provision shall be severed and the remaining provisions shall remain in full
            force and effect. The invalid or unenforceable provision shall be replaced with
            a provision that accomplishes the original purpose to the fullest extent possible.
          </p>

          <h2>15. Waiver</h2>
          <p>
            Our failure to exercise or enforce any right or provision of these Terms shall
            not constitute a waiver of that right or provision. Any waiver must be in writing
            and signed by an authorized representative of {cfg.name}.
          </p>

          <h2>16. Force majeure</h2>
          <p>
            We shall not be liable for any delay or failure to perform resulting from causes
            beyond our reasonable control, including but not limited to: acts of God, war,
            terrorism, riots, fire, earthquakes, floods, storms, pandemics, equipment failures,
            labor disputes, or government actions.
          </p>

          <h2>17. Relationship of parties</h2>
          <p>
            No joint venture, partnership, employment, or agency relationship exists between
            you and {cfg.name} as a result of these Terms or your use of the service.
          </p>

          <h2>18. Entire agreement</h2>
          <p>
            These Terms, together with the Privacy Policy and any other documents incorporated
            by reference, constitute the entire agreement between you and {cfg.name} regarding
            the service and supersede all prior or contemporaneous agreements, representations,
            warranties, and understandings.
          </p>

          <h2>19. Contact information</h2>
          <p>
            Questions or notices regarding these Terms should be directed to:
          </p>
          <p style={{ margin: '1rem 0' }}>
            <strong>Email:</strong> <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a><br />
            <strong>Address:</strong> Lagos, Nigeria
          </p>

          <div
            style={{
              marginTop: '3rem',
              padding: '1.25rem',
              borderRadius: 12,
              background: '#f8f5f0',
              border: '1px solid #e9e2d7',
              fontSize: 14,
              color: '#5a5650',
            }}
          >
            <strong>Disclaimer:</strong> This Terms of Service is a template providing a baseline for general
            web-publisher terms. It is provided "as is" without warranty of any kind.
            Consult a qualified lawyer before publication to ensure it accurately reflects your jurisdiction,
            business model, and legal obligations. This template does not constitute legal advice.
          </div>

          {onNavigate && (
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => onNavigate('/')}
                className="btn-secondary"
                style={{
                  display: 'inline-flex',
                  padding: '0.7rem 1.25rem',
                  borderRadius: 10,
                  border: '1px solid #e3ddd2',
                  background: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Back to homepage
              </button>
            </div>
          )}
        </div>
      </article>
    </main>
  )
}
