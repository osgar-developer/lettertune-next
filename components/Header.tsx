'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="card bg-white p-3 rounded-lg" style={{ width: '100%' }}>
        <Image
          src="/images/logo.png"
          alt="LetterTune - Personalized Cover Letters"
          width={200}
          height={60}
          className="w-[50%]"
          unoptimized
        />
      </div>
    </header>
  )
}
