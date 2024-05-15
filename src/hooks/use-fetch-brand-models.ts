import { useQuery } from '@tanstack/react-query'

import { fetchBrandModels } from '../actions/fetch-brand-models'

export function useFetchBrandModels(brandId?: string) {
  return useQuery({
    queryKey: ['models', brandId],
    queryFn: async () => fetchBrandModels({ brandId }),
    enabled: !!brandId,
  })
}
