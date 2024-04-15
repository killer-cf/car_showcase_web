import Image from 'next/image'
import { fetchCars } from '../../data/actions/fetch-cars'
import { Button } from '@/components/ui/button'

export default async function CarsPage() {
  const data = await fetchCars()

  console.log(data.cars)
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <div>Cars page</div>
      <Button>Novo carro</Button>
      <div>
        {data.cars?.map((car) => (
          <div key={car.id} className="py-5">
            <Image
              src={car.images[0].url}
              alt={car.name}
              width={200}
              height={200}
            />
            <h2>{car.name}</h2>
            <p>{car.model}</p>
            <p>{car.year}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
