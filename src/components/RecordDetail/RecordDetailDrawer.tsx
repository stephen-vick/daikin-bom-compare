import type { BomNode } from '../../types/bom'

interface RecordDetailDrawerProps {
  node?: BomNode
  open: boolean
  onClose: () => void
}

export function RecordDetailDrawer({ node, open, onClose }: RecordDetailDrawerProps) {
  if (!open || !node) {
    return null
  }

  return (
    <aside className="detail-drawer">
      <div className="detail-header">
        <h3>Record Detail</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <dl>
        <dt>Part Number</dt>
        <dd>{node.partNumber}</dd>
        <dt>Description</dt>
        <dd>{node.description}</dd>
        <dt>Status</dt>
        <dd>{node.status}</dd>
        <dt>Source System</dt>
        <dd>{node.sourceSystem}</dd>
        <dt>Effective Date</dt>
        <dd>{node.effectiveDate}</dd>
      </dl>
      <button
        className="deep-link"
        onClick={() => {
          window.open(`https://example.profisee.com/records/${encodeURIComponent(node.id)}`, '_blank')
        }}
      >
        Open in Profisee
      </button>
    </aside>
  )
}
