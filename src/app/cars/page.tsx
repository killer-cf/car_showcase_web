import { fetchCars } from '../../data/actions/fetch-cars'
import { CarCard } from '@/components/car-card'
import { Filters } from './components/filters'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default async function CarsPage() {
  const data = await fetchCars()

  console.log(data.cars)
  return (
    <main className="flex min-h-screen flex-col items-center max-w-6xl m-auto">
      <div className="flex my-8 gap-8">
        <h1 className="text-5xl font-bold self-start">
          Carros novos e usados a venda proximo de Recife, PE
        </h1>

        <Select>
          <SelectTrigger className="text-black bg-background w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={'id-aqui'} value={'id-aqui'}>
              Mais novo
            </SelectItem>
            <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
              Mais velho
            </SelectItem>
            <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
              Mais barato
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 mt-5">
        <Filters />
        <div className="space-y-5">
          {data.cars?.map((car) => <CarCard car={car} key={car.id} />)}
        </div>
      </div>
    </main>
  )
}
