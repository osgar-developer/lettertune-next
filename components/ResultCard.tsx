'use client'

import { ReactNode } from 'react'

interface ResultCardProps {
  children: ReactNode
}

export default function ResultCard({ children }: ResultCardProps) {
  return (
    <div className="card">
      <div className="card-inner">
        <p className="section-title"><strong>Result</strong><span className="hint"></span></p>
        <div className="meta">
          {children}
        </div>
      </div>
    </div>
  )
}
