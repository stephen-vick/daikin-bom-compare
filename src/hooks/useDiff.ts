import { useMemo } from 'react'
import type { BomVersion } from '../types/bom'
import { flattenDiff, treeDiff } from '../utils/treeDiff'

export function useDiff(left?: BomVersion, right?: BomVersion) {
  return useMemo(() => {
    if (!left || !right) {
      return {
        diff: undefined,
        summary: [],
      }
    }

    const diff = treeDiff(left.root, right.root)
    const summary = flattenDiff(diff).filter((node) => node.status !== 'UNCHANGED')
    return { diff, summary }
  }, [left, right])
}
