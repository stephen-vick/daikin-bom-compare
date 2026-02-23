import { create } from 'zustand'

interface PortalState {
  selectedTypes: string[]
  leftType: string
  rightType: string
  selectedNodeId?: string
  detailOpen: boolean
  setSelectedTypes: (types: string[]) => void
  setLeftType: (type: string) => void
  setRightType: (type: string) => void
  openDetail: (nodeId: string) => void
  closeDetail: () => void
}

export const usePortalStore = create<PortalState>((set) => ({
  selectedTypes: ['EBOM', 'MBOM', 'SERVICE'],
  leftType: 'EBOM',
  rightType: 'SERVICE',
  detailOpen: false,
  setSelectedTypes: (types) => set({ selectedTypes: types }),
  setLeftType: (type) => set({ leftType: type }),
  setRightType: (type) => set({ rightType: type }),
  openDetail: (nodeId) => set({ selectedNodeId: nodeId, detailOpen: true }),
  closeDetail: () => set({ detailOpen: false }),
}))
