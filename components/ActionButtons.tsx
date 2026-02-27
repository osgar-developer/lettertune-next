'use client'

interface ActionButtonsProps {
  onGenerate: () => void
  onFillExample: () => void
  onClear: () => void
  disabled?: boolean
}

export default function ActionButtons({ onGenerate, onFillExample, onClear, disabled }: ActionButtonsProps) {
  return (
    <div className="actions">
      <button 
        className="btn-primary" 
        id="generateBtn"
        onClick={onGenerate}
        disabled={disabled}
      >
        <span>Generate</span>
      </button>
      <button 
        className="btn-secondary" 
        id="fillExampleBtn" 
        type="button"
        onClick={onFillExample}
      >
        Fill example
      </button>
      <button 
        className="btn-danger" 
        id="clearBtn" 
        type="button"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  )
}
