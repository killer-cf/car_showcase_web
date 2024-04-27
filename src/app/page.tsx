import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import CarImage from '../../public/car.webp'

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="bg-[#29302F] w-full h-[500px]">
        <div className="max-w-6xl m-auto relative h-full flex">
          <div className="mt-28">
            <h1 className="text-5xl font-bold text-white w-80 leading-normal">
              Imagine as possibilidades
            </h1>
            <p className="text-2xl text-violet-800 font-bold mt-5 w-96">
              O carro dos seus sonhos a um clique de distância
            </p>
          </div>
          <Image
            src={CarImage}
            alt="Car"
            height={570}
            className="absolute -bottom-52 right-1"
          />
        </div>
      </div>
      <div className="flex w-full max-w-6xl m-auto mt-40">
        <div className=" bg-secondary w-full px-4 py-5">
          <div className="flex">
            <div className="">
              <h2 className="font-bold text-lg px-2">Por fabricante</h2>
              <div className="w-full h-1 bg-violet-800 mt-1"></div>
            </div>
          </div>

          <div className="filters mt-4">
            <div className="flex">
              <Select>
                <SelectTrigger className="text-black rounded-none bg-background">
                  <SelectValue placeholder="Novo ou usado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'id-aqui'} value={'id-aqui'}>
                    Novo
                  </SelectItem>
                  <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                    Usado
                  </SelectItem>
                  <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                    Novo e usado
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="text-black rounded-none bg-background">
                  <SelectValue placeholder="Fabricante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'id-aqui'} value={'id-aqui'}>
                    Tesla
                  </SelectItem>
                  <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                    Subaro
                  </SelectItem>
                  <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                    Ford
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="text-black rounded-none bg-background">
                  <SelectValue placeholder="Modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={'id-aqui'} value={'id-aqui'}>
                    Focus
                  </SelectItem>
                  <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                    Fiesta
                  </SelectItem>
                  <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                    Fusion
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3">
              <div>
                <Select>
                  <SelectTrigger className="text-black rounded-none bg-background">
                    <SelectValue placeholder="Preço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={'id-aqui'} value={'id-aqui'}>
                      Sem preço máximo
                    </SelectItem>
                    <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                      10.000
                    </SelectItem>
                    <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                      30.000
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <Select>
                  <SelectTrigger className="text-black rounded-none bg-background">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={'id-aqui'} value={'id-aqui'}>
                      Pernambuco
                    </SelectItem>
                    <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                      Paraiba
                    </SelectItem>
                    <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                      Bahia
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="text-black rounded-none bg-background">
                    <SelectValue placeholder="Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={'id-aqui'} value={'id-aqui'}>
                      Recife
                    </SelectItem>
                    <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                      Olinda
                    </SelectItem>
                    <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                      Vitoria
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="h-12 rounded-none bg-violet-700 hover:bg-violet-900 transition-colors ease-in text-lg">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
