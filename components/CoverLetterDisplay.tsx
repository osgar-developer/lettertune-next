'use client'

interface CoverLetterDisplayProps {
  content: string
}

export default function CoverLetterDisplay({ content }: CoverLetterDisplayProps) {
  if (!content) {
    return (
      <div
        className="bg-white border border-[rgba(31,42,26,0.12)] rounded-lg p-4 whitespace-pre-wrap text-[13px]"
        style={{ lineHeight: 1.6, color: '#777e72' }}
      >
        Your generated cover letter will appear here…
      </div>
    )
  }

  return (
    <div
      className="bg-white border border-[42,26,0.12)]rgba(31, rounded-lg p-4 whitespace-pre-wrap text-[13px]"
      style={{ lineHeight: 1.6 }}
    >
      {content}
    </div>
  )
}
