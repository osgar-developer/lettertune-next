import { NextRequest, NextResponse } from 'next/server'
import { generateCoverLetter } from '@/lib/ai'
import { GeneratePayload, GenerateResponse } from '@/lib/types'

export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse | { error: string; missing_fields?: string[] }>> {
  try {
    const data: GeneratePayload = await request.json()

    const { model, company_job_info, applicant_background, previous_cover_letter, additional_instructions } = data

    // Validation
    const missing: string[] = []
    if (!model) missing.push('model')
    if (!company_job_info) missing.push('Company + job offer info')
    if (!applicant_background) missing.push('Applicant background / resume')
    if (!previous_cover_letter) missing.push('Previous cover letter (style reference)')

    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', missing_fields: missing },
        { status: 400 }
      )
    }

    // Get API keys from environment
    const env = {
      WATSONX_API_KEY: process.env.WATSONX_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    }

    // Check if at least one API key is configured
    if (!env.WATSONX_API_KEY && !env.OPENAI_API_KEY && !env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'No AI API keys configured. Please set WATSONX_API_KEY, OPENAI_API_KEY, or DEEPSEEK_API_KEY in environment variables.' },
        { status: 500 }
      )
    }

    // Time the generation
    const startTime = Date.now()

    // Call the AI
    const result = await generateCoverLetter(
      {
        model,
        company_job_info,
        applicant_background,
        previous_cover_letter,
        additional_instructions,
      },
      env
    )

    const duration = (Date.now() - startTime) / 1000

    const response: GenerateResponse = {
      cover_letter: result.cover_letter,
      key_matches: result.key_matches,
      style_notes: result.style_notes,
      suggested_subject: result.suggested_subject,
      model,
      duration,
      used: 1, // TODO: Implement actual usage tracking
      limit: 100, // TODO: Implement actual limit
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating cover letter:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
