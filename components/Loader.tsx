'use client'

import { useState, useEffect } from 'react'

interface LoaderProps {
  isLoading: boolean
}

export default function Loader({ isLoading }: LoaderProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark'
    setIsDark(dark)

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      setIsDark(dark)
    })
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
    return () => observer.disconnect()
  }, [])

  if (!isLoading) return null

  const bgColor = isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.85)'
  const textColor = isDark ? '#4ade80' : '#2e7d32'
  const subtextColor = isDark ? '#a0a0a0' : '#4a5a4a'
  const progressBg = isDark ? 'rgba(74, 222, 128, 0.15)' : 'rgba(46, 125, 50, 0.1)'

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: bgColor,
      backdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      transition: 'background-color 0.3s ease',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        {/* Animated Logo/Text */}
        <div style={{
          fontSize: '28px',
          fontWeight: 700,
          color: textColor,
          letterSpacing: '-0.02em',
        }}>
          LetterTune
        </div>

        {/* Loading Animation */}
        <div style={{
          width: '200px',
          height: '4px',
          backgroundColor: progressBg,
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '35%',
            height: '100%',
            background: isDark 
              ? 'linear-gradient(90deg, #16a34a, #4ade80, #22c55e, #16a34a)'
              : 'linear-gradient(90deg, #2e7d32, #4caf50, #81c784, #2e7d32)',
            backgroundSize: '200% 100%',
            borderRadius: '2px',
            animation: 'loadingSlide 1.5s ease-in-out infinite',
          }} />
        </div>

        {/* Status Text */}
        <div style={{
          fontSize: '14px',
          color: subtextColor,
          fontWeight: 500,
        }}>
          Generating your cover letter...
        </div>
      </div>

      <style jsx>{`
        @keyframes loadingSlide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(200%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  )
}
