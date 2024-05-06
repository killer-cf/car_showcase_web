'use server'

import { api } from '../api'
import { Brand } from '../types/brand'
import { Metadata } from '../types/metadata'

export type ResponseData = {
  brands: Brand[]
  meta?: Metadata
  statusCode: number
  message: string
}

export async function fetchBrands(): Promise<ResponseData> {
  try {
    const response = await api(`api/v1/brands`, {
      next: {
        revalidate: 60 * 60 * 24,
        tags: ['Brands'],
      },
    }).then((res) => res.json())

    if (response.status === 200) {
      return {
        brands: response.data.brands,
        statusCode: response.status,
        message: 'OK',
      }
    } else {
      return {
        statusCode: response.status,
        message: response.message,
        brands: [],
      }
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, message: 'Internal Server Error', brands: [] }
  }
}
