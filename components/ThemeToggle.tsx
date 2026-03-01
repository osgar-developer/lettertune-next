'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const dark = html.getAttribute('data-theme') === 'dark'
    setIsDark(dark)
  }, [])

  const toggle = () => {
    const html = document.documentElement
    const currentlyDark = html.getAttribute('data-theme') === 'dark'
    
    if (currentlyDark) {
      html.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      html.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return (
    <button
      onClick={toggle}
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
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
