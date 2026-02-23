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
import { treeDiff, countNodeChanges, flattenDiff } from './utils/treeDiff'

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
  const totalNodes = (bomA?.nodeCount ?? 0) + (bomB?.nodeCount ?? 0)

  const uniqueChangedComponents = useMemo(() => {
    if (!diff) return 0
    const flat = flattenDiff(diff)
    return flat.filter((n) => n.status !== 'UNCHANGED' && (n.children.length === 0 || (n.changedFields && n.changedFields.length > 0))).length
  }, [diff])

  return (
    <div className="app">
      <Header />
      <Toolbar />

      {compared && bomA && bomB && diff ? (
        <>
          <div className="sub-toolbar">
            <button
              className={`btn-toggle ${showDiffsOnly ? 'active' : ''}`}
              onClick={() => setShowDiffsOnly(!showDiffsOnly)}
            >
              &#9998; {showDiffsOnly ? 'Showing diffs only' : 'Show diffs only'}
            </button>

            <div className="tab-bar">
              <button
                className={`tab-item ${activeTab === 'side-by-side' ? 'active' : ''}`}
                onClick={() => setActiveTab('side-by-side')}
              >
                &#9776; Side-by-Side
              </button>
              <button
                className={`tab-item ${activeTab === 'delta-summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('delta-summary')}
              >
                &#9636; Delta Summary <span className="tab-badge">{uniqueChangedComponents}</span>
              </button>
              <button
                className={`tab-item ${activeTab === 'metadata' ? 'active' : ''}`}
                onClick={() => setActiveTab('metadata')}
              >
                &#9881; Metadata
              </button>
            </div>

            <div className="search-box">
              &#128269;
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
            {activeTab === 'metadata' && <MetadataView bomA={bomA} bomB={bomB} />}
          </div>
        </>
      ) : (
        <EmptyState />
      )}

      <Footer
        compared={compared}
        totalNodes={totalNodes}
        diffCount={totalDiffs}
        added={counts.added}
        removed={counts.removed}
        changed={counts.changed}
        productModel={product?.modelNumber ?? ''}
      />
    </div>
  )
}

export default App
