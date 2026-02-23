import { useMemo, useState } from 'react'
import type { DiffEntry, DiffNode, DiffStatus } from '../types/bom'
import { buildDiffEntries, countNodeChanges } from '../utils/treeDiff'

interface Props {
  diff: DiffNode
}

type Filter = 'all' | 'ADDED' | 'REMOVED' | 'MODIFIED'

export function DeltaSummaryView({ diff }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const entries = useMemo(() => buildDiffEntries(diff), [diff])
  const counts = useMemo(() => countNodeChanges(diff), [diff])
  const total = counts.added + counts.removed + counts.changed

  const filtered = filter === 'all'
    ? entries
    : entries.filter((e) => e.status === filter)

  const badgeClass = (s: DiffStatus) =>
    s === 'ADDED' ? 'add' : s === 'REMOVED' ? 'del' : 'chg'

  const badgeLabel = (s: DiffStatus) =>
    s === 'ADDED' ? 'ADD' : s === 'REMOVED' ? 'DEL' : 'CHG'

  return (
    <div className="delta-view">
      <div className="delta-filters">
        <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All <span className="count">{total}</span>
        </button>
        <button className={`filter-pill ${filter === 'ADDED' ? 'active' : ''}`} onClick={() => setFilter('ADDED')}>
          Added <span className="count">{counts.added}</span>
        </button>
        <button className={`filter-pill ${filter === 'REMOVED' ? 'active' : ''}`} onClick={() => setFilter('REMOVED')}>
          Removed <span className="count">{counts.removed}</span>
        </button>
        <button className={`filter-pill ${filter === 'MODIFIED' ? 'active' : ''}`} onClick={() => setFilter('MODIFIED')}>
          Changed <span className="count">{counts.changed}</span>
        </button>
      </div>

      <div className="delta-scroll">
        <table className="delta-table">
          <thead>
            <tr>
              <th style={{ width: 60 }}>Type</th>
              <th>Path</th>
              <th style={{ width: 120 }}>Attribute</th>
              <th style={{ width: 180 }}>BOM A</th>
              <th style={{ width: 180 }}>BOM B</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <tr key={i}>
                <td><span className={`delta-type-badge ${badgeClass(entry.status)}`}>{badgeLabel(entry.status)}</span></td>
                <td className="delta-path">{entry.path}</td>
                <td className="delta-attr">{entry.attribute}</td>
                <td className="delta-val-a">{entry.bomAValue}</td>
                <td className="delta-val-b">{entry.bomBValue}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="delta-empty">No differences of this type found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
