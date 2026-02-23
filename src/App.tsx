import { useMemo } from 'react'
import { Header } from './components/Header'
import { Toolbar } from './components/Toolbar'
import { EmptyState } from './components/EmptyState'
import { SideBySideView } from './components/SideBySideView'
import { DeltaSummaryView } from './components/DeltaSummaryView'
import { MetadataView } from './components/MetadataView'
import { Footer } from './components/Footer'
import { getProduct, getVersion } from './data/mockData'
import { usePortalStore } from './store/usePortalStore'
import { treeDiff, countNodeChanges } from './utils/treeDiff'

function App() {
  const {
    productId, bomAId, bomBId, compared,
    activeTab, showDiffsOnly, searchQuery,
    setActiveTab, setShowDiffsOnly, setSearchQuery,
  } = usePortalStore()

  const product = getProduct(productId)
  const bomA = getVersion(productId, bomAId)
  const bomB = getVersion(productId, bomBId)

  const diff = useMemo(() => {
    if (!compared || !bomA || !bomB) return undefined
    return treeDiff(bomA.root, bomB.root)
  }, [compared, bomA, bomB])

  const counts = useMemo(() => {
    if (!diff) return { added: 0, removed: 0, changed: 0 }
    return countNodeChanges(diff)
  }, [diff])

  const totalDiffs = counts.added + counts.removed + counts.changed

  return (
    <div className="app">
      <Header />
      <Toolbar />

      {compared && bomA && bomB && diff ? (
        <>
          <div className="sub-toolbar">
            <label className="diff-checkbox-label">
              <input
                type="checkbox"
                checked={showDiffsOnly}
                onChange={(e) => setShowDiffsOnly(e.target.checked)}
              />
              &#128065; Differences only
            </label>

            <div className="tab-bar">
              <button
                className={`tab-item ${activeTab === 'side-by-side' ? 'active' : ''}`}
                onClick={() => setActiveTab('side-by-side')}
              >
                Side-by-Side
              </button>
              <button
                className={`tab-item ${activeTab === 'delta-summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('delta-summary')}
              >
                Delta Summary <span className="tab-badge">{totalDiffs}</span>
              </button>
              <button
                className={`tab-item ${activeTab === 'metadata' ? 'active' : ''}`}
                onClick={() => setActiveTab('metadata')}
              >
                Metadata
              </button>
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="main-content">
            {activeTab === 'side-by-side' && (
              <SideBySideView
                bomA={bomA}
                bomB={bomB}
                diff={diff}
                showDiffsOnly={showDiffsOnly}
                searchQuery={searchQuery}
              />
            )}
            {activeTab === 'delta-summary' && <DeltaSummaryView diff={diff} />}
            {activeTab === 'metadata' && <MetadataView bomA={bomA} bomB={bomB} diff={diff} />}
          </div>
        </>
      ) : (
        <EmptyState />
      )}

      <Footer
        compared={compared}
        nodeCountA={bomA?.nodeCount ?? 0}
        nodeCountB={bomB?.nodeCount ?? 0}
        diffCount={totalDiffs}
        productModel={product?.modelNumber ?? ''}
      />
    </div>
  )
}

export default App
