import Link from "next/link"
import { Box, CreditCard, PackageCheck, Ruler, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductImage } from "@/components/shared/product-image"
import { categories, getProduct, products, reviews } from "@/lib/catalog"
import type { CategoryId } from "@/lib/catalog"
import { ProductCard } from "./_components/product-card"

const categoryCover: Record<CategoryId, string> = {
  stands: "846029415",
  roll: "831189565",
  menazh: "787326583",
  sweets: "780286917",
  lemon: "952658967",
  tea: "832504458",
  butter: "1280101349",
  boards: "963704973",
}

export default function StoreHome() {
  const hits = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8)

  return (
    <>
      <section className="wrap grid items-center gap-8 py-10 md:grid-cols-[1fr_1.05fr] md:py-14">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-5xl leading-[0.95] font-semibold md:text-7xl">
            Стекло на золотой ножке для праздничного стола
          </h1>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            Блюда, рулетницы, менажницы и конфетницы. Отправляем по всей России, каждую вещь пакуем отдельно и меняем,
            если приедет разбитой.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/b/catalog/">Перейти в каталог</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-card">
              <Link href="#hits">Хиты продаж</Link>
            </Button>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-4 border-t pt-5 text-sm">
            <div>
              <dt className="text-muted-foreground">оценка на WB</dt>
              <dd className="font-display text-3xl font-semibold tabular">4,9</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">продано</dt>
              <dd className="font-display text-3xl font-semibold tabular">4 270</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">позиций</dt>
              <dd className="font-display text-3xl font-semibold tabular">30</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <ProductImage id="831189565" alt="Рулетница на золотых ножках с ягодным рулетом" eager className="rounded-xl" />
          <Link
            href="/b/product/831189565/"
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-lg bg-card/95 p-3 text-sm shadow-sm backdrop-blur sm:right-auto sm:min-w-72"
          >
            <span className="flex flex-col">
              <span className="font-medium">Рулетница на золотых ножках</span>
              <span className="text-xs text-muted-foreground">30 × 15 см · хит, 57 отзывов</span>
            </span>
            <span className="font-semibold tabular">2 093 ₽</span>
          </Link>
        </div>
      </section>

      <section className="wrap py-8" aria-labelledby="cats">
        <h2 id="cats" className="mb-5 font-display text-3xl font-semibold md:text-4xl">Категории</h2>
        <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
          {categories.map((c) => (
            <li key={c.id} className="w-40 shrink-0 snap-start md:w-auto">
              <Link href={`/b/catalog/?cat=${c.id}`} className="group flex flex-col gap-2">
                <ProductImage id={categoryCover[c.id]} alt="" className="rounded-lg transition group-hover:opacity-90" />
                <span className="text-sm font-medium">{c.name}</span>
                <span className="-mt-1.5 text-xs text-muted-foreground">{c.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="hits" className="wrap scroll-mt-28 py-10" aria-labelledby="hits-h">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="hits-h" className="font-display text-3xl font-semibold md:text-4xl">Хиты продаж</h2>
          <Link href="/b/catalog/" className="text-sm text-primary hover:underline">
            Весь каталог
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {hits.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 4} />
          ))}
        </div>
      </section>

      <section className="border-y bg-card py-12" aria-labelledby="why">
        <div className="wrap grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="why" className="font-display text-3xl font-semibold md:text-4xl">
            Почему стекло доезжает целым
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            <li className="flex gap-3">
              <PackageCheck className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="font-medium">Каждая вещь в своей упаковке</p>
                <p className="text-sm text-muted-foreground">Упаковку отдельно хвалят в 30 отзывах на Wildberries.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Box className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="font-medium">Замена разбитого по фото</p>
                <p className="text-sm text-muted-foreground">Сфотографируйте при получении и пришлите нам. Отправим новую вещь.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Ruler className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="font-medium">Размер рядом с телефоном</p>
                <p className="text-sm text-muted-foreground">На каждой странице товара схема в масштабе, чтобы не ошибиться с размером.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Star className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <div>
                <p className="font-medium">Отзывы настоящих покупателей</p>
                <p className="text-sm text-muted-foreground">Рейтинг магазина 4,9 по 801 оценке на Wildberries.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="reviews" className="wrap scroll-mt-28 py-14" aria-labelledby="rev">
        <h2 id="rev" className="mb-6 font-display text-3xl font-semibold md:text-4xl">Что пишут покупатели</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => {
            const p = getProduct(r.productId)!
            return (
              <li key={r.name + r.productId} className="flex flex-col gap-4 rounded-lg border bg-card p-5">
                <p className="text-sm leading-relaxed">«{r.text}»</p>
                <Link href={`/b/product/${p.id}/`} className="mt-auto flex items-center gap-3 border-t pt-4">
                  <ProductImage id={p.id} alt="" className="size-12 shrink-0 rounded-md" />
                  <span className="flex min-w-0 flex-col text-xs">
                    <span className="font-medium text-foreground">
                      {r.name}, {r.date}
                    </span>
                    <span className="truncate text-muted-foreground">{p.name}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">Отзывы перенесены с Wildberries.</p>
      </section>

      <section id="delivery" className="wrap scroll-mt-28 py-6" aria-labelledby="del">
        <h2 id="del" className="mb-6 font-display text-3xl font-semibold md:text-4xl">Доставка и оплата</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border bg-card p-5">
            <Truck className="size-5 text-brass" aria-hidden />
            <p className="font-medium">СДЭК и Почта России</p>
            <p className="text-sm text-muted-foreground">
              Пункт выдачи или курьер. Срок и цену покажем при оформлении. От 5 000 ₽ доставка бесплатная.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-card p-5">
            <CreditCard className="size-5 text-brass" aria-hidden />
            <p className="font-medium">Оплата на сайте</p>
            <p className="text-sm text-muted-foreground">Картой или через СБП. Можно оплатить при получении в пункте выдачи.</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-card p-5">
            <Box className="size-5 text-brass" aria-hidden />
            <p className="font-medium">Если что-то разбилось</p>
            <p className="text-sm text-muted-foreground">Пришлите фото в день получения. Отправим замену или вернём деньги.</p>
          </div>
        </div>
      </section>
    </>
  )
}
