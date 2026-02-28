import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 72,
    fontFamily: 'Helvetica',
    fontSize: 14,
    lineHeight: 1.5,
  },
  text: {
    fontSize: 14,
    lineHeight: 1.5,
    marginBottom: 0,
  },
})

// PDF Document component
const CoverLetterDocument = ({ content }: { content: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.text}>{content}</Text>
    </Page>
  </Document>
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 })
    }

    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(CoverLetterDocument({ content }))

    // Convert to Uint8Array for NextResponse compatibility
    const uint8Array = new Uint8Array(pdfBuffer)

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="cover-letter.pdf"',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
