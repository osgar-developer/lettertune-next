'use client'

import { useState, useEffect } from 'react'

interface CoverLetterDisplayProps {
  content: string
  onChange?: (content: string) => void
}

export default function CoverLetterDisplay({ content, onChange }: CoverLetterDisplayProps) {
  // Local state for the edited content
  const [localContent, setLocalContent] = useState(content)

  // When content prop changes (new generation), update local state
  useEffect(() => {
    if (content && content !== localContent) {
      setLocalContent(content)
    }
  }, [content, localContent])

  // Handler for textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalContent(newValue)
    // Notify parent of changes
    if (onChange) {
      onChange(newValue)
    }
  }

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

  if (!displayValue) {
    return (
      <textarea
        style={{ ...baseStyle, color: '#777e72' }}
        placeholder="Your generated cover letter will appear here…"
        value=""
        onChange={handleChange}
      />
    )
  }

  return (
    <textarea
      style={baseStyle}
      value={displayValue}
      onChange={handleChange}
    />
  )
}

// Export a way to get current content - though in React we use callbacks
// The component uses controlled input via onChange
