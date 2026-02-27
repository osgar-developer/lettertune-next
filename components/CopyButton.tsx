'use client'

interface CopyButtonProps {
  onClick: () => void
  disabled?: boolean
}

export default function CopyButton({ onClick, disabled }: CopyButtonProps) {
  return (
    <button 
      className="btn-success" 
      id="copyBtn" 
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      Copy letter
    </button>
  )
}
