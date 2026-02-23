export type BomType = 'engineering' | 'manufacturing' | 'as-built' | 'service';

export type ChangeStatus = 'added' | 'removed' | 'modified' | 'unchanged';

export interface BomComponent {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  unit: string;
  material?: string;
  supplier?: string;
  revision?: string;
  children?: BomComponent[];
  // Diff state (set during comparison)
  diffStatus?: ChangeStatus;
  diffDetail?: string;
}

export interface BomVersion {
  id: string;
  type: BomType;
  label: string;
  versionNumber: string;
  createdAt: string;
  releasedAt?: string;
  source: string; // PLM, ERP, MDM, Field Service
  status: 'draft' | 'released' | 'approved' | 'superseded';
  orderId?: string;
  components: BomComponent[];
}

export interface DiffNode {
  id: string;
  partNumber: string;
  description: string;
  leftQty?: number;
  rightQty?: number;
  unit: string;
  status: ChangeStatus;
  detail?: string;
  children?: DiffNode[];
  depth: number;
}

export interface BomDiffResult {
  leftBom: BomVersion;
  rightBom: BomVersion;
  nodes: DiffNode[];
  summary: {
    added: number;
    removed: number;
    modified: number;
    unchanged: number;
    total: number;
  };
}
