import { auth, signIn, signOut } from '@/auth'

export default async function AuthStatus() {
  const session = await auth()

  if (session && !session.error) {
    return (
      <div className="my-3">
        Logged in as <span className="">{session.user?.email}</span>{' '}
        {/* <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={() => signOut()}
        >
          Log out
        </button> */}
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button
            className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="my-3">
      Not logged in.{' '}
      {/* <button
        className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
        type="submit"
        onClick={() => signIn('keycloak')}
      >
        Log in
      </button> */}
      <form
        action={async () => {
          'use server'
          await signIn('keycloak')
        }}
      >
        <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
