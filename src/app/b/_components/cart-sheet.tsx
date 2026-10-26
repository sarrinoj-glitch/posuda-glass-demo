"use client"

import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { linesTotal, resolveLine, useCart } from "@/components/store/cart"
import { Qty } from "@/components/shared/qty"
import { asset, rub } from "@/lib/utils"

const FREE_FROM = 5000

export function CartSheet({ onNavigate }: { onNavigate: () => void }) {
  const { lines, setQty, remove } = useCart()
  const total = linesTotal(lines)
  const left = FREE_FROM - total

  return (
    <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="font-display text-2xl">Корзина</SheetTitle>
        <SheetDescription>
          {lines.length === 0
            ? "Здесь появятся товары, которые вы добавите."
            : left > 0
              ? `До бесплатной доставки осталось ${rub(left)}`
              : "Доставка будет бесплатной"}
        </SheetDescription>
      </SheetHeader>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-start gap-4 px-4">
          <p className="text-sm text-muted-foreground">
            Корзина пустая. Начните с хитов: рулетница на золотых ножках и гранёные кружки покупают чаще всего.
          </p>
          <Button asChild onClick={onNavigate}>
            <Link href="/b/catalog/">Перейти в каталог</Link>
          </Button>
        </div>
      ) : (
        <ul className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          {lines.map((l) => {
            const r = resolveLine(l.key)
            if (!r) return null
            return (
              <li key={l.key} className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(r.image)} alt="" width={72} height={72} className="size-18 shrink-0 rounded-md bg-well object-cover" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Link href={`/b/product/${r.id}/`} onClick={onNavigate} className="text-sm leading-snug hover:underline">
                    {r.title}
                  </Link>
                  <span className="text-xs text-muted-foreground">{r.subtitle}</span>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <Qty value={l.qty} onChange={(n) => setQty(l.key, n)} label={r.title} />
                    <span className="text-sm font-medium tabular">{rub(r.unit * l.qty)}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm" aria-label={`Удалить ${r.title}`} onClick={() => remove(l.key)}>
                  <Trash2 />
                </Button>
              </li>
            )
          })}
        </ul>
      )}

      {lines.length > 0 && (
        <SheetFooter className="border-t">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Товары</span>
            <span className="text-lg font-semibold tabular">{rub(total)}</span>
          </div>
          <Button asChild size="lg" onClick={onNavigate}>
            <Link href="/b/checkout/">Оформить заказ</Link>
          </Button>
        </SheetFooter>
      )}
    </SheetContent>
  )
}
