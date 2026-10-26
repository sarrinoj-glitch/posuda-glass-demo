import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductImage } from "@/components/shared/product-image"

const rows: [string, string, string][] = [
  ["Как покупают", "Корзина и оплата на сайте", "Заказ уходит в WhatsApp, одну вещь — на Wildberries"],
  ["Что продаём", "Отдельные товары, как на WB", "Наборы, свой стол из вещей, подарок с открыткой, опт"],
  ["Оплата", "Онлайн-касса и эквайринг с первого дня", "Ссылка на оплату от менеджера, касса потом"],
  ["Доставка", "Интеграция СДЭК и Почты, расчёт на сайте", "Менеджер считает и отправляет сам"],
  ["Что нужно от владельца", "Свой склад, отправки, возвраты, реклама на сайт", "Отвечать в WhatsApp, собирать наборы"],
  ["Конкурирует с WB", "Да, за того же покупателя одной вещи", "Нет, берёт то, чего на WB нет"],
  ["Запуск", "Дольше: касса, оплата, доставка, юр. страницы", "Быстрее: каталог и WhatsApp"],
]

const assumptions = [
  "Цены — цены WB с кошельком на 26.10.2026, товары и фото — из карточек продавца.",
  "Бесплатная доставка от 5 000 ₽, промокод ПЕРВЫЙ (−10%), скидка 10% на наборы, оптовые пороги — примеры, условия задаёт владелец.",
  "Замена разбитого по фото и подарочная упаковка — предложение, их нужно согласовать.",
  "WhatsApp открывается без номера: номер владельца подставим в рабочей версии.",
  "Оплата и отправка заказов не работают, корзина хранится только в вашем браузере.",
  "Отзывы — настоящие, перенесены с Wildberries. Названия переписаны без чужих марок (SMEG, Рогашка).",
]

export default function Compare() {
  return (
    <main className="pb-20">
      <header className="wrap flex flex-col gap-4 pt-12 pb-10 md:pt-16">
        <span className="font-display text-3xl">GLASS</span>
        <h1 className="max-w-3xl font-display text-5xl leading-[0.95] font-semibold md:text-7xl">Два варианта сайта для «Посуда GLASS»</h1>
        <p className="max-w-2xl text-muted-foreground md:text-lg">
          Один и тот же ассортимент из 30 товаров с Wildberries, две разные модели продаж. Откройте оба, пройдите путь
          покупателя до конца и сравните.
        </p>
      </header>

      <section className="wrap grid gap-6 md:grid-cols-2" aria-label="Варианты">
        <article className="flex flex-col gap-5 rounded-2xl border bg-card p-5 md:p-6">
          <div className="grid grid-cols-4 gap-1.5">
            {["831189565", "832504458", "845992505", "963598768"].map((id) => (
              <ProductImage key={id} id={id} alt="" eager className="rounded-md" />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Вариант B</span>
            <h2 className="font-display text-4xl font-semibold">Интернет-магазин</h2>
            <p className="text-muted-foreground">
              Классический магазин: каталог с фильтрами, корзина, оформление с доставкой и оплатой на сайте.
            </p>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li>Главная с хитами и категориями</li>
            <li>Каталог с фильтрами по цене, ножке, уходу</li>
            <li>Товар со схемой размера в масштабе</li>
            <li>Корзина и оформление с промокодом</li>
          </ul>
          <Button asChild size="lg" className="mt-auto self-start">
            <Link href="/b/">
              Открыть вариант B
              <ArrowRight />
            </Link>
          </Button>
        </article>

        <article className="flex flex-col gap-5 rounded-2xl border-2 border-primary bg-card p-5 md:p-6">
          <div className="grid grid-cols-4 gap-1.5">
            {["787326583", "845919844", "846029415", "780286917"].map((id) => (
              <ProductImage key={id} id={id} alt="" eager className="rounded-md" />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-primary">Вариант C · рекомендую</span>
            <h2 className="font-display text-4xl font-semibold">Бутик сервировки</h2>
            <p className="text-muted-foreground">
              Сайт продаёт то, чего нет на WB: готовые наборы, свой стол со скидкой, подарок с открыткой и опт. Одну вещь
              отдаёт на Wildberries.
            </p>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li>Четыре готовых набора из реальных товаров</li>
            <li>Конструктор «Соберите свой стол» с живым итогом</li>
            <li>Подарочная упаковка и превью открытки</li>
            <li>Страница опта с запросом прайса</li>
          </ul>
          <Button asChild size="lg" className="mt-auto self-start">
            <Link href="/c/">
              Открыть вариант C
              <ArrowRight />
            </Link>
          </Button>
        </article>
      </section>

      <section className="wrap mt-16 flex flex-col gap-6" aria-labelledby="diff-h">
        <h2 id="diff-h" className="font-display text-4xl font-semibold">Чем отличаются</h2>
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b bg-muted/60 text-left">
                <th className="w-1/5 p-4 font-medium"> </th>
                <th className="p-4 font-medium">B · Интернет-магазин</th>
                <th className="p-4 font-medium">C · Бутик сервировки</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, b, c]) => (
                <tr key={k} className="border-b last:border-0">
                  <th scope="row" className="p-4 text-left font-medium align-top">{k}</th>
                  <td className="p-4 align-top text-muted-foreground">{b}</td>
                  <td className="p-4 align-top text-muted-foreground">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap mt-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr]" aria-labelledby="demo-h">
        <h2 id="demo-h" className="font-display text-4xl font-semibold">Что в демо условно</h2>
        <ul className="flex flex-col gap-3 text-sm">
          {assumptions.map((a) => (
            <li key={a} className="border-b pb-3 text-muted-foreground last:border-0">
              {a}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
