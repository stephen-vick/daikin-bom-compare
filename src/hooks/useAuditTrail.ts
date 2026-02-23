import { useQuery } from '@tanstack/react-query'

export function useAuditTrail(nodeId?: string) {
  return useQuery({
    queryKey: ['mock-audit', nodeId],
    enabled: Boolean(nodeId),
    queryFn: async () => {
      return [
        {
          changedAt: '2026-02-10T10:12:00Z',
          changedBy: 'mock.user@daikin.com',
          field: 'status',
          oldValue: 'Released',
          newValue: 'Replaced',
        },
      ]
    },
  })
}
