import { redirect } from 'next/navigation'

import { CarCard } from '@/components/car-card'
import { Pagination } from '@/components/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { fetchCars } from '../../actions/fetch-cars'
import { Filters } from './components/filters'

interface CarsPageProps {
  searchParams: {
    page: number
  }
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const { cars, meta } = await fetchCars(searchParams.page, 5)

  if (meta && searchParams.page > meta.total_pages) {
    redirect('/cars')
  }

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

      <div className="flex gap-4 mt-5 mb-20">
        <Filters />
        <div className="">
          {cars?.map((car) => <CarCard car={car} key={car.id} />)}

          {meta && (
            <div className="mt-14">
              <Pagination
                currentPage={meta.current_page}
                nextPage={meta.next_page}
                prevPage={meta.prev_page}
                pageLink={'/cars'}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
