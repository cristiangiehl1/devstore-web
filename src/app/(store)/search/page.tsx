import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { api } from '@/data/api'
import { Product } from '@/data/types/products'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProdutcs(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    // next: {
    //   revalidate: 60 * 60,
    // },
    cache: 'no-store',
  })

  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProdutcs(query)

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<div>Carregando</div>}>
        <p className="text-sm">
          Resultados para: <span className="font-semibold">{query}</span>
        </p>
      </Suspense>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
            >
              <Image
                src={product.image}
                alt=""
                width={320}
                height={320}
                quality={100}
                className="transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-28 right-8 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="truncate text-sm">{product.title}</span>
                <span className="flex h-full w-max items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
