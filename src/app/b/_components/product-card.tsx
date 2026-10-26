import Link from "next/link"
import type { Product } from "@/lib/catalog"
import { ProductImage } from "@/components/shared/product-image"
import { Rating } from "@/components/shared/rating"
import { rub } from "@/lib/utils"
import { AddToCart } from "./add-to-cart"

export function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  return (
    <article className="group flex flex-col gap-3">
      <Link href={`/b/product/${product.id}/`} className="block overflow-hidden rounded-lg">
        <ProductImage id={product.id} alt={product.name} eager={eager} className="transition-transform duration-300 group-hover:scale-[1.02]" />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5">
        <Rating product={product} />
        <Link href={`/b/product/${product.id}/`} className="text-sm leading-snug hover:underline">
          {product.name}
        </Link>
        <span className="text-xs text-muted-foreground">{product.sizeLabel}</span>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-lg font-semibold tabular">{rub(product.price)}</span>
          <AddToCart id={product.id} name={product.name} compact />
        </div>
      </div>
    </article>
  )
}
