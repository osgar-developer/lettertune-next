'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  delay?: number
  float?: boolean
  className?: string
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  float = false,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial delay if specified
    if (delay > 0) {
      element.style.transitionDelay = `${delay}s`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('visible')
            // Optional: stop observing once visible
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  const directionClass = `scroll-reveal-${direction}`
  const floatClass = float ? 'scroll-float' : ''

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${directionClass} ${floatClass} ${className}`}
    >
      {children}
    </div>
  )
}
