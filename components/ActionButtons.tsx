'use client'

interface ActionButtonsProps {
  onGenerate: () => void
  onFillExample: () => void
  onClear: () => void
  isLoading: boolean
}

export default function ActionButtons({ onGenerate, onFillExample, onClear, isLoading }: ActionButtonsProps) {
  return (
    <div className="flex gap-[10px] flex-wrap">
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="border-0 rounded-lg px-4 py-[11px] font-bold cursor-pointer transition-transform text-[14px] flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, #5faf3b, rgba(32, 203, 17, 0.45))',
          color: '#0f1d0b',
          boxShadow: '0 10px 24px rgba(95,175,59,0.25)',
        }}
      >
        {isLoading && <span className="spinner" />}
        <span>Generate</span>
      </button>
      <button
        onClick={onFillExample}
        type="button"
        disabled={isLoading}
        className="bg-white text-[#1f2a1a] border border-[rgba(31,42,26,0.12)] rounded-lg px-4 py-[11px] font-bold cursor-pointer text-[14px]"
      >
        Fill example
      </button>
      <button
        onClick={onClear}
        type="button"
        disabled={isLoading}
        className="border-0 rounded-lg px-4 py-[11px] font-bold cursor-pointer text-[14px]"
        style={{
          background: 'rgba(239,68,68,0.15)',
          color: 'rgba(30, 29, 29, 0.92)',
          border: '1px solid rgba(239,68,68,0.35)',
        }}
      >
        Clear
      </button>
    </div>
  )
}
