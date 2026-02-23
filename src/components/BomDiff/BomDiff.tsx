import type { DiffNode } from '../../types/bom'

interface BomDiffProps {
  summary: DiffNode[]
  leftLabel: string
  rightLabel: string
}

export function BomDiff({ summary, leftLabel, rightLabel }: BomDiffProps) {
  return (
    <aside className="diff-panel">
      <h3>
        Diff Summary: {leftLabel} vs {rightLabel}
      </h3>
      <p>{summary.length} changed nodes</p>
      <div className="summary-list">
        {summary.slice(0, 200).map((node) => (
          <div key={node.nodeId} className={`summary-row status-${node.status.toLowerCase()}`}>
            <strong>{node.left?.partNumber ?? node.right?.partNumber ?? node.nodeId}</strong>
            <span>{node.status}</span>
            {node.changedFields && node.changedFields.length > 0 ? (
              <small>
                {node.changedFields.map((field) => `${field.field}: ${field.oldValue} -> ${field.newValue}`).join(', ')}
              </small>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  )
}
