import { BackButton } from '@/components/back-button'
import { CarForm } from '@/components/car-form'

export default async function NewCarPage() {
  return (
    <div className="flex flex-col gap-8 p-24">
      <h1 className="font-bold text-2xl p-5">Cadastro de Carro</h1>
      <div className="flex gap-6">
        <BackButton />
      </div>

      <CarForm />
    </div>
  )
}
