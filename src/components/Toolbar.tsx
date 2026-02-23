import { PRODUCTS } from '../data/mockData'
import { usePortalStore } from '../store/usePortalStore'

export function Toolbar() {
  const {
    productId, bomAId, bomBId,
    setProductId, setBomAId, setBomBId, compare, swapBoms,
  } = usePortalStore()

  const product = PRODUCTS.find((p) => p.id === productId)
  const versions = product?.versions ?? []

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

      <div className="toolbar-group">
        <span className="toolbar-label">BOM A</span>
        <select value={bomAId} onChange={(e) => setBomAId(e.target.value)}>
          {versions.map((v) => (
            <option key={v.id} value={v.id}>{v.dropdownLabel}</option>
          ))}
        </select>
      </div>

      <button className="toolbar-swap" onClick={swapBoms} title="Swap BOM A and B">&#8644;</button>

      <div className="toolbar-group">
        <span className="toolbar-label">BOM B</span>
        <select value={bomBId} onChange={(e) => setBomBId(e.target.value)}>
          {versions.map((v) => (
            <option key={v.id} value={v.id}>{v.dropdownLabel}</option>
          ))}
        </select>
      </div>

      <button className="btn-compare" onClick={compare}>
        &#8635; Compare
      </button>
    </div>
  )
}
