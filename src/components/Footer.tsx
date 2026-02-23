interface FooterProps {
  compared: boolean
  totalNodes: number
  diffCount: number
  added: number
  removed: number
  changed: number
  productModel: string
}

export function Footer({ compared, totalNodes, diffCount, added, removed, changed, productModel }: FooterProps) {
  if (!compared) {
    return (
      <footer className="footer">
        <span>Ready</span>
        <span>Profisee MDM Custom Portal &mdash; v0.1.0</span>
      </footer>
    )
  }

  return (
    <footer className="footer">
      <div className="footer-diff-summary">
        <span>&bull; {diffCount} differences across {totalNodes} total nodes</span>
        <span className="added">+{added}</span>
        <span className="removed">-{removed}</span>
        <span className="changed">~{changed}</span>
      </div>
      <span>Product: {productModel}</span>
    </footer>
  )
}
