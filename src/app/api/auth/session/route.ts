import { getSession } from '@/data/actions/auth'
import { defaultSession } from '@/lib/iron-session'

export async function GET() {
  const session = await getSession()

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession)
  }

  return Response.json(session)
}
