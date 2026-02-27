'use client'

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
  onCopy: () => void
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
  return (
    <div className="card bg-[rgba(255,255,255,0.85)] border border-[rgba(31,42,26,0.12)] rounded-xl shadow-[0_10px_28px_rgba(31,42,26,0.12)] overflow-hidden">
      <div className="p-4 flex flex-col gap-4">
        <p className="text-[13px] text-[#777e72] m-0 flex items-center justify-between gap-2">
          <strong className="text-[#1f2a1a] text-[14px] font-bold">Result</strong>
        </p>

        <div className="flex flex-col gap-[10px]">
          <div className="p-3 rounded-lg border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.04)]">
            <p className="text-[13px] text-[#777e72] m-0 mb-2">Cover letter</p>
            <CoverLetterDisplay content={coverLetter} />
            <div className="flex gap-[10px] mt-3">
              <button
                onClick={onCopy}
                className="border-0 rounded-lg px-4 py-[11px] font-bold cursor-pointer text-[14px] flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5faf3b, rgba(32, 203, 17, 0.45))',
                  color: '#0f1d0b',
                  boxShadow: '0 10px 24px rgba(95,175,59,0.25)',
                }}
              >
                Copy letter
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
