import { useQuery } from '@tanstack/react-query'

import { fetchBrands } from '../actions/fetch-brands'

export function useFetchBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => fetchBrands(),
  })
}
