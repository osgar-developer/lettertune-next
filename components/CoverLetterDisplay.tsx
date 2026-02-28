'use client'

import { useState } from 'react'

interface CoverLetterDisplayProps {
  content: string
  onChange?: (content: string) => void
}

export default function CoverLetterDisplay({ content, onChange }: CoverLetterDisplayProps) {
  const [editedContent, setEditedContent] = useState(content)

  // Sync with prop when content changes (new generation)
  if (content && content !== editedContent) {
    setEditedContent(content)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setEditedContent(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const textareaStyle: React.CSSProperties = {
    lineHeight: 1.6,
    width: '100%',
    minHeight: '585px',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontSize: '13px',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(31,42,26,0.12)',
    backgroundColor: 'white',
    color: '#1f2a1a',
    cursor: 'text',
    outline: 'none',
  }

  if (!editedContent) {
    return (
      <textarea
        style={{ ...textareaStyle, color: '#777e72' }}
        placeholder="Your generated cover letter will appear here…"
        value=""
        readOnly
      />
    )
  }

  return (
    <textarea
      style={textareaStyle}
      value={editedContent}
      onChange={handleChange}
    />
  )
}
