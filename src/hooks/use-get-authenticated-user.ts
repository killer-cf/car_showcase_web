import { useQuery } from '@tanstack/react-query'

import { getAuthenticatedUser } from '@/actions/user'

export function useGetAuthenticatedUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getAuthenticatedUser,
  })
}
