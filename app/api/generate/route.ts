import { NextRequest, NextResponse } from 'next/server'

// Mock response for demo purposes
// In production, this would call the actual AI models (Watsonx, OpenAI, DeepSeek)
// Similar to the Flask model's generate functions

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      model,
      company_job_info,
      applicant_background,
      previous_cover_letter,
      additional_instructions,
    } = data

    // Validation
    const missing = []
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

    // For now, return a mock response
    // TODO: Integrate actual AI models (Watsonx, OpenAI, DeepSeek)
    // The logic from model.py needs to be ported to TypeScript
    
    const mockCoverLetter = `Dear Hiring Team,

Thank you for considering my application for the position. I am excited about the opportunity to contribute to your team and believe my background aligns well with your requirements.

Based on my experience in business administration and my internship at Volksbank Nord eG, I have developed strong skills in customer communication, data entry, and financial documentation. I am particularly drawn to your bank's mission of providing reliable financial services to the local community.

I would welcome the opportunity to discuss how my skills and motivation can contribute to your team.

Kind regards,
[Your Name]`

    const mockKeyMatches = [
      'Business Administration degree',
      'Banking operations experience',
      'Customer communication skills',
      'Financial documentation',
      'Attention to detail',
    ]

    const mockStyleNotes = 'Professional yet warm tone, clear structure with introduction-body-conclusion, focuses on specific achievements and alignment with company values.'

    return NextResponse.json({
      cover_letter: mockCoverLetter,
      key_matches: mockKeyMatches,
      style_notes: mockStyleNotes,
      suggested_subject: `Application for Banking Operations Position`,
      model: model,
      duration: 2.5,
      used: 1,
      limit: 100,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
