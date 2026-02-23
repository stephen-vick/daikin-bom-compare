import { PRODUCTS } from '../data/mockData'
import { usePortalStore } from '../store/usePortalStore'

export function Toolbar() {
  const {
    productId, bomAId, bomBId,
    setProductId, setBomAId, setBomBId, compare, swapBoms,
  } = usePortalStore()

  const product = PRODUCTS.find((p) => p.id === productId)
  const versions = product?.versions ?? []
  const canCompare = bomAId && bomBId && bomAId !== bomBId

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <span className="toolbar-label">Product</span>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          {PRODUCTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.modelNumber} &mdash; {p.description}
            </option>
          ))}
        </select>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <span className="toolbar-label">BOM A</span>
        <select value={bomAId} onChange={(e) => setBomAId(e.target.value)}>
          {versions.map((v) => (
            <option key={v.id} value={v.id}>{v.dropdownLabel}</option>
          ))}
        </select>
      </div>

      <button className="toolbar-swap" onClick={swapBoms} title="Swap BOM A and B">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3L4 7l4 4M16 3l4 4-4 4M4 7h16" />
        </svg>
      </button>

      <div className="toolbar-group">
        <span className="toolbar-label">BOM B</span>
        <select value={bomBId} onChange={(e) => setBomBId(e.target.value)}>
          {versions.map((v) => (
            <option key={v.id} value={v.id}>{v.dropdownLabel}</option>
          ))}
        </select>
      </div>

      <button
        className="btn-compare"
        onClick={compare}
        disabled={!canCompare}
        style={!canCompare ? { background: '#CDDAE2', cursor: 'default' } : undefined}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 7v8a2 2 0 0 0 2 2h3M18 14V7a2 2 0 0 0-2-2h-3" />
        </svg>
        Compare
      </button>
    </div>
  )
}
