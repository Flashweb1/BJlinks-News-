import { Component, ErrorInfo, ReactNode, Suspense } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { logger } from '../../utils/logger'
import { getSiteConfig } from '../../utils/security'

const config = getSiteConfig()

type Props = { children?: ReactNode }
type State = { hasError: boolean; error: Error | null; resetKey: number }

export class AppErrorBoundary extends Component<Props, State> {
  public override state: State = { hasError: false, error: null, resetKey: 0 }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, resetKey: 0 }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('AppErrorBoundary caught error', error, {
      componentStack: errorInfo.componentStack,
    })
  }

  private handleReload = (): void => {
    if (typeof window !== 'undefined') window.location.reload()
  }

  private handleGoHome = (): void => {
    if (typeof window !== 'undefined') window.location.href = '/'
  }

  private handleReset = (): void => {
    this.setState((s) => ({ hasError: false, error: null, resetKey: s.resetKey + 1 }))
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      const errorId = Math.random().toString(36).slice(2, 10).toUpperCase()
      return (
        <div
          key={`error-fallback-${this.state.resetKey}`}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1.25rem',
            fontFamily:
              '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            background:
              'radial-gradient(1200px 600px at 10% 0%, #fff3ec 0%, transparent 60%), linear-gradient(180deg, #fafafa 0%, #f3f0ec 100%)',
            color: '#111',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 560,
              background: '#ffffff',
              border: '1px solid #e9e2d7',
              borderRadius: 16,
              padding: '2.5rem 2rem',
              boxShadow:
                '0 10px 40px -12px rgba(17, 17, 17, 0.12), 0 2px 6px rgba(17, 17, 17, 0.04)',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #ffefe4 0%, #ffe1cf 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <AlertTriangle color="#b7281e" size={28} strokeWidth={2} />
            </div>
            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
                fontSize: '2rem',
                fontWeight: 700,
                margin: 0,
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              Something went wrong.
            </h1>
            <p
              style={{
                color: '#5a5650',
                lineHeight: 1.55,
                margin: 0,
                marginBottom: '1.25rem',
              }}
            >
              We apologize — {config.name} encountered an unexpected issue rendering this
              page. Try reloading, or return to the homepage.
            </p>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#8b8680',
                marginBottom: '1rem',
              }}
            >
              Error ID: {errorId}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              <button
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.125rem',
                  background: '#000',
                  color: '#fff',
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  border: '1px solid #000',
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={16} /> Reload page
              </button>
              <button
                onClick={this.handleGoHome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.125rem',
                  background: '#ffffff',
                  color: '#111',
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  border: '1px solid #e3ddd2',
                  cursor: 'pointer',
                }}
              >
                <Home size={16} /> Back to home
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.125rem',
                  background: '#ffffff',
                  color: '#111',
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  border: '1px solid #e3ddd2',
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <Suspense key={`root-suspense-${this.state.resetKey}`} fallback={null}>
        {this.props.children}
      </Suspense>
    )
  }
}

export default AppErrorBoundary
