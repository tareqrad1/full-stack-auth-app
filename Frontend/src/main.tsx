import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './lib/ErrorBoundry.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
