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
      <div className="empty-icon-container">
        <div className="empty-icon-bg" />
        <div className="empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00A0E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 7v8a2 2 0 0 0 2 2h3M18 14V7a2 2 0 0 0-2-2h-3" />
          </svg>
        </div>
      </div>
      <h2>Select BOMs to Compare</h2>
      <p>
        Choose a product and two BOM versions above, then click{' '}
        <strong style={{ color: '#00A0E4' }}>Compare</strong> to see
        side-by-side differences, delta summary, and metadata.
      </p>
      <div className="empty-subtitle">Daikin Comfort Technologies &times; Profisee MDM</div>
      <div className="quick-compare">
        <button className="quick-pill" onClick={() => quickCompare('ebom-v3.2', 'mbom-v1.0')}>
          E-BOM &rarr; M-BOM
        </button>
        <button className="quick-pill" onClick={() => quickCompare('mbom-v1.0', 'svc-v1.1')}>
          M-BOM &rarr; Service
        </button>
        <button className="quick-pill" onClick={() => quickCompare('ebom-v3.2', 'svc-v1.1')}>
          E-BOM &rarr; Service
        </button>
      </div>
    </div>
  )
}
