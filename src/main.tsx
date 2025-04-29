import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CursorProvider } from './context/CursorContext'
import { logger } from './utils/logger'
import './locomotive-scroll.css'
import './index.css'
import App from './App'

// Add console logging for debugging
console.log('Starting application initialization...')

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

// Error Boundary Component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Error caught by boundary:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error details:', error)
    console.error('Error stack:', errorInfo.componentStack)
    logger.error('Error caught by boundary', error, 'ErrorBoundary')
    logger.error('Error stack:', new Error(errorInfo.componentStack || ''), 'ErrorBoundary')
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          color: 'red',
          backgroundColor: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1>Something went wrong.</h1>
          <pre style={{ 
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '5px',
            maxWidth: '80%',
            overflow: 'auto',
            marginTop: '20px'
          }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}

// Initialize logging
console.log('Initializing logger...')
logger.info('Application starting...', 'main')

// Add global error handler
window.onerror = (message, _source, _lineno, _colno, error) => {
  console.error('Global error:', message, error)
  logger.error('Global error caught', error || new Error(message as string), 'global')
  return false
}

// Add unhandled promise rejection handler
window.onunhandledrejection = (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  logger.error('Unhandled promise rejection', event.reason, 'global')
}

try {
  console.log('Looking for root element...')
  const rootElement = document.getElementById('root')
  
  if (!rootElement) {
    throw new Error('Root element not found. Please ensure there is a div with id="root" in your index.html')
  }

  console.log('Root element found, creating root...')
  const root = createRoot(rootElement)
  
  console.log('Rendering application...')
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <CursorProvider>
          <App />
        </CursorProvider>
      </ErrorBoundary>
    </StrictMode>
  )

  console.log('Application rendered successfully')
  logger.info('Application rendered successfully', 'main')
} catch (error) {
  console.error('Failed to initialize application:', error)
  logger.error('Failed to initialize application', error as Error, 'main')
  
  // Display error in the DOM if root element exists
  const rootElement = document.getElementById('root')
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px;">
        <h1>Application Failed to Initialize</h1>
        <pre>${(error as Error).toString()}</pre>
      </div>
    `
  }
}
