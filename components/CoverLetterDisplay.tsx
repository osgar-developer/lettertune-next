'use client'

import { useState, useRef, useEffect } from 'react'

interface CoverLetterDisplayProps {
  content: string
  onChange?: (content: string) => void
}

export default function CoverLetterDisplay({ content, onChange }: CoverLetterDisplayProps) {
  const [editedContent, setEditedContent] = useState(content)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sync with prop when content changes (new generation)
  useEffect(() => {
    if (content && content !== editedContent) {
      setEditedContent(content)
    }
  }, [content])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setEditedContent(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

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

  if (!editedContent) {
    return (
      <textarea
        ref={textareaRef}
        style={{ ...baseStyle, color: '#777e72' }}
        placeholder="Your generated cover letter will appear here…"
        value=""
        onChange={() => {}}
      />
    )
  }

  return (
    <textarea
      ref={textareaRef}
      style={baseStyle}
      value={editedContent}
      onChange={handleChange}
    />
  )
}
