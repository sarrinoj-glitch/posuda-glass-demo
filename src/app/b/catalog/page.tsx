import { Suspense } from "react"
import { CatalogView } from "./catalog-view"

export const metadata = { title: "Каталог — GLASS" }

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogView />
    </Suspense>
  )
}

function CatalogSkeleton() {
  return (
    <div className="wrap py-10" aria-busy="true" aria-label="Загружаем каталог">
      <div className="mb-8 h-10 w-48 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-square animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
