import { useState, useMemo, useCallback } from 'react'
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

const TYPE_COLORS: Record<string, string> = {
  EBOM: '#2563EB',
  MBOM: '#7C3AED',
  SERVICE: '#16A34A',
}

export function BomTreePanel({ version, side, diff, showDiffsOnly, searchQuery }: Props) {
  const allIds = useMemo(() => new Set(collectAllIds(version.root)), [version.root])
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(allIds))
  const [localSearch, setLocalSearch] = useState('')

  const statusMap = useMemo(() => (diff ? buildStatusMap(diff) : new Map<string, DiffStatus>()), [diff])

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const expandAll = () => setExpanded(new Set(allIds))
  const collapseAll = () => setExpanded(new Set())

  const effectiveSearch = localSearch || searchQuery

  const matchesSearch = (node: BomNode): boolean => {
    if (!effectiveSearch) return true
    const q = effectiveSearch.toLowerCase()
    return node.partNumber.toLowerCase().includes(q) || node.description.toLowerCase().includes(q)
  }

  const shouldShow = (node: BomNode): boolean => {
    if (!showDiffsOnly && !effectiveSearch) return true
    const status = statusMap.get(node.id)
    const isChanged = status && status !== 'UNCHANGED'
    const hasChangedChild = diff ? hasChangedDescendant(node.id, diff) : false
    const passes = isChanged || hasChangedChild
    if (effectiveSearch) {
      return matchesSearch(node) || node.children.some(shouldShow)
    }
    return passes
  }

  const badgeColor = TYPE_COLORS[version.type] ?? '#666'
  const bomTypeLabel = version.type === 'EBOM' ? 'E-BOM'
    : version.type === 'MBOM' ? 'M-BOM'
    : 'Service'

  const renderNode = (node: BomNode, depth: number): React.ReactNode => {
    if (!shouldShow(node)) return null

    const hasChildren = node.children.length > 0
    const isOpen = expanded.has(node.id)
    const status = statusMap.get(node.id)
    const isAssembly = hasChildren
    const statusClass = status && status !== 'UNCHANGED' ? `status-${status.toLowerCase()}` : ''
    const assemblyClass = isAssembly ? 'is-assembly' : ''

    const isGhost = (side === 'A' && status === 'ADDED') || (side === 'B' && status === 'REMOVED')

    return (
      <div key={node.id}>
        <div
          className={`tree-row ${statusClass} ${assemblyClass} ${isGhost ? 'ghost' : ''}`}
          style={{ paddingLeft: `${depth * 18 + 4}px` }}
          onClick={() => { if (hasChildren) toggle(node.id) }}
        >
          <span style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {hasChildren ? (
              <button className={`tree-toggle ${!isOpen ? 'collapsed' : ''}`} onClick={(e) => { e.stopPropagation(); toggle(node.id) }}>
                {isOpen ? '\u25be' : '\u25b8'}
              </button>
            ) : (
              <span style={{ width: 14 }} />
            )}
          </span>
          <span className={`tree-dot ${isAssembly ? 'assembly' : 'component'}`} />
          <span className="tree-part">{node.partNumber}</span>
          <span className="tree-desc">{node.description}</span>
          <span className="qty-display">{node.quantity} {node.uom}</span>
          {!isAssembly && status === 'MODIFIED' && <span className="diff-badge chg">CHG</span>}
          {!isAssembly && status === 'REMOVED' && <span className="diff-badge del">DEL</span>}
          {!isAssembly && status === 'ADDED' && <span className="diff-badge add">ADD</span>}
        </div>
        {isOpen && hasChildren && node.children.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div className="bom-panel">
      <div className="panel-head">
        <span className="bom-type-badge" style={{ background: badgeColor }}>{bomTypeLabel}</span>
        <span className="panel-title">{version.label}</span>
        <span className="node-count">({version.nodeCount})</span>
        <span className="panel-head-spacer" />
        <div className="panel-search">
          <span className="panel-search-icon">&#128269;</span>
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="panel-icons">
          <button className="panel-icon-btn" onClick={expandAll} title="Expand All">+</button>
          <button className="panel-icon-btn" onClick={collapseAll} title="Collapse All">&minus;</button>
        </div>
      </div>
      <div className="tree-container">
        {renderNode(version.root, 0)}
      </div>
    </div>
  )
}
