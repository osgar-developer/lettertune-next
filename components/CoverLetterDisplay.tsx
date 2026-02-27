'use client'

interface CoverLetterDisplayProps {
  content: string
}

export default function CoverLetterDisplay({ content }: CoverLetterDisplayProps) {
  return (
    <div className="result" id="coverLetterResult">
      {content || 'Your generated cover letter will appear here…'}
    </div>
  )
}
