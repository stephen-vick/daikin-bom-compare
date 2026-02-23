export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <svg className="header-logo" viewBox="0 0 160 32">
          <polygon points="2,30 14,2 26,30" fill="#231F20" />
          <polygon points="6,30 14,10 22,30" fill="#44C8F5" opacity="0.85" />
          <text x="34" y="24" fill="#fff" fontFamily="'Barlow Semi Condensed', sans-serif" fontWeight="700" fontSize="20" letterSpacing="2" fontStyle="italic">DAIKIN</text>
        </svg>
        <div className="header-divider" />
        <span className="header-title">BOM Compare Portal</span>
      </div>
      <div className="header-right">Profisee MDM Integration</div>
    </header>
  )
}
