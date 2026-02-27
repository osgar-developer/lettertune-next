'use client'

interface GenerationInfoProps {
  model: string
  duration: number
  generationNumber: number
  limit: number
}

export default function GenerationInfo({ model, duration, generationNumber, limit }: GenerationInfoProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[12px] text-[#777e72]">
        {model ? `AI Model: ${model} · Duration: ${duration}s` : '—'}
      </span>
      <span className="text-[12px] text-[#777e72]" style={{ marginTop: '6px' }}>
        {generationNumber > 0 ? `Generation nr: ${generationNumber} (Limit: ${limit})` : '—'}
      </span>
    </div>
  )
}
