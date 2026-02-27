'use client'

interface KeyMatchesProps {
  items: string[]
}

export default function KeyMatches({ items }: KeyMatchesProps) {
  return (
    <div className="chips" id="keyMatches" style={{ fontSize: '11px', padding: '5px', borderRadius: '8px' }}>
      {(!items || items.length === 0) ? (
        <span className="hint">—</span>
      ) : (
        items.map((item, index) => (
          <span key={index} className="chip">{item}</span>
        ))
      )}
    </div>
  )
}
