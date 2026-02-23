import { create } from 'zustand'
import { PRODUCTS } from '../data/mockData'

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

  setProductId: (id) => {
    const prod = PRODUCTS.find((p) => p.id === id)
    const versions = prod?.versions ?? []
    set({
      productId: id,
      bomAId: versions[0]?.id ?? '',
      bomBId: versions[1]?.id ?? '',
      compared: false,
      searchQuery: '',
    })
  },
  setBomAId: (id) => set({ bomAId: id, compared: false }),
  setBomBId: (id) => set({ bomBId: id, compared: false }),
  compare: () => set({ compared: true, activeTab: 'side-by-side', showDiffsOnly: false, searchQuery: '' }),
  resetComparison: () => set({ compared: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowDiffsOnly: (v) => set({ showDiffsOnly: v }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  swapBoms: () => set((s) => ({ bomAId: s.bomBId, bomBId: s.bomAId })),
}))
