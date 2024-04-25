import { api } from '../api'
import { Car } from '../types/car'
import { Metadata } from '../types/metadata'

type ResponseData = {
  cars?: Car[]
  meta?: Metadata
  statusCode: number
  message: string
}

export async function fetchCars(
  page: number,
  perPage: number,
): Promise<ResponseData> {
  try {
    const response = await api(
      `api/v1/cars?page=${page}&per_page=${perPage}`,
    ).then((res) => res.json())

    if (response.status === 200) {
      return {
        cars: response.data.cars,
        meta: response.data.meta,
        statusCode: response.status,
        message: 'OK',
      }
    } else {
      return { statusCode: response.status, message: response.message }
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, message: 'Internal Server Error' }
  }
}
