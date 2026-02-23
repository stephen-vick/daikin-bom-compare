import type { BomNode, ChangedField, DiffNode } from '../types/bom'

const COMPARED_FIELDS: Array<keyof BomNode> = [
  'partNumber',
  'description',
  'quantity',
  'uom',
  'effectiveDate',
  'expiryDate',
  'sourceSystem',
  'status',
]

function nodeKey(node: BomNode): string {
  return node.partNumber
}

function getChangedFields(left: BomNode, right: BomNode): ChangedField[] {
  const changed: ChangedField[] = []
  for (const field of COMPARED_FIELDS) {
    if (left[field] !== right[field]) {
      changed.push({
        field,
        oldValue: left[field],
        newValue: right[field],
      })
    }
  }
  return changed
}

function diffNode(left?: BomNode, right?: BomNode): DiffNode {
  if (!left && !right) {
    throw new Error('diffNode requires at least one node')
  }

  if (!left && right) {
    return {
      nodeId: right.id,
      status: 'ADDED',
      right,
      children: right.children.map((child) => diffNode(undefined, child)),
    }
  }

  if (left && !right) {
    return {
      nodeId: left.id,
      status: 'REMOVED',
      left,
      children: left.children.map((child) => diffNode(child, undefined)),
    }
  }

  const safeLeft = left as BomNode
  const safeRight = right as BomNode
  const leftByKey = new Map(safeLeft.children.map((child) => [nodeKey(child), child]))
  const rightByKey = new Map(safeRight.children.map((child) => [nodeKey(child), child]))
  const allChildKeys = new Set([...leftByKey.keys(), ...rightByKey.keys()])

  const changedFields = getChangedFields(safeLeft, safeRight)
  const children: DiffNode[] = []
  for (const key of allChildKeys) {
    children.push(diffNode(leftByKey.get(key), rightByKey.get(key)))
  }

  let status: DiffNode['status'] = 'UNCHANGED'
  if (changedFields.length > 0) {
    status = 'MODIFIED'
  } else if (children.some((child) => child.status !== 'UNCHANGED')) {
    status = 'MODIFIED'
  }

  return {
    nodeId: safeLeft.id,
    status,
    left: safeLeft,
    right: safeRight,
    changedFields,
    children,
  }
}

export function treeDiff(left: BomNode, right: BomNode): DiffNode {
  return diffNode(left, right)
}

export function flattenDiff(diff: DiffNode): DiffNode[] {
  const nodes: DiffNode[] = [diff]
  for (const child of diff.children) {
    nodes.push(...flattenDiff(child))
  }
  return nodes
}
