'use client'

export default function DonationCard() {
  return (
    <div className="card card-hover bg-[rgba(255,255,255,0.85)] border border-[rgba(31,42,26,0.12)] rounded-b-xl rounded-t-none shadow-[0_10px_28px_rgba(31,42,26,0.12)] overflow-hidden mt-6">
      <div className="p-4 flex flex-col gap-4 text-center">
        <p className="text-[13px] text-[#777e72] m-0 flex items-center justify-center gap-2">
          <strong className="text-[#1f2a1a] text-[14px] font-bold">Support LetterTune 💚</strong>
        </p>

        <p className="text-[14px] text-[#777e72] m-0" style={{ lineHeight: 1.5 }}>
          If LetterTune helped you, consider supporting the project.
          Your donation helps keep the service running and improving.
        </p>

        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-xl border border-[rgba(31,42,26,0.12)] text-left" style={{ background: 'rgba(143,163,30,0.08)' }}>
            <p className="text-[14px] font-bold m-0 mb-1" style={{ color: '#318731' }}>PayPal</p>
            <a
              href="https://www.paypal.me/WebinnoAB"
              target="_blank"
              rel="noopener"
              className="text-[14px] no-underline"
              style={{ color: '#0000ff' }}
            >
              paypal.me/WebinnoAB
            </a>
          </div>

          <div className="p-3 rounded-xl border border-[rgba(31,42,26,0.12)] text-left" style={{ background: 'rgba(143,163,30,0.08)' }}>
            <p className="text-[14px] font-bold m-0 mb-1" style={{ color: '#318731' }}>Bitcoin (BTC)</p>
            <p className="text-[10px] m-0 font-mono break-all">bc1qaynsrckyfet9ujrqyf8wy4gwwqfjgcysjsmaff</p>
          </div>

          <div className="p-3 rounded-xl border border-[rgba(31,42,26,0.12)] text-left" style={{ background: 'rgba(143,163,30,0.08)' }}>
            <p className="text-[14px] font-bold m-0 mb-1" style={{ color: '#318731' }}>Ethereum (ETH)</p>
            <p className="text-[10px] m-0 font-mono break-all">0xfE1c57dd2955bf5e3Eeb069316d7A7981e5A57db</p>
          </div>

          <div className="p-3 rounded-xl border border-[rgba(31,42,26,0.12)] text-left" style={{ background: 'rgba(143,163,30,0.08)' }}>
            <p className="text-[14px] font-bold m-0 mb-1" style={{ color: '#318731' }}>Solana (SOL)</p>
            <p className="text-[10px] m-0 font-mono break-all">E6N57EkjXjvbRyH1Vn3uXXZwZmrn5Eg3WAw8LHsJtoj3</p>
          </div>
        </div>

        <p className="text-[13px] text-[#777e72] m-0">
          Suggestions and ideas may be emailed to{' '}
          <a href="mailto:info@lettertune.com" style={{ color: '#318731', fontWeight: 600, textDecoration: 'none' }}>
            info@lettertune.com
          </a>
        </p>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p className="text-[12px] text-[#777e72] m-0">Copyright © L.J Bergman</p>
        </div>
      </div>
    </div>
  )
}
