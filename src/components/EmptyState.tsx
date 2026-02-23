import { usePortalStore } from '../store/usePortalStore'

export function EmptyState() {
  const { setBomAId, setBomBId, compare } = usePortalStore()

  const quickCompare = (aId: string, bId: string) => {
    setBomAId(aId)
    setBomBId(bId)
    compare()
  }

  return (
    <div className="empty-state">
      <div className="empty-icon">&#8693;</div>
      <h2>Select BOMs to Compare</h2>
      <p>
        Choose a product and two BOM versions above, then click{' '}
        <strong style={{ color: 'var(--accent)' }}>Compare</strong> to
        see side-by-side differences with delta highlighting.
      </p>
      <div className="quick-compare">
        <button className="quick-pill" onClick={() => quickCompare('ebom-v3.2', 'mbom-v1.0')}>
          E-BOM &rarr; M-BOM
        </button>
        <button className="quick-pill" onClick={() => quickCompare('mbom-v1.0', 'svc-v2.0')}>
          M-BOM &rarr; Service
        </button>
        <button className="quick-pill" onClick={() => quickCompare('ebom-v3.2', 'svc-v2.0')}>
          E-BOM &rarr; Service
        </button>
      </div>
    </div>
  )
}
