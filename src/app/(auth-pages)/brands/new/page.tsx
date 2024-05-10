import Link from 'next/link'

// import { BackButton } from '@/components/back-button'
import { BrandForm } from '../components/brand-form'

export default async function NewBrandPage() {
  return (
    <div className="flex flex-col gap-4 mt-5 max-w-6xl m-auto mb-20">
      <div className="flex">
        <Link href={'/brands'} />
      </div>

      <h1 className="font-bold text-4xl text-center">Nova marca</h1>

      <BrandForm />
    </div>
  )
}
