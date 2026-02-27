'use client'

interface ModelSelectorProps {
  value: string
  onChange: (value: string) => void
}

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <label>
      <span className="hint">AI Model</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="model"
      >
        <option value="llama">LLaMA (Meta)</option>
        <option value="granite">Granite (IBM)</option>
        <option value="mistral">Mistral</option>
        <option value="openai">OpenAI (GPT-4)</option>
        <option value="deepseek">DeepSeek</option>
      </select>
    </label>
  )
}
