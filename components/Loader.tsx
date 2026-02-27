'use client'

interface LoaderProps {
  visible: boolean
}

export default function Loader({ visible }: LoaderProps) {
  return (
    <div 
      className="loader-wrapper" 
      id="loaderWrapper"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div className="loader-line"></div>
    </div>
  )
}
