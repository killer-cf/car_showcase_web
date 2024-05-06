import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

import {
  defaultSession,
  SessionData,
  sessionOptions,
  sleep,
} from '@/lib/iron-session'

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
    session.username = defaultSession.username
    session.email = defaultSession.email
    session.accessToken = defaultSession.accessToken
    session.refreshToken = defaultSession.refreshToken
  }

  if (shouldSleep) {
    // simulate looking up the user in db
    await sleep(250)
  }

  return session
}

export async function updateSession(sessionData: SessionData) {
  'use server'
  const session = await getSession(false)

  session.isLoggedIn = sessionData.isLoggedIn
  session.username = sessionData.username
  session.email = sessionData.email
  session.accessToken = sessionData.accessToken
  session.refreshToken = sessionData.refreshToken
  session.expires = sessionData.expires

  session.save()
}

// export async function logout() {
//   'use server'

//   // false => no db call for logout
//   const session = await getSession(false)
//   session.destroy()
//   revalidatePath('/')
// }

// export async function login(formData: FormData) {
//   'use server'

//   const session = await getSession()

//   session.username = (formData.get('username') as string) ?? 'No username'
//   session.isLoggedIn = true
//   await session.save()
//   revalidatePath('/')
// }
