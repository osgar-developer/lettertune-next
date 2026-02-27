'use client'

interface StyleNotesProps {
  content: string
}

export default function StyleNotes({ content }: StyleNotesProps) {
  if (!content) {
    return <span className="text-[12px] text-[#777e72]">—</span>
  }

  return (
    <div
      className="bg-white border border-[rgba(31,42,26,0.12)] rounded-lg p-3 min-h-[92px] text-[13px]"
      style={{ lineHeight: 1.5 }}
    >
      {content}
    </div>
  )
}
