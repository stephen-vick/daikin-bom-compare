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

      <table className="delta-table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>Type</th>
            <th style={{ width: 180 }}>Component</th>
            <th style={{ width: 140 }}>Attribute</th>
            <th>BOM A</th>
            <th>BOM B</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((entry, i) => (
            <tr key={i}>
              <td><span className={`delta-type-badge ${badgeClass(entry.status)}`}>{badgeLabel(entry.status)}</span></td>
              <td className="delta-component">{entry.component}</td>
              <td>{entry.attribute}</td>
              <td className="delta-bom-val">{entry.bomAValue}</td>
              <td className="delta-bom-val">{entry.bomBValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
