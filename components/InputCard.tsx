'use client'

import { useState } from 'react'
import ModelSelector from './ModelSelector'
import TextInput from './TextInput'
import ActionButtons from './ActionButtons'
import Loader from './Loader'

interface InputCardProps {
  onGenerate: (data: {
    model: string
    company_job_info: string
    applicant_background: string
    previous_cover_letter: string
    additional_instructions: string
  }) => void
  isLoading: boolean
}

export default function InputCard({ onGenerate, isLoading }: InputCardProps) {
  const [model, setModel] = useState('llama')
  const [companyJobInfo, setCompanyJobInfo] = useState('')
  const [applicantBackground, setApplicantBackground] = useState('')
  const [previousCoverLetter, setPreviousCoverLetter] = useState('')
  const [additionalInstructions, setAdditionalInstructions] = useState('')

  const handleGenerate = () => {
    onGenerate({
      model,
      company_job_info: companyJobInfo,
      applicant_background: applicantBackground,
      previous_cover_letter: previousCoverLetter,
      additional_instructions: additionalInstructions,
    })
  }

  const handleFillExample = () => {
    setCompanyJobInfo(`Company: Stadtbank Mitte eG
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
Location: Berlin (on-site / hybrid)`)

    setApplicantBackground(`B.A. Business Administration (2019–2022)
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
German native, English fluent`)

    setPreviousCoverLetter(`Dear Hiring Team,

I am writing to apply for a position at your bank, as I am highly motivated
to start my career in the financial sector and contribute to reliable
and customer-focused banking services.

During my studies and internship, I have developed a strong interest in
banking operations and financial processes. I value accuracy, structured work,
and clear communication, especially when dealing with sensitive information.

I would welcome the opportunity to further discuss how my skills and motivation
could be a good fit for your team.

Kind regards,
Mark Hamilton`)

    setAdditionalInstructions('Max 250 words. Reference the company\'s mission.')
  }

  const handleClear = () => {
    setCompanyJobInfo('')
    setApplicantBackground('')
    setPreviousCoverLetter('')
    setAdditionalInstructions('')
  }

  return (
    <div className="card card-hover bg-[rgba(255,255,255,0.85)] border border-[rgba(31,42,26,0.12)] rounded-b-xl rounded-t-none shadow-[0_10px_28px_rgba(31,42,26,0.12)] overflow-hidden">
      <div className="p-4 flex flex-col gap-4">
        <p className="text-[13px] text-[#777e72] m-0 flex items-center justify-between gap-2">
          <strong className="text-[#1f2a1a] text-[14px] font-bold">Inputs</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ModelSelector value={model} onChange={setModel} />
          <TextInput
            label="Additional instructions (optional)"
            placeholder='e.g. "Write in German, under 250 words"'
            value={additionalInstructions}
            onChange={setAdditionalInstructions}
            isTextArea={false}
          />
        </div>

        <TextInput
          label="Company + job offer info"
          placeholder="Paste the job posting and any notes about the company..."
          value={companyJobInfo}
          onChange={setCompanyJobInfo}
        />

        <div className="relative">
          <TextInput
            label="Applicant background / resume"
            placeholder="Paste your resume, skills, experience, achievements, tools..."
            value={applicantBackground}
            onChange={setApplicantBackground}
          />
          <label className="absolute top-0 right-0 text-[12px] text-[#5faf3b] cursor-pointer hover:underline font-medium">
            Upload CV
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt,.md"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return

                try {
                  let extractedText = ''
                  const fileName = file.name.toLowerCase()
                  console.log('Uploading file:', fileName)

                  if (fileName.endsWith('.pdf')) {
                    // Extract text from PDF client-side
                    alert('Processing PDF...')
                    try {
                      // Dynamic import to avoid SSR issues
                      const pdfjs = await import('pdfjs-dist')
                      
                      // Use a known working worker from unpkg
                      pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs'
                      alert('PDF.js worker configured')
                    
                      const arrayBuffer = await file.arrayBuffer()
                      alert('ArrayBuffer size: ' + arrayBuffer.byteLength)
                      
                      const uint8Array = new Uint8Array(arrayBuffer)
                      
                      const pdf = await pdfjs.getDocument({ data: uint8Array }).promise
                      alert('PDF loaded, pages: ' + pdf.numPages)
                      
                      let fullText = ''
                      for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i)
                        const textContent = await page.getTextContent()
                        const pageText = textContent.items
                          .map((item: any) => item.str)
                          .join(' ')
                        fullText += pageText + '\n\n'
                      }
                      extractedText = fullText.trim()
                      alert('PDF extracted, length: ' + extractedText.length)
                    } catch (pdfError) {
                      console.error('PDF extraction error:', pdfError)
                      alert('PDF extraction failed: ' + (pdfError as Error).message)
                      return
                    }
                  } else if (fileName.endsWith('.docx')) {
                    // Use server-side for DOCX
                    console.log('Processing DOCX via server...')
                    const formData = new FormData()
                    formData.append('file', file)
                    const response = await fetch('/api/extract-cv', {
                      method: 'POST',
                      body: formData,
                    })
                    if (!response.ok) {
                      const error = await response.json()
                      alert(error.error || 'Failed to extract text')
                      return
                    }
                    const data = await response.json()
                    extractedText = data.text
                  } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
                    // Plain text
                    extractedText = await file.text()
                  } else {
                    alert('Unsupported file format. Please use PDF, DOCX, TXT, or MD.')
                    return
                  }

                  if (!extractedText || extractedText.trim().length === 0) {
                    alert('Could not extract text from file')
                    return
                  }

                  setApplicantBackground((prev) => {
                    return prev ? `${prev}\n\n${extractedText}` : extractedText
                  })
                } catch (error) {
                  console.error('Upload error:', error)
                  alert('Failed to extract text. Try a different file format.')
                }
              }}
            />
          </label>
        </div>

        <TextInput
          label="Previous cover letter (style reference)"
          placeholder="Paste a previous cover letter you wrote (for style)"
          value={previousCoverLetter}
          onChange={setPreviousCoverLetter}
        />

        <ActionButtons
          onGenerate={handleGenerate}
          onFillExample={handleFillExample}
          onClear={handleClear}
          isLoading={isLoading}
        />

        <Loader isLoading={isLoading} />
      </div>
    </div>
  )
}
