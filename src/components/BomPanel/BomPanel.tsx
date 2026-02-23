import { useMemo, useState } from 'react'
import type { BomNode, BomVersion, DiffNode } from '../../types/bom'

interface BomPanelProps {
  version: BomVersion
  onSelectNode: (node: BomNode) => void
  diff?: DiffNode
}

function collectStatusMap(diff: DiffNode | undefined, map: Map<string, DiffNode['status']>) {
  if (!diff) {
    return
  }
  const key = diff.left?.id ?? diff.right?.id ?? diff.nodeId
  map.set(key, diff.status)
  for (const child of diff.children) {
    collectStatusMap(child, map)
  }
}

export function BomPanel({ version, onSelectNode, diff }: BomPanelProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([version.root.id]))

  const statusByNodeId = useMemo(() => {
    const map = new Map<string, DiffNode['status']>()
    collectStatusMap(diff, map)
    return map
  }, [diff])

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const renderNode = (node: BomNode, depth: number) => {
    const hasChildren = node.children.length > 0
    const isOpen = expanded.has(node.id)
    const status = statusByNodeId.get(node.id)

    return (
      <div key={node.id}>
        <div
          className={`tree-row depth-${depth} ${status ? `status-${status.toLowerCase()}` : ''}`}
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
          onClick={() => onSelectNode(node)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              onSelectNode(node)
            }
          }}
        >
          {hasChildren ? (
            <button
              className="tree-toggle"
              onClick={(event) => {
                event.stopPropagation()
                toggle(node.id)
              }}
            >
              {isOpen ? '▾' : '▸'}
            </button>
          ) : (
            <span className="tree-toggle-placeholder">•</span>
          )}
          <span className="tree-part">{node.partNumber}</span>
          <span className="tree-desc">{node.description}</span>
          <span className="tree-qty">Qty {node.quantity}</span>
        </div>
        {hasChildren && isOpen ? node.children.map((child) => renderNode(child, depth + 1)) : null}
      </div>
    )
  }

  return (
    <section className="panel">
      <header className="panel-header">
        <h3>{version.label}</h3>
        <div className="meta">
          <span>{version.sourceSystem}</span>
          <span>{new Date(version.lastUpdated).toLocaleString()}</span>
        </div>
      </header>
      <div className="tree-container">{renderNode(version.root, 0)}</div>
    </section>
  )
}
