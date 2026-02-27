'use client'

interface AdditionalInstructionsInputProps {
  value: string
  onChange: (value: string) => void
}

export default function AdditionalInstructionsInput({ value, onChange }: AdditionalInstructionsInputProps) {
  return (
    <label>
      <span className="hint">Additional instructions (optional)</span>
      <input
        id="additional_instructions"
        type="text"
        placeholder='e.g. "Write in German, under 250 words"'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ minHeight: '44px', resize: 'none' }}
      />
    </label>
  )
}
