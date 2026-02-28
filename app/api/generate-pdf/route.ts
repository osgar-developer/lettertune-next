import { NextRequest, NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 })
    }

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 72,
        bottom: 72,
        left: 72,
        right: 72,
      },
      bufferPages: true,
    })

    // Collect PDF as buffer
    const chunks: Uint8Array[] = []
    doc.on('data', (chunk: Uint8Array) => chunks.push(chunk))

    // Configure font and layout
    doc.font('Helvetica') // Arial equivalent in PDFKit
    doc.fontSize(14)

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right
    const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom
    const lineHeight = 14 * 1.5 // 14pt font with 1.5 line spacing
    const linesPerPage = Math.floor(pageHeight / lineHeight)
    const charsPerLine = Math.floor(pageWidth / 7) // Approximate chars per line for 14pt font

    // Wrap text to fit page width
    const wrapText = (text: string): string[] => {
      const words = text.split(' ')
      const lines: string[] = []
      let currentLine = ''

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        if (testLine.length <= charsPerLine) {
          currentLine = testLine
        } else {
          if (currentLine) lines.push(currentLine)
          currentLine = word
        }
      }
      if (currentLine) lines.push(currentLine)
      return lines
    }

    const wrappedLines = wrapText(content)
    let currentPage = 1
    let linesOnCurrentPage = 0

    // Add text to PDF with page breaks
    for (const line of wrappedLines) {
      doc.text(line, {
        lineBreak: true,
        continued: false,
      })
      linesOnCurrentPage++

      if (linesOnCurrentPage >= linesPerPage && wrappedLines.indexOf(line) < wrappedLines.length - 1) {
        doc.addPage()
        currentPage++
        linesOnCurrentPage = 0
      }
    }

    doc.end()

    // Wait for PDF to be complete
    await new Promise<void>((resolve) => {
      doc.on('end', resolve)
    })

    const pdfBuffer = Buffer.concat(chunks)

    return new NextResponse(pdfBuffer, {
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
