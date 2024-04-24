import Image from 'next/image'

import CarImage from '../../public/tesla.webp'

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="bg-[#29302F] w-full h-[500px]">
        <div className="max-w-6xl m-auto relative h-full flex">
          <div className="mt-28">
            <h1 className="text-5xl font-bold text-white w-80 leading-normal">
              Imagine as possibilidades
            </h1>
            <p className="text-2xl text-blue-700 font-bold mt-5 w-96">
              O carro dos seus sonhos a um clique de distância
            </p>
          </div>
          <Image
            src={CarImage}
            alt="Tesla"
            height={550}
            className="absolute -bottom-52 right-1"
          />
        </div>
      </div>
    </main>
  )
}
