import type { BomNode, ChangedField, DiffEntry, DiffNode, DiffStatus } from '../types/bom'

const COMPARED_FIELDS: Array<{ key: keyof BomNode; label: string }> = [
  { key: 'partNumber', label: 'Part Number' },
  { key: 'description', label: 'Description' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'supplier', label: 'Supplier' },
]

function getChangedFields(left: BomNode, right: BomNode): ChangedField[] {
  const changed: ChangedField[] = []
  for (const { key, label } of COMPARED_FIELDS) {
    const lv = left[key] ?? ''
    const rv = right[key] ?? ''
    if (String(lv) !== String(rv)) {
      changed.push({ field: label, oldValue: left[key], newValue: right[key] })
    }
  }
  return changed
}

function diffChildren(leftChildren: BomNode[] | undefined, rightChildren: BomNode[] | undefined): DiffNode[] {
  const left = leftChildren ?? []
  const right = rightChildren ?? []
  const leftById = new Map(left.map((c) => [c.id, c]))
  const rightById = new Map(right.map((c) => [c.id, c]))
  const allIds = new Set([...leftById.keys(), ...rightById.keys()])
  const result: DiffNode[] = []
  for (const id of allIds) {
    result.push(diffNode(leftById.get(id), rightById.get(id)))
  }
  return result
}

function diffNode(left?: BomNode, right?: BomNode): DiffNode {
  if (!left && right) {
    return {
      nodeId: right.id,
      status: 'ADDED',
      right,
      children: right.children.map((c) => diffNode(undefined, c)),
    }
  }
  if (left && !right) {
    return {
      nodeId: left.id,
      status: 'REMOVED',
      left,
      children: left.children.map((c) => diffNode(c, undefined)),
    }
  }

  const l = left!
  const r = right!
  const changedFields = getChangedFields(l, r)
  const children = diffChildren(l.children, r.children)
  const hasOwnChanges = changedFields.length > 0
  const hasChildChanges = children.some((c) => c.status !== 'UNCHANGED')

  return {
    nodeId: l.id,
    status: hasOwnChanges || hasChildChanges ? 'MODIFIED' : 'UNCHANGED',
    left: l,
    right: r,
    changedFields,
    children,
  }
}

export function treeDiff(left: BomNode, right: BomNode): DiffNode {
  return diffNode(left, right)
}

export function flattenDiff(node: DiffNode): DiffNode[] {
  const result: DiffNode[] = [node]
  for (const child of node.children) {
    result.push(...flattenDiff(child))
  }
  return result
}

export function buildDiffEntries(diff: DiffNode): DiffEntry[] {
  const entries: DiffEntry[] = []
  const flat = flattenDiff(diff).filter((n) => n.children.length === 0 || (n.changedFields && n.changedFields.length > 0))

  for (const node of flat) {
    if (node.status === 'UNCHANGED') continue

    const componentId = node.left?.partNumber ?? node.right?.partNumber ?? node.nodeId

    if (node.status === 'ADDED') {
      entries.push({
        status: 'ADDED',
        component: node.right!.partNumber,
        attribute: 'New component',
        bomAValue: '\u2014',
        bomBValue: node.right!.description,
      })
    } else if (node.status === 'REMOVED') {
      entries.push({
        status: 'REMOVED',
        component: node.left!.partNumber,
        attribute: 'Removed',
        bomAValue: node.left!.description,
        bomBValue: '\u2014',
      })
    } else if (node.changedFields && node.changedFields.length > 0) {
      for (const field of node.changedFields) {
        entries.push({
          status: 'MODIFIED',
          component: componentId,
          attribute: field.field,
          bomAValue: field.oldValue != null ? String(field.oldValue) : '\u2014',
          bomBValue: field.newValue != null ? String(field.newValue) : '\u2014',
        })
      }
    }
  }
  return entries
}

export function countNodeChanges(diff: DiffNode): { added: number; removed: number; changed: number } {
  const flat = flattenDiff(diff)
  const leaves = flat.filter((n) => n.children.length === 0 || (n.changedFields && n.changedFields.length > 0))
  let added = 0, removed = 0, changed = 0
  for (const node of leaves) {
    if (node.status === 'ADDED') added++
    else if (node.status === 'REMOVED') removed++
    else if (node.status === 'MODIFIED' && node.changedFields && node.changedFields.length > 0) changed++
  }
  return { added, removed, changed }
}

export function buildStatusMap(diff: DiffNode): Map<string, DiffStatus> {
  const map = new Map<string, DiffStatus>()
  function walk(node: DiffNode) {
    if (node.status !== 'UNCHANGED') {
      map.set(node.nodeId, node.status)
    }
    node.children.forEach(walk)
  }
  walk(diff)
  return map
}

export function hasChangedDescendant(nodeId: string, diff: DiffNode): boolean {
  function find(d: DiffNode): DiffNode | null {
    if (d.nodeId === nodeId) return d
    for (const c of d.children) {
      const r = find(c)
      if (r) return r
    }
    return null
  }
  const subtree = find(diff)
  if (!subtree) return false
  const flat = flattenDiff(subtree)
  return flat.some((n) => n.nodeId !== nodeId && n.status !== 'UNCHANGED')
}
