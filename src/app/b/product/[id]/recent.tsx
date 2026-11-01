"use client"

import * as React from "react"
import { rememberViewed } from "@/components/store/favorites"
import { getProduct } from "@/lib/catalog"
import { ProductCard } from "../../_components/product-card"

/** Remembers this product and shows the last ones the visitor opened. Hidden on the first visit. */
export function RecentlyViewed({ id }: { id: string }) {
  const [ids, setIds] = React.useState<string[]>([])

  React.useEffect(() => {
    setIds(rememberViewed(id).slice(0, 4))
  }, [id])

  if (ids.length === 0) return null
  return (
    <section className="mt-16" aria-labelledby="recent-h">
      <h2 id="recent-h" className="mb-6 font-display text-3xl font-semibold">Вы недавно смотрели</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {ids.map((x) => {
          const p = getProduct(x)
          return p ? <ProductCard key={x} product={p} /> : null
        })}
      </div>
    </section>
  )
}
