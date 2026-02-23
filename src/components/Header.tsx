export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <svg className="header-logo" viewBox="0 0 32 32" fill="none">
          <path d="M16 2C8 2 4 10 4 16c0 8 6 14 12 14 2 0 4-1.5 4-4 0-1.5-.8-2.5-1.5-3.5-.7-1-1.5-2-1.5-3.5 0-2.5 2-4 4-4h4c4.5 0 8-3.5 8-8C32 4 25 2 16 2z" fill="#e8522a"/>
        </svg>
        <span className="header-brand">DAIKIN</span>
        <span className="header-title">BOM Compare Portal</span>
      </div>
      <div className="header-right">Profisee MDM Integration</div>
    </header>
  )
}
