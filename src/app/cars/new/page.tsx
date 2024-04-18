import { BackButton } from '@/components/back-button'
import { CarForm } from '@/components/car-form'

export default async function NewCarPage() {
  return (
    <div className="flex flex-col gap-4 mt-5 max-w-6xl m-auto mb-20">
      <div className="flex">
        <BackButton />
      </div>

      <h1 className="font-bold text-4xl text-center">Novo carro</h1>

      <CarForm />
    </div>
  )
}
