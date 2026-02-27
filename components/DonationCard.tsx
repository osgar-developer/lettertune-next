'use client'

export default function DonationCard() {
  return (
    <div className="card donate-card">
      <div className="card-inner">
        <p className="section-title"><strong>Support LetterTune 💚</strong><span className="hint"></span></p>

        <p className="donate-text">
          If LetterTune helped you, consider supporting the project.
          Your donation helps keep the service running and improving.
        </p>

        <div className="donation-methods">
          <div className="donation-item">
            <strong>PayPal</strong>
            <a className="paypal-link" href="https://www.paypal.me/WebinnoAB" target="_blank" rel="noopener">
              <svg width="100" height="28" viewBox="0 0 72 20" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal">
                <path fill="#003087" d="M17.7 2.2C16.9 1.3 15.6 1 13.8 1H7.2c-.5 0-.9.4-1 .9L4 18.4c-.1.4.3.8.7.8h3.9l.9-5.5v.2c.1-.5.5-.9 1-.9h1.8c3.5 0 6.3-1.4 7.1-5.6.3-1.8.1-3.2-.8-4.2z"/>
                <path fill="#009cde" d="M19 7c-.8 4.2-3.6 5.6-7.1 5.6h-1.8c-.5 0-.9.4-1 .9l-1 6c-.1.4.3.8.7.8h3.2c.4 0 .8-.3.9-.7v-.1l.8-4.8v-.2c.1-.4.5-.7.9-.7h.6c3.1 0 5.5-1.3 6.2-4.9.3-1.5.1-2.8-.7-3.7-.2-.2-.4-.4-.7-.5z"/>
              </svg>
              <span className="mono" style={{ fontSize: '14px' }}>paypal.me/WebinnoAB</span>
            </a>
          </div>

          <div className="donation-item">
            <strong>Bitcoin (BTC)</strong>
            <span className="mono">bc1qaynsrckyfet9ujrqyf8wy4gwwqfjgcysjsmaff</span>
          </div>

          <div className="donation-item">
            <strong>Ethereum (ETH)</strong>
            <span className="mono">0xfE1c57dd2955bf5e3Eeb069316d7A7981e5A57db</span>
          </div>

          <div className="donation-item">
            <strong>Solana (SOL)</strong>
            <span className="mono">E6N57EkjXjvbRyH1Vn3uXXZwZmrn5Eg3WAw8LHsJtoj3</span>
          </div>
        </div>

        <p className="donate-footer">
          Suggestions and ideas may be emailed to
          <a href="mailto:info@lettertune.com"> info@lettertune.com</a>
        </p>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p className="small">Copyright &copy; L.J Bergman</p>
        </div>
      </div>
    </div>
  )
}
