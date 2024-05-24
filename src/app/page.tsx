import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Image from 'next/image'

import { fetchBrands } from '@/actions/fetch-brands'
import { HomeFilters } from '@/components/home-filters'

import CarImage from '../../public/car.webp'

export default async function Home() {
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

          <HomeFilters />
        </div>
      </div>
    </main>
  )
}
