'use client'

interface ModelSelectorProps {
  value: string
  onChange: (value: string) => void
}

const models = [
  { value: 'llama', label: 'LLaMA (Meta)' },
  { value: 'granite', label: 'Granite (IBM)' },
  { value: 'mistral', label: 'Mistral' },
  { value: 'openai', label: 'OpenAI (GPT-4)' },
  { value: 'deepseek', label: 'DeepSeek' },
]

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] text-[#777e72]">AI Model</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.95)] text-[#1f2a1a] rounded-lg p-3 outline-none min-h-[44px] text-[13px] appearance-none"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.65) 50%), linear-gradient(135deg, rgba(255,255,255,0.65) 50%, transparent 50%)`,
          backgroundPosition: 'calc(100% - 18px) 19px, calc(100% - 13px) 19px',
          backgroundSize: '5px 5px, 5px 5px',
          backgroundRepeat: 'no-repeat',
          paddingRight: '36px',
        }}
      >
        {models.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
    </label>
  )
}
