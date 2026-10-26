import Link from "next/link"
import { ArrowUpRight, Cake, Camera, MessageCircle, PackageOpen, Building2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ProductImage } from "@/components/shared/product-image"
import { getProduct, photo, reviews } from "@/lib/catalog"
import { setCount, setPrice, sets } from "@/lib/sets"
import { asset, plural, rub } from "@/lib/utils"
import { AddSetButton } from "./_components/order-buttons"
import { CatalogTabs } from "./_components/catalog-tabs"
import { GiftBlock } from "./_components/gift-block"
import { TableBuilder } from "./_components/table-builder"

// Hero: three pieces standing on one baseline, like a laid table.
const heroTable = [
  { id: "831189565", label: "рулетница, 30 см", w: "w-[46%]" },
  { id: "846029415", label: "блюдо, 30 см", w: "w-[32%]" },
  { id: "845919844", label: "лимонницы, 11 см", w: "w-[22%]" },
]

const faq = [
  {
    q: "Как оплатить заказ?",
    a: "Отправляете список в WhatsApp, менеджер подтверждает наличие и сумму доставки, затем присылает ссылку на оплату картой или по СБП.",
  },
  {
    q: "Можно купить одну вещь?",
    a: "Да. Одну вещь проще всего взять на Wildberries: у каждого товара есть кнопка «На WB», доставка в ваш пункт выдачи.",
  },
  {
    q: "Что будет, если стекло разобьётся в дороге?",
    a: "Сфотографируйте посылку при получении и пришлите фото в WhatsApp. Отправим замену за наш счёт.",
  },
  {
    q: "Работаете с кондитерами и банкетными залами?",
    a: "Да, есть оптовые условия и счёт для ИП и юрлиц. Напишите, что и сколько нужно, на странице «Для бизнеса».",
  },
  {
    q: "Куда доставляете?",
    a: "По всей России через СДЭК и Почту. Срок и стоимость менеджер назовёт вместе с подтверждением заказа.",
  },
]

export default function BoutiqueHome() {
  return (
    <>
      <section className="wrap grid gap-10 pt-10 pb-14 md:grid-cols-[0.9fr_1.1fr] md:items-end md:pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-5xl leading-[0.95] font-semibold md:text-7xl">Праздничный стол одним заказом</h1>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            Готовые наборы стеклянной посуды на золотой ножке, упаковка в подарок и опт для кондитеров. Одну вещь можно
            купить на Wildberries.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#sets">Выбрать набор</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-card">
              <a href="https://www.wildberries.ru/seller/250096444" target="_blank" rel="noopener noreferrer">
                Магазин на Wildberries
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
        <figure className="flex flex-col gap-2">
          <div className="flex items-end gap-2 border-b-2 border-brass-soft pb-2">
            {heroTable.map((t) => (
              <div key={t.id} className={`${t.w} flex flex-col gap-1.5`}>
                <ProductImage id={t.id} alt={getProduct(t.id)!.name} eager className="rounded-lg" />
                <span className="text-[11px] text-muted-foreground">{t.label}</span>
              </div>
            ))}
          </div>
          <figcaption className="text-xs text-muted-foreground">Рулетница, фарфоровое блюдо и лимонницы входят в наборы ниже.</figcaption>
        </figure>
      </section>

      <section id="sets" className="scroll-mt-20 border-y bg-card py-14" aria-labelledby="sets-h">
        <div className="wrap flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 id="sets-h" className="font-display text-4xl font-semibold md:text-5xl">Готовые наборы</h2>
            <p className="max-w-xl text-muted-foreground">
              Вещи подобраны так, чтобы стояли рядом. В наборе на 10% дешевле, чем по отдельности.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sets.map((s) => {
              const { full, price, save } = setPrice(s)
              return (
                <article key={s.id} className="flex flex-col gap-4 rounded-xl border bg-background p-4">
                  <div className="grid grid-cols-2 gap-1.5">
                    {s.items.slice(0, 4).map((it) => (
                      <ProductImage key={it.id} id={it.id} alt="" className="rounded-md" />
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-2xl font-semibold">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.forWhat}</p>
                  </div>
                  <ul className="flex flex-col gap-1 text-sm">
                    {s.items.map((it) => {
                      const p = getProduct(it.id)!
                      return (
                        <li key={it.id} className="flex justify-between gap-3">
                          <Link href={`/c/product/${p.id}/`} className="hover:underline">
                            {p.name.split(",")[0]}
                            {it.qty > 1 ? ` × ${it.qty}` : ""}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="mt-auto flex flex-col gap-3 border-t pt-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-2xl font-semibold tabular">{rub(price)}</span>
                      <span className="text-xs text-muted-foreground tabular">
                        отдельно {rub(full)}, выгода {rub(save)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {setCount(s)} {plural(setCount(s), "предмет", "предмета", "предметов")}
                    </span>
                    <AddSetButton setId={s.id} name={s.name} />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="builder" className="wrap scroll-mt-20 py-16" aria-labelledby="builder-h">
        <div className="mb-8 flex flex-col gap-2">
          <h2 id="builder-h" className="font-display text-4xl font-semibold md:text-5xl">Соберите свой стол</h2>
          <p className="max-w-xl text-muted-foreground">
            Отметьте нужные вещи. От трёх предметов цена считается как за набор.
          </p>
        </div>
        <TableBuilder />
      </section>

      <section id="gift" className="scroll-mt-20 border-y bg-card py-16" aria-labelledby="gift-h">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <h2 id="gift-h" className="font-display text-4xl font-semibold md:text-5xl">В подарок</h2>
            <p className="text-muted-foreground">
              На Wildberries покупают в подарок маме, подруге и коллеге. Здесь можно добавить упаковку и открытку с вашими
              словами, и вещь приедет готовой к вручению.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(photo("778118975", "cover"))}
              alt="Конфетница на литой ножке с конфетами"
              loading="lazy"
              width={720}
              height={720}
              className="aspect-[4/3] w-full rounded-lg bg-well object-cover"
            />
          </div>
          <GiftBlock />
        </div>
      </section>

      <section id="catalog" className="wrap scroll-mt-20 py-16" aria-labelledby="cat-h">
        <div className="mb-8 flex flex-col gap-2">
          <h2 id="cat-h" className="font-display text-4xl font-semibold md:text-5xl">Каталог</h2>
          <p className="max-w-xl text-muted-foreground">
            «В заказ» — добавить к набору и отправить нам. «На WB» — купить одну вещь на Wildberries.
          </p>
        </div>
        <CatalogTabs />
      </section>

      <section className="bg-ink py-16 text-ink-foreground" aria-labelledby="how-h">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 id="how-h" className="font-display text-4xl font-semibold md:text-5xl">Как заказать</h2>
            <ol className="flex flex-col gap-5">
              {[
                ["Выберите набор или соберите стол", "Можно добавить подарочную упаковку и открытку."],
                ["Отправьте заказ в WhatsApp", "Список и сумма составятся сами, останется написать город."],
                ["Получите подтверждение", "Менеджер проверит наличие, посчитает доставку и пришлёт ссылку на оплату."],
                ["Заберите в СДЭК или на почте", "Каждую вещь пакуем отдельно."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-3xl leading-none text-brass-soft tabular">{i + 1}</span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-medium">{t}</span>
                    <span className="text-sm opacity-75">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-5 rounded-xl border border-white/15 p-6">
            <Camera className="size-6 text-brass-soft" aria-hidden />
            <h3 className="font-display text-3xl font-semibold">Если приедет разбитым</h3>
            <p className="opacity-80">
              Стекло иногда бьётся в дороге, в отзывах на маркетплейсе это самая частая жалоба. Сфотографируйте посылку при получении и
              пришлите фото в WhatsApp. Отправим замену без возврата через пункт выдачи.
            </p>
            <p className="text-sm opacity-60">Упаковку отдельно хвалят в 30 отзывах на Wildberries.</p>
          </div>
        </div>
      </section>

      <section className="wrap py-16" aria-labelledby="biz-h">
        <h2 id="biz-h" className="mb-8 font-display text-4xl font-semibold md:text-5xl">Для бизнеса</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/c/business/" className="group flex flex-col gap-3 rounded-xl border bg-card p-6 hover:border-primary">
            <Cake className="size-6 text-brass" aria-hidden />
            <span className="font-display text-2xl font-semibold">Кондитерам</span>
            <span className="text-sm text-muted-foreground">Блюда и рулетницы на ножке для подачи и фото тортов, рулетов, бенто.</span>
          </Link>
          <Link href="/c/business/" className="group flex flex-col gap-3 rounded-xl border bg-card p-6 hover:border-primary">
            <Building2 className="size-6 text-brass" aria-hidden />
            <span className="font-display text-2xl font-semibold">Банкетным залам и кафе</span>
            <span className="text-sm text-muted-foreground">Одинаковые позиции партиями, допоставка того же артикула.</span>
          </Link>
          <Link href="/c/business/" className="group flex flex-col gap-3 rounded-xl border bg-card p-6 hover:border-primary">
            <PackageOpen className="size-6 text-brass" aria-hidden />
            <span className="font-display text-2xl font-semibold">Оформителям и прокату</span>
            <span className="text-sm text-muted-foreground">Сладкие столы и кэнди-бары, посуда для проката на свадьбы.</span>
          </Link>
        </div>
      </section>

      <section className="border-y bg-card py-16" aria-labelledby="rev-h">
        <div className="wrap">
          <h2 id="rev-h" className="mb-8 font-display text-4xl font-semibold md:text-5xl">Отзывы с Wildberries</h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name + r.productId} className="flex flex-col gap-3 border-t border-brass-soft pt-4">
                <blockquote className="font-display text-xl leading-snug">«{r.text}»</blockquote>
                <figcaption className="text-xs text-muted-foreground">
                  {r.name}, {r.date} · {getProduct(r.productId)!.name.split(",")[0]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="wrap grid scroll-mt-20 gap-10 py-16 md:grid-cols-[0.8fr_1.2fr]" aria-labelledby="faq-h">
        <div className="flex flex-col gap-4">
          <h2 id="faq-h" className="font-display text-4xl font-semibold md:text-5xl">Вопросы</h2>
          <p className="text-muted-foreground">Не нашли ответ — напишите, ответит живой человек.</p>
          <Button asChild variant="outline" className="self-start bg-card">
            <a href="https://wa.me/?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!" target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Написать в WhatsApp
            </a>
          </Button>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`}>
              <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}
