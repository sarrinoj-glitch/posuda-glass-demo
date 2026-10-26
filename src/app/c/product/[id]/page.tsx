import Link from "next/link"
import { notFound } from "next/navigation"
import { Camera, Gift } from "lucide-react"
import { Gallery } from "@/components/shared/gallery"
import { ProductImage } from "@/components/shared/product-image"
import { Rating } from "@/components/shared/rating"
import { SizeCompare } from "@/components/shared/size-compare"
import { Specs } from "@/components/shared/specs"
import { getProduct, products } from "@/lib/catalog"
import { setPrice, sets } from "@/lib/sets"
import { rub } from "@/lib/utils"
import { AddSetButton, OrderButtons } from "../../_components/order-buttons"

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = getProduct(id)
  return { title: p ? `${p.name} — GLASS` : "GLASS" }
}

export default async function BoutiqueProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const inSets = sets.filter((s) => s.items.some((it) => it.id === product.id))

  return (
    <div className="wrap py-8">
      <nav aria-label="Навигация" className="mb-6 text-xs text-muted-foreground">
        <Link href="/c/" className="hover:text-foreground">Главная</Link>
        {" / "}
        <Link href="/c/#catalog" className="hover:text-foreground">Каталог</Link>
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

          <div className="flex flex-col gap-2">
            <OrderButtons id={product.id} name={product.name} size="lg" />
            <p className="text-xs text-muted-foreground">
              «В заказ» — вместе с набором или подарочной упаковкой через WhatsApp. «На WB» — одна вещь с доставкой в пункт
              выдачи Wildberries.
            </p>
          </div>

          <ul className="flex flex-col gap-3 rounded-lg border bg-card p-4 text-sm">
            <li className="flex gap-3">
              <Gift className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              <span>
                Можно упаковать в подарок с открыткой — отметьте на{" "}
                <Link href="/c/#gift" className="underline underline-offset-2">главной</Link>.
              </span>
            </li>
            <li className="flex gap-3">
              <Camera className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              <span>Разбилось в дороге — пришлите фото при получении, отправим замену.</span>
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

      {inSets.length > 0 && (
        <section className="mt-16" aria-labelledby="sets-h">
          <h2 id="sets-h" className="mb-6 font-display text-3xl font-semibold">Входит в наборы</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {inSets.map((s) => {
              const { price, save } = setPrice(s)
              return (
                <article key={s.id} className="flex gap-4 rounded-xl border bg-card p-4">
                  <div className="grid w-32 shrink-0 grid-cols-2 gap-1">
                    {s.items.slice(0, 4).map((it) => (
                      <ProductImage key={it.id} id={it.id} alt="" className="rounded" />
                    ))}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="font-display text-2xl font-semibold">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.forWhat}</p>
                    <p className="text-sm tabular">
                      <span className="text-lg font-semibold">{rub(price)}</span>{" "}
                      <span className="text-muted-foreground">выгода {rub(save)}</span>
                    </p>
                    <div className="mt-auto">
                      <AddSetButton setId={s.id} name={s.name} />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
