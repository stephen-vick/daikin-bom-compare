import { create } from 'zustand'

export type TabId = 'side-by-side' | 'delta-summary' | 'metadata'

interface PortalState {
  productId: string
  bomAId: string
  bomBId: string
  compared: boolean
  activeTab: TabId
  showDiffsOnly: boolean
  searchQuery: string

  setProductId: (id: string) => void
  setBomAId: (id: string) => void
  setBomBId: (id: string) => void
  compare: () => void
  resetComparison: () => void
  setActiveTab: (tab: TabId) => void
  setShowDiffsOnly: (v: boolean) => void
  setSearchQuery: (q: string) => void
  swapBoms: () => void
}

export const usePortalStore = create<PortalState>((set) => ({
  productId: 'dx20vc-060',
  bomAId: 'ebom-v3.2',
  bomBId: 'mbom-v1.0',
  compared: false,
  activeTab: 'side-by-side',
  showDiffsOnly: false,
  searchQuery: '',

  setProductId: (id) => set({ productId: id, compared: false }),
  setBomAId: (id) => set({ bomAId: id }),
  setBomBId: (id) => set({ bomBId: id }),
  compare: () => set({ compared: true, activeTab: 'side-by-side', showDiffsOnly: false, searchQuery: '' }),
  resetComparison: () => set({ compared: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowDiffsOnly: (v) => set({ showDiffsOnly: v }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  swapBoms: () => set((s) => ({ bomAId: s.bomBId, bomBId: s.bomAId })),
}))
