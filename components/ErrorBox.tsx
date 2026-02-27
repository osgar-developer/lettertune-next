'use client'

interface ErrorBoxProps {
  message: string
}

export default function ErrorBox({ message }: ErrorBoxProps) {
  return (
    <div 
      className="error" 
      id="errorBox"
      style={{ display: message ? 'block' : 'none' }}
    >
      {message}
    </div>
  )
}
