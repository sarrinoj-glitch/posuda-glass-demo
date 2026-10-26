import Link from "next/link"

export function SiteFooter({ base }: { base: "/b" | "/c" }) {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="wrap grid gap-8 py-10 text-sm md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-2">
          <span className="font-display text-2xl">GLASS</span>
          <p className="max-w-sm text-muted-foreground">
            Стеклянная посуда на золотой и серебристой ножке для праздничного стола. Турция и Китай.
          </p>
          <p className="text-xs text-muted-foreground">ИП Джемиев Ш. Ш. Реквизиты и телефон владельца подставим в рабочей версии.</p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Покупателям">
          <span className="font-medium">Покупателям</span>
          {base === "/b" ? (
            <>
              <Link href="/b/catalog/" className="text-muted-foreground hover:text-foreground">Каталог</Link>
              <Link href="/b/#delivery" className="text-muted-foreground hover:text-foreground">Доставка и оплата</Link>
              <Link href="/b/#reviews" className="text-muted-foreground hover:text-foreground">Отзывы</Link>
            </>
          ) : (
            <>
              <Link href="/c/#sets" className="text-muted-foreground hover:text-foreground">Наборы</Link>
              <Link href="/c/#gift" className="text-muted-foreground hover:text-foreground">Подарок</Link>
              <Link href="/c/#faq" className="text-muted-foreground hover:text-foreground">Вопросы</Link>
            </>
          )}
        </nav>
        <nav className="flex flex-col gap-2" aria-label="Ещё">
          <span className="font-medium">Ещё</span>
          <a
            href="https://www.wildberries.ru/seller/250096444"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Магазин на Wildberries
          </a>
          {base === "/c" && (
            <Link href="/c/business/" className="text-muted-foreground hover:text-foreground">Для бизнеса</Link>
          )}
          <Link href="/" className="text-muted-foreground hover:text-foreground">Сравнение вариантов сайта</Link>
        </nav>
      </div>
    </footer>
  )
}
