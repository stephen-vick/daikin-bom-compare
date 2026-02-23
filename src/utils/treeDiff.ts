import type { BomNode, ChangedField, DiffEntry, DiffNode, DiffStatus } from '../types/bom'

const COMPARED_FIELDS: Array<{ key: keyof BomNode; label: string; format?: (v: unknown) => string }> = [
  { key: 'partNumber', label: 'Part Number' },
  { key: 'description', label: 'Description' },
  { key: 'quantity', label: 'Quantity', format: (v) => `${v} EA` },
  { key: 'supplier', label: 'Supplier', format: (v) => (v as string) || '\u2014' },
  { key: 'warrantyMonths', label: 'Warranty', format: (v) => v != null ? `${v}mo` : '\u2014' },
  { key: 'lifecycleStatus', label: 'Status' },
  { key: 'isReplaceable', label: 'Replaceable', format: (v) => v ? 'Yes' : 'No' },
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

function formatFieldValue(key: string, value: unknown): string {
  const field = COMPARED_FIELDS.find((f) => f.label === key)
  if (field?.format && value != null) return field.format(value)
  return value != null ? String(value) : '\u2014'
}

export function buildDiffEntries(diff: DiffNode): DiffEntry[] {
  const entries: DiffEntry[] = []

  function walk(node: DiffNode, parentPath: string) {
    const partId = node.left?.partNumber ?? node.right?.partNumber ?? node.nodeId
    const path = parentPath ? `${parentPath}/${partId}` : partId

    if (node.status === 'UNCHANGED') {
      node.children.forEach((c) => walk(c, path))
      return
    }

    const isLeaf = node.children.length === 0
    const hasOwnChanges = node.changedFields && node.changedFields.length > 0

    if (node.status === 'ADDED' && isLeaf) {
      entries.push({
        status: 'ADDED',
        path,
        component: node.right!.partNumber,
        attribute: 'Component',
        bomAValue: '\u2014',
        bomBValue: node.right!.partNumber,
      })
    } else if (node.status === 'REMOVED' && isLeaf) {
      entries.push({
        status: 'REMOVED',
        path,
        component: node.left!.partNumber,
        attribute: 'Component',
        bomAValue: node.left!.partNumber,
        bomBValue: '\u2014',
      })
    } else if (hasOwnChanges) {
      for (const field of node.changedFields!) {
        entries.push({
          status: 'MODIFIED',
          path,
          component: partId,
          attribute: field.field,
          bomAValue: formatFieldValue(field.field, field.oldValue),
          bomBValue: formatFieldValue(field.field, field.newValue),
        })
      }
    }

    node.children.forEach((c) => walk(c, path))
  }

  walk(diff, '')
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
