import { useQuery } from '@tanstack/react-query'
import { fetchMockBomVersions } from '../api/mockProfiseeApi'

export function useBomsForEntity() {
  return useQuery({
    queryKey: ['mock-bom-versions'],
    queryFn: fetchMockBomVersions,
    staleTime: 60_000,
  })
}
