import { create } from 'zustand'

export type User = {
  id: string
  email: string
  name: string
  expires: number
}

export interface SessionState {
  user: User | null
  error: string | null
  setSession: (user: User | null | undefined) => void
  clearSession: () => void
  logout: () => Promise<void>
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  error: null,
  setSession: (user: User | null | undefined) => {
    set({ user: user ?? null })
  },
  clearSession: () => set({ user: null }),
  logout: async () => {
    await fetch('/api/auth/logout')
    set({ user: null })
  },
}))

export const useSession = () => {
  const { user, error } = useSessionStore()

  return { user, error }
}
