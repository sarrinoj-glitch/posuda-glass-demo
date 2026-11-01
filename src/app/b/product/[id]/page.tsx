import Link from "next/link"
import { notFound } from "next/navigation"
import { Box, Truck } from "lucide-react"
import { Gallery } from "@/components/shared/gallery"
import { Rating } from "@/components/shared/rating"
import { SizeCompare } from "@/components/shared/size-compare"
import { Specs } from "@/components/shared/specs"
import { categoryName, getProduct, products } from "@/lib/catalog"
import { rub } from "@/lib/utils"
import { ProductReviews } from "@/components/shared/product-reviews"
import { StickyBar } from "@/components/shared/sticky-bar"
import { reviewsFor } from "@/lib/reviews"
import { AddToCart } from "../../_components/add-to-cart"
import { ProductCard } from "../../_components/product-card"
import { BuyBox } from "./buy-box"
import { RecentlyViewed } from "./recent"

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = getProduct(id)
  return { title: p ? `${p.name} — GLASS` : "GLASS" }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.category !== product.category && p.hit))
    .slice(0, 4)

  return (
    <div className="wrap pt-8 pb-28 md:pb-8">
      <nav aria-label="Навигация" className="mb-6 text-xs text-muted-foreground">
        <Link href="/b/" className="hover:text-foreground">Главная</Link>
        {" / "}
        <Link href={`/b/catalog/?cat=${product.category}`} className="hover:text-foreground">
          {categoryName(product.category)}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <Gallery id={product.id} count={product.photos} name={product.name} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Rating product={product} />
            <h1 className="font-display text-4xl leading-tight font-semibold md:text-5xl">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.sizeLabel}</p>
          </div>

          <p className="text-3xl font-semibold tabular">{rub(product.price)}</p>

          <BuyBox id={product.id} name={product.name} price={product.price} />

          <ul className="flex flex-col gap-3 rounded-lg border bg-card p-4 text-sm">
            <li className="flex gap-3">
              <Truck className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              <span>СДЭК или Почтой по России. Срок и стоимость — при оформлении, от 5 000 ₽ бесплатно.</span>
            </li>
            <li className="flex gap-3">
              <Box className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              <span>Пакуем отдельно. Если приедет разбитым, пришлите фото — отправим замену.</span>
            </li>
          </ul>

          <section aria-labelledby="size-h" className="flex flex-col gap-3">
            <h2 id="size-h" className="font-medium">Какого это размера</h2>
            <SizeCompare product={product} />
          </section>

          <section aria-labelledby="about-h" className="flex flex-col gap-3">
            <h2 id="about-h" className="font-medium">О товаре</h2>
            <p className="text-sm leading-relaxed">{product.text}</p>
            <Specs product={product} />
          </section>
        </div>
      </div>

      <div className="mt-16">
        <ProductReviews data={reviewsFor(product.id)} rating={product.rating} total={product.reviews} />
      </div>

      <section className="mt-16" aria-labelledby="rel-h">
        <h2 id="rel-h" className="mb-6 font-display text-3xl font-semibold">С этим смотрят</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <RecentlyViewed id={product.id} />

      <StickyBar price={product.price} name={product.name}>
        <AddToCart id={product.id} name={product.name} />
      </StickyBar>
    </div>
  )
}
