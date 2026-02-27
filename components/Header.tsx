'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <div 
        className="card" 
        style={{ 
          width: '100%', 
          padding: '12px',
          border: '1px solid rgba(46, 125, 50, 0.15)',
          borderRadius: '14px'
        }}
      >
        <Image
          src="/images/logo.png"
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
