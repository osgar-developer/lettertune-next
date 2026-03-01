'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PrivacyPage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark'
    setIsDark(dark)

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      setIsDark(dark)
    })
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <main className="min-h-screen p-6 flex justify-center items-start" style={{ paddingBottom: '100px' }}>
        <div className="w-full max-w-[800px] flex flex-col gap-[18px]">
          {/* Header */}
          <div 
            className="card card-hover header-bg" 
            style={{ 
              width: '100%', 
              padding: '12px',
              border: '1px solid rgba(46, 125, 50, 0.15)',
              borderRadius: '14px 14px 0 0',
              backgroundColor: isDark ? '#000000' : 'white'
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Image
                src={isDark ? '/images/logo_dark.png' : '/images/logo.png'}
                alt="LetterTune - Personalized Cover Letters"
                width={200}
                height={60}
                style={{ width: '40%', height: 'auto', cursor: 'pointer' }}
                unoptimized
              />
            </Link>
          </div>

          {/* Content Card */}
          <div 
            className="card card-hover"
            style={{ 
              padding: '32px',
              backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.85)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(31, 42, 26, 0.12)',
              borderRadius: '0 0 14px 14px',
              boxShadow: isDark ? '0 10px 28px rgba(0, 0, 0, 0.4)' : '0 10px 28px rgba(31, 42, 26, 0.12)',
            }}
          >
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              marginBottom: '24px',
              color: isDark ? '#ffffff' : '#1f2a1a'
            }}>
              Privacy Policy
            </h1>

            <p style={{ 
              fontSize: '14px', 
              color: isDark ? '#a0a0a0' : '#777e72',
              marginBottom: '24px'
            }}>
              Last updated: March 2026
            </p>

            <div style={{ 
              color: isDark ? '#e7e9ea' : '#1f2a1a',
              fontSize: '15px',
              lineHeight: 1.7
            }}>
              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  1. Introduction
                </h2>
                <p>
                  LetterTune ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cover letter generation service.
                </p>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  2. Lawful Basis for Processing
                </h2>
                <p>
                  We process your personal data based on your <strong>consent</strong> — you voluntarily provide the information to use our service.
                </p>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  3. Data We Collect
                </h2>
                <p>We collect only the information you voluntarily provide:</p>
                <ul style={{ 
                  marginTop: '8px', 
                  paddingLeft: '20px',
                  color: isDark ? '#a0a0a0' : '#777e72'
                }}>
                  <li>Company and job position details</li>
                  <li>Your resume or background information</li>
                  <li>Previous cover letter (for style reference)</li>
                  <li>Optional additional instructions</li>
                </ul>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  4. How We Use Your Data
                </h2>
                <p>Your input data is used solely to:</p>
                <ul style={{ 
                  marginTop: '8px', 
                  paddingLeft: '20px',
                  color: isDark ? '#a0a0a0' : '#777e72'
                }}>
                  <li>Generate your personalized cover letter</li>
                  <li>Process it through AI models you select</li>
                </ul>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  5. Data Storage & Retention
                </h2>
                <ul style={{ 
                  marginTop: '8px', 
                  paddingLeft: '20px',
                  color: isDark ? '#a0a0a0' : '#777e72'
                }}>
                  <li><strong>No permanent storage:</strong> We do not store your personal data on our servers.</li>
                  <li><strong>Temporary processing:</strong> Your data is processed in memory only for the duration of generating your cover letter.</li>
                  <li><strong>Local storage:</strong> To improve your experience, the following are saved locally in your browser (localStorage) — this data stays on your device and is never sent to our servers:
                    <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
                      <li>Theme preference (light/dark mode)</li>
                      <li>Your applicant background and previous cover letter (if you choose to save them)</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  6. Your Rights Under GDPR
                </h2>
                <p>You have the right to:</p>
                <ul style={{ 
                  marginTop: '8px', 
                  paddingLeft: '20px',
                  color: isDark ? '#a0a0a0' : '#777e72'
                }}>
                  <li><strong>Access</strong> — Request a copy of any personal data we hold about you (note: we don&apos;t store any on our servers)</li>
                  <li><strong>Erasure</strong> — Request deletion of your data</li>
                  <li><strong>Portability</strong> — Request your data in a machine-readable format</li>
                  <li><strong>Withdraw consent</strong> — At any time, by clearing your browser&apos;s localStorage</li>
                </ul>
                <p style={{ marginTop: '12px' }}>
                  To exercise these rights, contact us at <a href="mailto:info@lettertune.com" style={{ color: isDark ? '#4ade80' : '#318731' }}>info@lettertune.com</a>
                </p>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  7. Cookies & Tracking
                </h2>
                <p>We do not use:</p>
                <ul style={{ 
                  marginTop: '8px', 
                  paddingLeft: '20px',
                  color: isDark ? '#a0a0a0' : '#777e72'
                }}>
                  <li>Cookies for tracking or analytics</li>
                  <li>Third-party tracking scripts</li>
                  <li>Advertising cookies</li>
                </ul>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  8. Third-Party Services
                </h2>
                <p>
                  We use AI providers (IBM watsonx, OpenAI, DeepSeek) to generate cover letters. When you use the service, your input data is sent to your chosen AI provider for processing. We encourage you to review their respective privacy policies.
                </p>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  9. Children&apos;s Privacy
                </h2>
                <p>
                  Our service is not intended for children under 13. We do not knowingly collect personal information from children.
                </p>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  10. Security
                </h2>
                <p>
                  We implement reasonable security measures to protect your data during transmission. However, no method of electronic transmission or storage is 100% secure — we cannot guarantee absolute security.
                </p>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  11. Supervisory Authority
                </h2>
                <p>
                  You have the right to file a complaint with your local Data Protection Authority (DPA) if you believe we have mishandled your data.
                </p>
              </section>

              <section style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  12. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1f2a1a'
                }}>
                  13. Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact:
                </p>
                <p style={{ marginTop: '8px' }}>
                  Email: <a href="mailto:info@lettertune.com" style={{ color: isDark ? '#4ade80' : '#318731' }}>info@lettertune.com</a>
                </p>
              </section>
            </div>

            {/* Back link */}
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(31,42,26,0.12)' }}>
              <Link 
                href="/" 
                style={{ 
                  color: isDark ? '#4ade80' : '#318731',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                ← Back to LetterTune
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
