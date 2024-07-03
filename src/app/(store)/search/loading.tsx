'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Skeleton } from '@/components/skeleton'

export default function SearchLoading() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<div>Carregando</div>}>
        <p className="text-sm">
          Resultados para: <span className="font-semibold">{query}</span>
        </p>
      </Suspense>
      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[320px]" />
        <Skeleton className="h-[320px]" />
        <Skeleton className="h-[320px]" />
        <Skeleton className="h-[320px]" />
        <Skeleton className="h-[320px]" />
        <Skeleton className="h-[320px]" />
        <Skeleton className="h-[320px]" />
      </div>
    </div>
  )
}
