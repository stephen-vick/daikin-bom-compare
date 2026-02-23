import { useState, useMemo } from 'react'
import type { BomNode, BomVersion, DiffNode, DiffStatus } from '../types/bom'
import { buildStatusMap, hasChangedDescendant } from '../utils/treeDiff'

interface Props {
  version: BomVersion
  side: 'A' | 'B'
  diff?: DiffNode
  showDiffsOnly: boolean
  searchQuery: string
}

function collectAllIds(node: BomNode): string[] {
  return [node.id, ...node.children.flatMap(collectAllIds)]
}

export function BomTreePanel({ version, side, diff, showDiffsOnly, searchQuery }: Props) {
  const allIds = useMemo(() => new Set(collectAllIds(version.root)), [version.root])
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(allIds))

  const statusMap = useMemo(() => (diff ? buildStatusMap(diff) : new Map<string, DiffStatus>()), [diff])

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAll = () => setExpanded(new Set(allIds))
  const collapseAll = () => setExpanded(new Set([version.root.id]))

  const matchesSearch = (node: BomNode): boolean => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return node.partNumber.toLowerCase().includes(q) || node.description.toLowerCase().includes(q)
  }

  const shouldShow = (node: BomNode): boolean => {
    if (!showDiffsOnly && !searchQuery) return true
    const status = statusMap.get(node.id)
    const isChanged = status && status !== 'UNCHANGED'
    const hasChangedChild = diff ? hasChangedDescendant(node.id, diff) : false
    const passes = isChanged || hasChangedChild
    if (searchQuery) {
      return matchesSearch(node) || node.children.some(shouldShow)
    }
    return passes
  }

  const getQtyDisplay = (node: BomNode): { text: string; isChanged: boolean } | null => {
    if (!diff) return null
    const status = statusMap.get(node.id)
    if (status !== 'MODIFIED') return null

    function findDiffNode(d: DiffNode, id: string): DiffNode | null {
      if (d.nodeId === id) return d
      for (const c of d.children) {
        const r = findDiffNode(c, id)
        if (r) return r
      }
      return null
    }

    const dn = findDiffNode(diff, node.id)
    if (!dn?.changedFields) return null
    const qtyField = dn.changedFields.find((f) => f.field === 'Quantity')
    if (!qtyField) return null

    const val = side === 'A' ? qtyField.oldValue : qtyField.newValue
    const sign = Number(qtyField.newValue) > Number(qtyField.oldValue) ? '+' : ''
    return { text: `${sign}${val}`, isChanged: true }
  }

  const renderNode = (node: BomNode, depth: number): React.ReactNode => {
    if (!shouldShow(node)) return null

    const hasChildren = node.children.length > 0
    const isOpen = expanded.has(node.id)
    const status = statusMap.get(node.id)
    const isAssembly = hasChildren
    const statusClass = status && status !== 'UNCHANGED' ? `status-${status.toLowerCase()}` : ''
    const assemblyClass = isAssembly ? 'is-assembly' : ''

    if (side === 'A' && status === 'ADDED') return null
    if (side === 'B' && status === 'REMOVED') return null

    const qty = getQtyDisplay(node)
    const badgeClass = status === 'REMOVED' ? 'del' : status === 'ADDED' ? 'add' : 'chg'

    return (
      <div key={node.id}>
        <div
          className={`tree-row ${statusClass} ${assemblyClass}`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          {hasChildren ? (
            <button className="tree-toggle" onClick={() => toggle(node.id)}>
              {isOpen ? '\u25be' : '\u25b8'}
            </button>
          ) : (
            <span className="tree-bullet">&bull;</span>
          )}
          <span className="tree-part">{node.partNumber}</span>
          <span className="tree-desc">{node.description}</span>
          <span className="tree-right">
            {qty && <span className={`qty-badge ${qty.isChanged ? 'changed' : ''}`}>{qty.text}</span>}
            {!isAssembly && status === 'MODIFIED' && <span className={`diff-badge ${badgeClass}`}>CHG</span>}
            {!isAssembly && status === 'REMOVED' && <span className="diff-badge del">DEL</span>}
            {!isAssembly && status === 'ADDED' && <span className="diff-badge add">ADD</span>}
          </span>
        </div>
        {hasChildren && isOpen && node.children.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div className="bom-panel">
      <div className="panel-head">
        <span>
          BOM {side}: {version.label}{' '}
          <span className="node-count">({version.nodeCount} nodes)</span>
        </span>
        <div className="panel-icons">
          <button className="panel-icon-btn" onClick={expandAll} title="Expand all">&#x2921;</button>
          <button className="panel-icon-btn" onClick={collapseAll} title="Collapse all">&#x2922;</button>
        </div>
      </div>
      <div className="tree-container">
        {renderNode(version.root, 0)}
      </div>
    </div>
  )
}
