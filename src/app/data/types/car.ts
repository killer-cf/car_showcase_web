export type Car = {
  id: string
  name: string
  year: number
  brand: string
  model: string
  price: number
  km: number
  used: boolean
  created_at: string
  images: {
    id: string
    url: string
  }[]
}
