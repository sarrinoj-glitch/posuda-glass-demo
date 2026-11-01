"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/store/cart"
import { useFavorites } from "@/components/store/favorites"
import { getProduct } from "@/lib/catalog"
import { plural, rub } from "@/lib/utils"
import { ProductCard } from "../_components/product-card"

export function FavoritesView() {
  const { ids, ready } = useFavorites()
  const { add } = useCart()
  const items = ids.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p)
  const total = items.reduce((s, p) => s + p.price, 0)

  if (!ready) {
    return <div className="wrap py-16" aria-busy="true" />
  }

  if (items.length === 0) {
    return (
      <div className="wrap flex max-w-2xl flex-col items-start gap-5 py-16">
        <Heart className="size-8 text-brass" aria-hidden />
        <h1 className="font-display text-5xl font-semibold">В избранном пусто</h1>
        <p className="text-muted-foreground">
          Нажмите на сердечко на карточке товара, чтобы отложить его и вернуться позже. Удобно, когда выбираете между двумя
          блюдами или собираете стол к празднику.
        </p>
        <Button asChild>
          <Link href="/b/catalog/">Перейти в каталог</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="wrap py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl font-semibold">Избранное</h1>
          <p className="mt-1 text-sm text-muted-foreground tabular">
            {items.length} {plural(items.length, "товар", "товара", "товаров")} на {rub(total)}
          </p>
        </div>
        <Button
          onClick={() => {
            items.forEach((p) => add(`p:${p.id}`))
            toast.success("Всё избранное в корзине", { description: `${items.length} ${plural(items.length, "товар", "товара", "товаров")}` })
          }}
        >
          Добавить всё в корзину
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
