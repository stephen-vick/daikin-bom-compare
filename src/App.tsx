import { useMemo, useState } from 'react'
import { BomDiff } from './components/BomDiff/BomDiff'
import { BomPanel } from './components/BomPanel/BomPanel'
import { ExportControls } from './components/Export/ExportControls'
import { RecordDetailDrawer } from './components/RecordDetail/RecordDetailDrawer'
import { Toolbar } from './components/Toolbar/Toolbar'
import { useBomsForEntity } from './hooks/useBomsForEntity'
import { useDiff } from './hooks/useDiff'
import { usePortalStore } from './store/usePortalStore'
import type { BomNode } from './types/bom'

function App() {
  const [selectedNode, setSelectedNode] = useState<BomNode>()
  const { data: versions, isLoading, isError, error } = useBomsForEntity()
  const {
    selectedTypes,
    leftType,
    rightType,
    detailOpen,
    setSelectedTypes,
    setLeftType,
    setRightType,
    openDetail,
    closeDetail,
  } = usePortalStore()

  const visibleVersions = useMemo(() => {
    return (versions ?? []).filter((version) => selectedTypes.includes(version.type))
  }, [versions, selectedTypes])

  const leftVersion = useMemo(() => versions?.find((version) => version.type === leftType), [versions, leftType])
  const rightVersion = useMemo(() => versions?.find((version) => version.type === rightType), [versions, rightType])

  const { diff, summary } = useDiff(leftVersion, rightVersion)

  const onSelectNode = (node: BomNode) => {
    setSelectedNode(node)
    openDetail(node.id)
  }

  const onToggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      const next = selectedTypes.filter((item) => item !== type)
      if (next.length > 0) {
        setSelectedTypes(next)
      }
      return
    }
    setSelectedTypes([...selectedTypes, type])
  }

  if (isLoading) {
    return <div className="center-state">Loading BOM data...</div>
  }

  if (isError) {
    return <div className="center-state">Failed to load BOM data: {(error as Error).message}</div>
  }

  if (!versions || versions.length === 0) {
    return <div className="center-state">No BOM versions found.</div>
  }

  return (
    <div className="app">
      <Toolbar
        versions={versions}
        selectedTypes={selectedTypes}
        leftType={leftType}
        rightType={rightType}
        onToggleType={onToggleType}
        onSetLeftType={setLeftType}
        onSetRightType={setRightType}
      />

      <main className="workspace">
        <div className="panel-grid">
          {visibleVersions.map((version) => (
            <BomPanel
              key={version.type}
              version={version}
              onSelectNode={onSelectNode}
              diff={leftVersion?.type === version.type || rightVersion?.type === version.type ? diff : undefined}
            />
          ))}
        </div>
        <BomDiff
          summary={summary}
          leftLabel={leftVersion?.label ?? 'N/A'}
          rightLabel={rightVersion?.label ?? 'N/A'}
        />
      </main>

      <footer className="status-bar">
        <span>Visible BOMs: {visibleVersions.length}</span>
        <span>Diff changes: {summary.length}</span>
        <ExportControls />
      </footer>

      <RecordDetailDrawer node={selectedNode} open={detailOpen} onClose={closeDetail} />
    </div>
  )
}

export default App
