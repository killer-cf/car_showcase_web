import { useQuery } from '@tanstack/react-query'

import { getSession } from '../actions/get-session'

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => getSession(),
    staleTime: 0,
  })
}
