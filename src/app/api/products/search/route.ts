import type { NextRequest } from 'next/server'
import { z } from 'zod'

import data from '../data.json'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q'))

  const products = data.products.filter((product) => {
    const productTitleLower = product.title.toLowerCase()
    const queryLower = query.toLowerCase()

    return productTitleLower.includes(queryLower)
  })

  return Response.json(products)
}
