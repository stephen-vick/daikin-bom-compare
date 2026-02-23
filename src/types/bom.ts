export interface BomNode {
  id: string
  partNumber: string
  description: string
  quantity: number
  uom: string
  supplier?: string
  children: BomNode[]
}

export interface BomMeta {
  version: string
  sourceSystem: string
  status: 'Released' | 'In Review' | 'Draft' | 'Active'
  effectiveDate: string
  owner: string
}

export interface BomVersion {
  id: string
  type: 'EBOM' | 'MBOM' | 'SERVICE'
  label: string
  dropdownLabel: string
  meta: BomMeta
  root: BomNode
  nodeCount: number
}

export interface Product {
  id: string
  modelNumber: string
  description: string
  versions: BomVersion[]
}

export type DiffStatus = 'ADDED' | 'REMOVED' | 'MODIFIED' | 'UNCHANGED'

export interface ChangedField {
  field: string
  oldValue: unknown
  newValue: unknown
}

export interface DiffNode {
  nodeId: string
  status: DiffStatus
  left?: BomNode
  right?: BomNode
  changedFields?: ChangedField[]
  children: DiffNode[]
}

export interface DiffEntry {
  status: DiffStatus
  component: string
  attribute: string
  bomAValue: string
  bomBValue: string
}
