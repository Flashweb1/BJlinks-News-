import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { BookmarksProvider } from './contexts/BookmarkContext'
import { AppErrorBoundary } from './components/common/AppErrorBoundary'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error(
    'Root element #root not found. Ensure index.html contains <div id="root">.'
  )
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <BookmarksProvider>
                <App />
              </BookmarksProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
