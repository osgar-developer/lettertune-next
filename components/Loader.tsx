'use client'

interface LoaderProps {
  isLoading: boolean
}

export default function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
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
          color: '#2e7d32',
          letterSpacing: '-0.02em',
        }}>
          LetterTune
        </div>

        {/* Loading Animation */}
        <div style={{
          width: '200px',
          height: '4px',
          backgroundColor: 'rgba(46, 125, 50, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '35%',
            height: '100%',
            background: 'linear-gradient(90deg, #2e7d32, #4caf50, #81c784, #2e7d32)',
            backgroundSize: '200% 100%',
            borderRadius: '2px',
            animation: 'loadingSlide 1.5s ease-in-out infinite',
          }} />
        </div>

        {/* Status Text */}
        <div style={{
          fontSize: '14px',
          color: '#4a5a4a',
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
