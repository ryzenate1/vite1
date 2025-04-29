import * as React from 'react'
import { useEffect, useState } from 'react'
import { logger } from '../utils/logger'

interface LogEntry {
  timestamp: string
  level: 'error' | 'warn' | 'info'
  message: string
  error?: Error
  component?: string
}

export const ErrorDisplay: React.FC = () => {
  const [errors, setErrors] = useState<LogEntry[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const logs = logger.getLogs()
      const errorLogs = logs.filter(log => log.level === 'error')
      if (errorLogs.length > 0) {
        setErrors(errorLogs)
        setIsVisible(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible || errors.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      border: '1px solid red',
      padding: '20px',
      maxWidth: '400px',
      maxHeight: '300px',
      overflow: 'auto',
      zIndex: 9999,
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, color: 'red' }}>Errors Detected</h3>
        <button 
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'red',
            cursor: 'pointer',
            fontSize: '20px'
          }}
        >
          ×
        </button>
      </div>
      {errors.map((error, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>{error.message}</div>
          {error.error && (
            <div style={{ color: '#666', fontSize: '12px', marginTop: '5px' }}>
              {error.error.message}
            </div>
          )}
          {error.component && (
            <div style={{ color: '#999', fontSize: '10px', marginTop: '2px' }}>
              Component: {error.component}
            </div>
          )}
          <div style={{ color: '#999', fontSize: '10px', marginTop: '2px' }}>
            {error.timestamp}
          </div>
        </div>
      ))}
    </div>
  )
} 