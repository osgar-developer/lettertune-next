import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LetterTune — Personalized Cover Letters',
  description: 'Create personalized cover letters using AI that mimics your own writing style. LetterTune combines job offers, resumes, and past letters to generate realistic applications.',
  metadataBase: new URL('https://lettertune.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
