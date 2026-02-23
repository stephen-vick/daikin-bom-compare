interface FooterProps {
  compared: boolean
  nodeCountA: number
  nodeCountB: number
  diffCount: number
  productModel: string
}

export function Footer({ compared, nodeCountA, nodeCountB, diffCount, productModel }: FooterProps) {
  if (!compared) {
    return (
      <footer className="footer">
        <span>Ready</span>
        <span className="spacer" />
        <span>Daikin Comfort Technologies &times; Profisee MDM</span>
      </footer>
    )
  }

  return (
    <footer className="footer">
      <span className="accent">{diffCount} differences</span>
      <span>across {nodeCountA} / {nodeCountB} nodes</span>
      <span className="spacer" />
      <span>Product: {productModel}</span>
      <span>&bull;</span>
      <span>Compared just now</span>
    </footer>
  )
}
