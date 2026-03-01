'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark'
    setIsDark(dark)

    // Listen for theme changes
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

  return (
    <header>
      <div 
        className="card card-hover header-bg" 
        style={{ 
          width: '100%', 
          padding: '12px',
          border: '1px solid rgba(46, 125, 50, 0.15)',
          borderRadius: '14px 14px 0 0',
          backgroundColor: isDark ? '#000000' : 'white'
        }}
      >
        <Image
          src={isDark ? '/images/logo_dark.png' : '/images/logo.png'}
          alt="LetterTune - Personalized Cover Letters"
          width={200}
          height={60}
          style={{ width: '50%', height: 'auto' }}
          unoptimized
        />
      </div>
    </header>
  )
}
