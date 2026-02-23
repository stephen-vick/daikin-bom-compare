export interface BomNode {
  id: string
  partNumber: string
  description: string
  quantity: number
  uom: string
  effectiveDate: string
  expiryDate?: string
  sourceSystem: string
  status: string
  children: BomNode[]
  metadata: Record<string, unknown>
}

export interface BomVersion {
  type: string
  label: string
  sourceSystem: string
  lastUpdated: string
  editableInMdm: boolean
  root: BomNode
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
