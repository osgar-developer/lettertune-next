'use client'

import { useState, useEffect } from 'react'
import CoverLetterDisplay from './CoverLetterDisplay'
import KeyMatches from './KeyMatches'
import StyleNotes from './StyleNotes'
import GenerationInfo from './GenerationInfo'

interface ResultCardProps {
  coverLetter: string
  keyMatches: string[]
  styleNotes: string
  model: string
  duration: number
  generationNumber: number
  limit: number
  onCopy: (content: string) => void
}

export default function ResultCard({
  coverLetter,
  keyMatches,
  styleNotes,
  model,
  duration,
  generationNumber,
  limit,
  onCopy,
}: ResultCardProps) {
  // Track edited content - starts with generated cover letter
  const [editedContent, setEditedContent] = useState<string>('')

  // When coverLetter prop changes (new generation), reset edited content
  useEffect(() => {
    if (coverLetter) {
      setEditedContent(coverLetter)
    }
  }, [coverLetter])

  // Handler when user edits the textarea
  const handleContentChange = (newContent: string) => {
    setEditedContent(newContent)
  }

  // Handler for copy button - use edited content
  const handleCopyClick = () => {
    onCopy(editedContent)
  }

  // Handler for download PDF button
  const handleDownloadPdf = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'cover-letter.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    } catch (error) {
      console.error('PDF download error:', error)
      alert('Failed to download PDF')
    }
  }

  return (
    <div className={`card bg-[rgba(255,255,255,0.85)] border border-[rgba(31,42,26,0.12)] rounded-b-xl rounded-t-none shadow-[0_10px_28px_rgba(31,42,26,0.12)] overflow-hidden ${coverLetter ? 'result-appear card-hover' : ''}`}>
      <div className="p-4 flex flex-col gap-4">
        <p className="text-[13px] text-[#777e72] m-0 flex items-center justify-between gap-2">
          <strong className="text-[#1f2a1a] text-[14px] font-bold">Result</strong>
        </p>

        <div className="flex flex-col gap-[10px]">
          <div className="p-3 rounded-lg border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.04)]">
            <p className="text-[13px] text-[#777e72] m-0 mb-2">Cover letter</p>
            <CoverLetterDisplay 
              content={editedContent} 
              onChange={handleContentChange} 
            />
            <div className="flex gap-[10px] mt-3">
              <button
                onClick={handleCopyClick}
                className="border-0 rounded-lg px-4 py-[11px] font-bold cursor-pointer text-[14px] flex items-center justify-center gap-2 transition-transform btn-press"
                style={{
                  background: 'linear-gradient(135deg, #5faf3b, rgba(32, 203, 17, 0.45))',
                  color: '#0f1d0b',
                  boxShadow: '0 10px 24px rgba(95,175,59,0.25)',
                }}
              >
                Copy letter
              </button>
              <button
                onClick={handleDownloadPdf}
                type="button"
                className="border-0 rounded-lg px-4 py-[11px] font-bold cursor-pointer text-[14px] flex items-center justify-center gap-2 transition-transform btn-press"
                style={{
                  background: 'linear-gradient(135deg, #5faf3b, rgba(32, 203, 17, 0.45))',
                  color: '#0f1d0b',
                  boxShadow: '0 10px 24px rgba(95,175,59,0.25)',
                }}
              >
                Download PDF
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.04)]">
            <p className="text-[13px] text-[#777e72] m-0 mb-2">Key matches</p>
            <KeyMatches items={keyMatches} />
          </div>

          <div className="p-3 rounded-lg border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.04)]">
            <p className="text-[13px] text-[#777e72] m-0 mb-2">Style notes</p>
            <StyleNotes content={styleNotes} />
          </div>

          <div className="p-3 rounded-lg border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.04)]">
            <p className="text-[13px] text-[#777e72] m-0 mb-2">Generation info</p>
            <GenerationInfo
              model={model}
              duration={duration}
              generationNumber={generationNumber}
              limit={limit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
