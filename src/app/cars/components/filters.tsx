import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getPrices } from '@/utils/get-prices'
import { getYears } from '@/utils/get-years'

import KmFilter from './km-filter'
import { ModelsFilter } from './models-filter'
import { Tag } from './tag'

export function Filters() {
  return (
    <div className="flex flex-col border max-w-[300px]">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg">132 anúncios</span>
          <Button variant="ghost" size="sm" className="text-lg text-primary">
            Limpar
          </Button>
        </div>
        <div className="flex mt-6 flex-wrap max-w-[300px]">
          <Tag title="Tesla" />
          <Tag title="Model S" />
          <Tag title="Cybertruck" />
        </div>
      </div>
      <div className="bg-gray-200 px-4 py-6">
        <div className="text-primary flex flex-col">
          <div className="flex">
            <Select>
              <SelectTrigger className="text-black rounded-none rounded-tl-md bg-background">
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
                  Sergipe
                </SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="text-black rounded-none rounded-tr-md bg-background">
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={'id-aqui'} value={'id-aqui'}>
                  Recife
                </SelectItem>
                <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                  Petrolina
                </SelectItem>
                <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                  Olinda
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <SelectTrigger className="text-black rounded-none rounded-b-md bg-background">
              <SelectValue placeholder="Fabricante" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={'id-aqui'} value={'id-aqui'}>
                Tesla
              </SelectItem>
              <SelectItem key={'id-aqui-1'} value={'id-aqui-1'}>
                Ford
              </SelectItem>
              <SelectItem key={'id-aqui-2'} value={'id-aqui-2'}>
                Toyota
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Tesla models</p>
        <ModelsFilter />
      </div>

      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Preço</p>
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="text-black bg-background">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={'no-limit'} value={'no-limit'}>
                Sem limite
              </SelectItem>
              {getPrices().map((price) => (
                <SelectItem key={price} value={price}>
                  {price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="text-black bg-background">
              <SelectValue placeholder="Max" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={'no-limit'} value={'no-limit'}>
                Sem limite
              </SelectItem>
              {getPrices().map((price) => (
                <SelectItem key={price} value={price}>
                  {price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <KmFilter />

      <div className="px-4 py-6 border-b-2">
        <p className="mb-4">Ano</p>
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="text-black bg-background">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {getYears().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="text-black bg-background">
              <SelectValue placeholder="Max" />
            </SelectTrigger>
            <SelectContent>
              {getYears().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
