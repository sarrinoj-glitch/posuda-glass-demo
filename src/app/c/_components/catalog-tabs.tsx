"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductImage } from "@/components/shared/product-image"
import { categories, products } from "@/lib/catalog"
import { rub } from "@/lib/utils"
import { OrderButtons } from "./order-buttons"

export function CatalogTabs() {
  return (
    <Tabs defaultValue="stands" className="gap-6">
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <TabsList className="h-auto w-max bg-muted p-1">
          {categories.map((c) => (
            <TabsTrigger key={c.id} value={c.id} className="px-3 py-1.5">
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {categories.map((c) => (
        <TabsContent key={c.id} value={c.id}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {products
              .filter((p) => p.category === c.id)
              .map((p) => (
                <article key={p.id} className="flex flex-col gap-3">
                  <Link href={`/c/product/${p.id}/`} className="block overflow-hidden rounded-lg">
                    <ProductImage id={p.id} alt={p.name} />
                  </Link>
                  <div className="flex flex-1 flex-col gap-1">
                    <Link href={`/c/product/${p.id}/`} className="text-sm leading-snug hover:underline">
                      {p.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{p.sizeLabel}</span>
                    <span className="mt-auto pt-1 text-lg font-semibold tabular">{rub(p.price)}</span>
                  </div>
                  <OrderButtons id={p.id} name={p.name} />
                </article>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
