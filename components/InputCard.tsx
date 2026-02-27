'use client'

import { ReactNode } from 'react'

interface InputCardProps {
  children: ReactNode
}

export default function InputCard({ children }: InputCardProps) {
  return (
    <div className="card">
      <div className="card-inner">
        <p className="section-title"><strong>Inputs</strong><span className="hint"></span></p>
        {children}
      </div>
    </div>
  )
}
