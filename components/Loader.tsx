'use client'

interface LoaderProps {
  isLoading: boolean
}

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <div className={`loader-wrapper ${isLoading ? 'block' : 'hidden'}`} style={{ marginTop: '10px' }}>
      <div className="loader-line"></div>
    </div>
  )
}
