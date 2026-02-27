'use client'

interface GenerationInfoProps {
  model: string
  duration: string
  used: string | number
  limit: string | number
}

export default function GenerationInfo({ model, duration, used, limit }: GenerationInfoProps) {
  return (
    <div className="meta-box">
      <p className="meta-title">Generation info</p>
      <div className="hint" id="runInfo">
        {model ? `AI Model: ${model} · Duration: ${duration}` : '—'}
      </div>
      <div className="hint" id="genInfo" style={{ marginTop: '6px' }}>
        {used !== undefined ? `Generation nr: ${used} (Limit: ${limit})` : '—'}
      </div>
    </div>
  )
}
