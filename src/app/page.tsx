import AuthStatus from '@/components/auth-status'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Ola</div>
      <AuthStatus />
    </main>
  )
}
