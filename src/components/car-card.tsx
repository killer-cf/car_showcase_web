import Image from 'next/image'
import { MapPinIcon } from 'lucide-react'
import { Car } from '@/data/types/car'
import { Button } from './ui/button'
import { formatCurrency } from '@/utils/format-currency'

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-card border flex shadow-md w-[850px] h-[330px]">
      <div className="w-[358px] h-full flex items-center">
        <Image
          src={car.images[0].url}
          alt="Carro"
          width={358}
          height={300}
          className="object-cover"
        />
      </div>
      <div className="mt-2 relative flex flex-1 flex-col justify-between border-l pl-4">
        <div className="h-full py-3 flex flex-col justify-between">
          <div>
            <p className="text-md">{car.used ? 'Usado' : 'Novo'}</p>
            <p className="text-2xl">{car.name}</p>
            <p className="text-sm">{car.km} km</p>
          </div>
          <p className="text-3xl font-bold my-3">
            R$ {formatCurrency(car.price)}
          </p>
          <div>
            <p>Jedd Motores</p>
            <p className="flex gap-1 items-center">
              <MapPinIcon className="w-4 h-4" />
              São Paulo
            </p>
          </div>
        </div>

        <div className="absolute bottom-3 right-3">
          <Button className="w-44">Checar Disponibilidade</Button>
        </div>
      </div>
    </div>
  )
}
