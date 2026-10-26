"use client"

import { MessageCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { linesTotal, resolveLine, useCart, type Gift, type Line } from "@/components/store/cart"
import { Qty } from "@/components/shared/qty"
import { asset, rub, waLink } from "@/lib/utils"

export function orderMessage(lines: Line[], gift: Gift) {
  const rows = lines
    .map((l) => {
      const r = resolveLine(l.key)
      if (!r) return null
      const detail = r.kind === "set" ? ` (${r.subtitle})` : ""
      return `• ${r.title}${detail} × ${l.qty} — ${rub(r.unit * l.qty)}`
    })
    .filter(Boolean)
  const parts = ["Здравствуйте! Хочу заказать:", ...rows, `Итого: ${rub(linesTotal(lines))}`]
  if (gift.wrap) parts.push(`Упаковать в подарок${gift.card.trim() ? `, текст открытки: «${gift.card.trim()}»` : ""}`)
  parts.push("Город доставки: ")
  return parts.join("\n")
}

export function OrderSheet() {
  const { lines, setQty, remove, gift } = useCart()
  const total = linesTotal(lines)

  return (
    <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="font-display text-2xl">Мой заказ</SheetTitle>
        <SheetDescription>
          Отправьте список в WhatsApp. Менеджер подтвердит наличие, посчитает доставку и пришлёт ссылку на оплату.
        </SheetDescription>
      </SheetHeader>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col gap-3 px-4 text-sm text-muted-foreground">
          <p>Пока пусто. Добавьте готовый набор или соберите стол из отдельных вещей.</p>
          <p>Одну вещь быстрее купить на Wildberries: кнопка есть у каждого товара.</p>
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
                  <span className="text-sm leading-snug">{r.title}</span>
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
          {gift.wrap && (
            <li className="rounded-md border border-dashed border-brass-soft p-3 text-sm">
              Упакуем в подарок{gift.card.trim() ? `, открытка: «${gift.card.trim()}»` : ""}
            </li>
          )}
        </ul>
      )}

      {lines.length > 0 && (
        <SheetFooter className="border-t">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Итого без доставки</span>
            <span className="text-lg font-semibold tabular">{rub(total)}</span>
          </div>
          <Button asChild size="lg">
            <a href={waLink(orderMessage(lines, gift))} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Отправить заказ в WhatsApp
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">Демо: номер владельца не подставлен, WhatsApp предложит выбрать чат.</p>
        </SheetFooter>
      )}
    </SheetContent>
  )
}
