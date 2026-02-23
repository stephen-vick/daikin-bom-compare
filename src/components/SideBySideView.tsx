import type { BomVersion, DiffNode } from '../types/bom'
import { BomTreePanel } from './BomTreePanel'

interface Props {
  bomA: BomVersion
  bomB: BomVersion
  diff: DiffNode
  showDiffsOnly: boolean
  searchQuery: string
}

export function SideBySideView({ bomA, bomB, diff, showDiffsOnly, searchQuery }: Props) {
  return (
    <div className="side-by-side">
      <BomTreePanel version={bomA} side="A" diff={diff} showDiffsOnly={showDiffsOnly} searchQuery={searchQuery} />
      <BomTreePanel version={bomB} side="B" diff={diff} showDiffsOnly={showDiffsOnly} searchQuery={searchQuery} />
    </div>
  )
}
