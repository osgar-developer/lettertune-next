'use client'

import { useState } from 'react'

interface CoverLetterDisplayProps {
  content: string
  onChange?: (content: string) => void
}

export default function CoverLetterDisplay({ content, onChange }: CoverLetterDisplayProps) {
  const [editableContent, setEditableContent] = useState(content)

  // Sync with prop when content changes (new generation)
  if (content && content !== editableContent) {
    setEditableContent(content)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setEditableContent(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  if (!editableContent) {
    return (
      <textarea
        className="bg-white border border-[rgba(31,42,26,0.12)] rounded-lg p-4 whitespace-pre-wrap text-[13px]"
        style={{ 
          lineHeight: 1.6, 
          color: '#777e72',
          width: '100%',
          minHeight: '150px',
          resize: 'vertical',
          fontFamily: 'inherit'
        }}
        placeholder="Your generated cover letter will appear here…"
        value=""
        readOnly
      />
    )
  }

  return (
    <textarea
      className="bg-white border border-[rgba(31,42,26,0.12)] rounded-lg p-4 whitespace-pre-wrap text-[13px]"
      style={{ 
        lineHeight: 1.6, 
        width: '100%',
        minHeight: '150px',
        resize: 'vertical',
        fontFamily: 'inherit'
      }}
      value={editableContent}
      onChange={handleChange}
    />
  )
}
