'use client'

interface TextInputProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  minHeight?: number
}

export default function TextInput({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange,
  minHeight = 260
}: TextInputProps) {
  return (
    <label>
      <span className="hint">{label}</span>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ minHeight: `${minHeight}px` }}
      />
    </label>
  )
}
