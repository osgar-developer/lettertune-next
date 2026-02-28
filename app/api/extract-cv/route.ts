import { NextRequest, NextResponse } from 'next/server'
import mammoth from 'mammoth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileName = file.name.toLowerCase()
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    let extractedText = ''

    if (fileName.endsWith('.docx')) {
      // Extract text from DOCX
      const result = await mammoth.extractRawText({ buffer: fileBuffer })
      extractedText = result.value
    } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      // Plain text
      extractedText = fileBuffer.toString('utf-8')
    } else if (fileName.endsWith('.pdf')) {
      // For PDFs, return a message asking user to convert to DOCX
      return NextResponse.json({
        error: 'PDF parsing not available. Please convert your PDF to DOCX format and try again.',
        hint: 'You can use free online tools to convert PDF to DOCX.'
      }, { status: 400 })
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format. Please upload DOCX, TXT, or MD files.' },
        { status: 400 }
      )
    }

    // Clean up the extracted text
    const cleanedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    if (!cleanedText) {
      return NextResponse.json(
        { error: 'Could not extract text from file' },
        { status: 400 }
      )
    }

    return NextResponse.json({ text: cleanedText })
  } catch (error) {
    console.error('CV extraction error:', error)
    return NextResponse.json(
      { error: 'Failed to extract text from file' },
      { status: 500 }
    )
  }
}
