import { fetchCars } from '../../data/actions/fetch-cars'
import { CarCard } from '@/components/car-card'

export default async function CarsPage() {
  const data = await fetchCars()

  console.log(data.cars)
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <div className="space-y-5">
        {data.cars?.map((car) => <CarCard car={car} key={car.id} />)}
      </div>
    </main>
  )
}
