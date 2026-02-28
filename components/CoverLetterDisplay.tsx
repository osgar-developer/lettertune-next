'use client'

import { useState } from 'react'

interface CoverLetterDisplayProps {
  content: string
  onChange?: (content: string) => void
}

export default function CoverLetterDisplay({ content, onChange }: CoverLetterDisplayProps) {
  // Local state for the edited content - default to prop content
  const [localContent, setLocalContent] = useState<string>(content || '')

  // Handler for textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalContent(newValue)
    // Notify parent of changes
    if (onChange) {
      onChange(newValue)
    }
  }

  // What to display - prefer local edits, fall back to prop
  const displayValue = localContent || content || ''

  const baseStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '585px',
    height: '585px',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontSize: '13px',
    lineHeight: '1.6',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(31,42,26,0.12)',
    backgroundColor: 'white',
    color: '#1f2a1a',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflow: 'auto',
  }

  return (
    <textarea
      style={baseStyle}
      value={displayValue}
      onChange={handleChange}
    />
  )
}
