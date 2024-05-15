'use server'

import { api } from '../data/api'
import { Metadata } from '../data/types/metadata'
import { Model } from '../data/types/model'

type ResponseData = {
  models: Model[]
  meta?: Metadata
  statusCode: number
  message: string
}

interface RequestParams {
  page?: number
  perPage?: number
  brandId?: string
}

export async function fetchBrandModels({
  brandId,
  page = 1,
  perPage = 20,
}: RequestParams): Promise<ResponseData> {
  if (!brandId)
    return { models: [], statusCode: 422, message: 'Unprocessable Entity' }

  try {
    const response = await api(
      `api/v1/brands/${brandId}/models?page=${page}&per_page=${perPage}`,
      {
        next: {
          tags: [`Brand:${brandId}:models`],
          revalidate: 60 * 60 * 1,
        },
      },
    ).then((res) => res.json())

    if (response.status === 200) {
      return {
        models: response.data.models,
        meta: response.data.meta,
        statusCode: response.status,
        message: 'OK',
      }
    } else {
      return {
        statusCode: response.status,
        message: response.message,
        models: [],
      }
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, message: 'Internal Server Error', models: [] }
  }
}
