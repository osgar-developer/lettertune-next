'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <div className="card" style={{ width: '100%', backgroundColor: 'white', padding: '12px', borderRadius: '8px' }}>
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
