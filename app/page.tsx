'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import InputCard from '@/components/InputCard'
import ResultCard from '@/components/ResultCard'
import DonationCard from '@/components/DonationCard'
import ModelSelector from '@/components/ModelSelector'
import TextInput from '@/components/TextInput'
import AdditionalInstructionsInput from '@/components/AdditionalInstructionsInput'
import ActionButtons from '@/components/ActionButtons'
import Loader from '@/components/Loader'
import ErrorBox from '@/components/ErrorBox'
import CoverLetterDisplay from '@/components/CoverLetterDisplay'
import KeyMatches from '@/components/KeyMatches'
import StyleNotes from '@/components/StyleNotes'
import GenerationInfo from '@/components/GenerationInfo'
import CopyButton from '@/components/CopyButton'

interface GenerateResponse {
  cover_letter: string
  key_matches: string[]
  style_notes: string
  model: string
  duration: number
  used: number
  limit: number
}

// Example data for Fill Example button
const EXAMPLE_DATA = {
  company_job_info: `Company: Stadtbank Mitte eG
Position: Junior Banking Operations Associate
Mission: Provide reliable financial services and support the local community with responsible banking solutions.

Responsibilities:
- Support daily banking operations
- Assist with account management and customer inquiries
- Process transactions and documentation
- Collaborate with customer advisors and compliance teams

Requirements:
- Basic understanding of banking or finance
- Attention to detail
- Customer-oriented mindset
- Reliability and discretion
- Interest in local and community banking
Location: Berlin (on-site / hybrid)`,

  applicant_background: `B.A. Business Administration (2019–2022)
Focus: Finance and Accounting

Skills:
- MS Excel and Office
- Basic accounting
- Data entry and documentation
- Customer communication
- Attention to detail

Internship (Volksbank Nord eG):
- Assisted with customer account administration
- Supported transaction processing and internal reporting
- Maintained accurate financial records
- Helped improve internal workflows

Projects:
- Budget planning and expense analysis project
- Case study on retail banking operations

Languages:
German native, English fluent`,

  previous_cover_letter: `Dear Hiring Team,

I am writing to apply for a position at your bank, as I am highly motivated
to start my career in the financial sector and contribute to reliable
and customer-focused banking services.

During my studies and internship, I have developed a strong interest in
banking. I value accuracy operations and financial processes, structured work,
and clear communication, especially when dealing with sensitive information.

I would welcome the opportunity to further discuss how my skills and motivation
could be a good fit for your team.

Kind regards,
Mark Hamilton`,

  additional_instructions: 'Max 250 words. Reference the company\'s mission.'
}

export default function Home() {
  const [model, setModel] = useState('llama')
  const [companyJobInfo, setCompanyJobInfo] = useState('')
  const [applicantBackground, setApplicantBackground] = useState('')
  const [previousCoverLetter, setPreviousCoverLetter] = useState('')
  const [additionalInstructions, setAdditionalInstructions] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GenerateResponse | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    setError('')
    setIsLoading(true)

    const payload = {
      model,
      company_job_info: companyJobInfo,
      applicant_background: applicantBackground,
      previous_cover_letter: previousCoverLetter,
      additional_instructions: additionalInstructions
    }

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        const missing = data.missing_fields ? ` Missing: ${data.missing_fields.join(', ')}` : ''
        throw new Error((data.error || 'Request failed') + missing)
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFillExample = () => {
    setCompanyJobInfo(EXAMPLE_DATA.company_job_info)
    setApplicantBackground(EXAMPLE_DATA.applicant_background)
    setPreviousCoverLetter(EXAMPLE_DATA.previous_cover_letter)
    setAdditionalInstructions(EXAMPLE_DATA.additional_instructions)
    setError('')
  }

  const handleClear = () => {
    setCompanyJobInfo('')
    setApplicantBackground('')
    setPreviousCoverLetter('')
    setAdditionalInstructions('')
    setResult(null)
    setError('')
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
    <main className="container">
      <Header />

      <div className="grid">
        <InputCard>
          <div className="row two">
            <ModelSelector value={model} onChange={setModel} />
            <AdditionalInstructionsInput 
              value={additionalInstructions} 
              onChange={setAdditionalInstructions} 
            />
          </div>

          <TextInput
            id="company_job_info"
            label="Company + job offer info"
            placeholder="Paste the job posting and any notes about the company..."
            value={companyJobInfo}
            onChange={setCompanyJobInfo}
          />

          <TextInput
            id="applicant_background"
            label="Applicant background / resume"
            placeholder="Paste your resume, skills, experience, achievements, tools..."
            value={applicantBackground}
            onChange={setApplicantBackground}
          />

          <TextInput
            id="previous_cover_letter"
            label="Previous cover letter (style reference)"
            placeholder="Paste a previous cover letter you wrote (for style)"
            value={previousCoverLetter}
            onChange={setPreviousCoverLetter}
          />

          <ActionButtons
            onGenerate={handleGenerate}
            onFillExample={handleFillExample}
            onClear={handleClear}
            disabled={isLoading}
          />

          <Loader visible={isLoading} />
          
          <ErrorBox message={error} />
        </InputCard>

        <ResultCard>
          <div className="meta-box">
            <p className="meta-title">Cover letter</p>
            <CoverLetterDisplay content={result?.cover_letter || ''} />
            <div className="actions" style={{ marginTop: '12px' }}>
              <CopyButton onClick={handleCopy} disabled={!result?.cover_letter} />
            </div>
          </div>

          <div className="meta-box">
            <p className="meta-title">Key matches</p>
            <KeyMatches items={result?.key_matches || []} />
          </div>

          <div className="meta-box">
            <p className="meta-title">Style notes</p>
            <StyleNotes content={result?.style_notes || ''} />
          </div>

          <GenerationInfo
            model={result?.model || ''}
            duration={result?.duration ? `${result.duration}s` : ''}
            used={result?.used ?? ''}
            limit={result?.limit ?? ''}
          />
        </ResultCard>
      </div>

      <DonationCard />
    </main>
  )
}
