'use client'

interface KeyMatchesProps {
  items: string[]
}

export default function KeyMatches({ items }: KeyMatchesProps) {
  if (!items || items.length === 0) {
    return <span className="text-[12px] text-[#777e72]">—</span>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={index}
          className="border border-[rgba(31,42,26,0.12)] bg-[rgba(255,255,255,0.04)] rounded-lg px-[10px] py-[7px] text-[11px] text-[rgba(0,0,0,0.82)]"
        >
          {item}
        </span>
      ))}
    </div>
  )
}
