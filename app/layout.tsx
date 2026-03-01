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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <button
          id="theme-toggle"
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 9999,
            padding: '10px 14px',
            borderRadius: '8px',
            border: 'var(--border)',
            background: 'var(--card)',
            color: 'var(--text)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: 'var(--shadow)',
            transition: 'all 0.2s ease',
          }}
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
        >
          🌙 Dark
        </button>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const btn = document.getElementById('theme-toggle');
                const html = document.documentElement;
                const isDark = html.getAttribute('data-theme') === 'dark';
                
                btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
                
                btn.addEventListener('click', function() {
                  const isDark = html.getAttribute('data-theme') === 'dark';
                  if (isDark) {
                    html.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    btn.textContent = '🌙 Dark';
                  } else {
                    html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    btn.textContent = '☀️ Light';
                  }
                });
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
}
