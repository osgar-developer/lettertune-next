'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import InputCard from '@/components/InputCard'
import ResultCard from '@/components/ResultCard'
import DonationCard from '@/components/DonationCard'

interface GenerateResponse {
  cover_letter: string
  key_matches: string[]
  style_notes: string
  model: string
  duration: number
  used: number
  limit: number
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GenerateResponse | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async (data: {
    model: string
    company_job_info: string
    applicant_background: string
    previous_cover_letter: string
    additional_instructions: string
  }) => {
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const responseData = await res.json()

      if (!res.ok) {
        const missing = responseData.missing_fields
          ? ` Missing: ${responseData.missing_fields.join(', ')}`
          : ''
        throw new Error((responseData.error || 'Request failed') + missing)
      }

      setResult(responseData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result?.cover_letter) return
    try {
      await navigator.clipboard.writeText(result.cover_letter)
    } catch {
      setError('Could not copy automatically. Please copy manually.')
    }
  }

  return (
    <main className="min-h-screen p-6 flex justify-center items-start">
      <div className="w-full max-w-[980px] flex flex-col gap-[18px]">
        <Header />

        <div style={{ marginBottom: '5px' }}></div>

        {error && (
          <div
            className="p-3 rounded-lg text-[12px]"
            style={{
              border: '1px solid rgba(239,68,68,0.35)',
              background: 'rgba(239,68,68,0.10)',
              color: 'rgba(0,0,0,0.587)',
              display: error ? 'block' : 'none',
            }}
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[18px]">
          <InputCard onGenerate={handleGenerate} isLoading={isLoading} />
          <ResultCard
            coverLetter={result?.cover_letter || ''}
            keyMatches={result?.key_matches || []}
            styleNotes={result?.style_notes || ''}
            model={result?.model || ''}
            duration={result?.duration || 0}
            generationNumber={result?.used || 0}
            limit={result?.limit || 0}
            onCopy={handleCopy}
          />
        </div>

        <DonationCard />
        <div style={{ marginBottom: '5px' }}></div>
      </div>
    </main>
  )
}
