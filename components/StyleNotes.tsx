'use client'

interface StyleNotesProps {
  content: string
}

export default function StyleNotes({ content }: StyleNotesProps) {
  return (
    <div className="result" id="styleNotes" style={{ minHeight: '92px' }}>
      {content || ''}
    </div>
  )
}
