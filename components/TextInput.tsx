'use client'

interface TextInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  isTextArea?: boolean
}

export default function TextInput({ label, placeholder, value, onChange, isTextArea = true }: TextInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] text-[#777e72]">{label}</span>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.95)] text-[#1f2a1a] rounded-lg p-3 outline-none resize-vertical min-h-[240px] text-[13px] input-focus"
          style={{ lineHeight: 1.4 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.95)] text-[#1f2a1a] rounded-lg p-3 outline-none min-h-[44px] text-[13px] input-focus"
        />
      )}
    </label>
  )
}
