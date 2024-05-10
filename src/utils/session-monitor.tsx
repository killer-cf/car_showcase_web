import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function SessionMonitor() {
  const { data: session } = useSession({
    required: false,
    onUnauthenticated() {
      // This function can run code when the session becomes unauthenticated.
      // Redirect the user or display a message as needed.
    },
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | number | undefined

    console.log('session monitor', session)

    if (session?.expires) {
      const timeTillExpiry = new Date(session.expires).getTime() - Date.now()
      if (timeTillExpiry > 0) {
        // Set a timeout to automatically sign out the user when the session expires
        timeoutId = setTimeout(() => {
          signOut()
        }, timeTillExpiry)
      }
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }
    } // Clean up on component unmount or session change
  }, [session])

  // Your component's return statement.
  return null // or actual UI elements
}
