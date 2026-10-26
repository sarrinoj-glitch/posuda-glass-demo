"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/components/store/cart"
import { getProduct, photo } from "@/lib/catalog"
import { SET_DISCOUNT } from "@/lib/sets"
import { asset, plural, rub } from "@/lib/utils"

// Adapted from 21st.dev «Plan Add-on Selector» (cnippet-dev): checkbox rows with a live total,
// here turned into «собери свой стол» with the set discount from three pieces.

const groups: { title: string; ids: string[] }[] = [
  { title: "Центр стола", ids: ["831189565", "787326583", "846029415", "785572732", "778118975"] },
  { title: "К чаю", ids: ["832504458", "845919844", "1162398207", "780286917"] },
  { title: "Мелочи", ids: ["1280101349", "787375072", "784711627", "963598768"] },
]

export function TableBuilder() {
  const { add } = useCart()
  const [selected, setSelected] = React.useState<string[]>(["831189565", "845919844", "780286917"])

  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const full = selected.reduce((s, id) => s + (getProduct(id)?.price ?? 0), 0)
  const discounted = selected.length >= 3
  const total = discounted ? Math.round((full * (1 - SET_DISCOUNT)) / 10) * 10 : full
  const toDiscount = 3 - selected.length

  function addTable() {
    add(`c:${selected.join(".")}`)
    toast.success("Стол добавлен в заказ", {
      description: `${selected.length} ${plural(selected.length, "предмет", "предмета", "предметов")} за ${rub(total)}`,
    })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="flex flex-col gap-6">
        {groups.map((g) => (
          <fieldset key={g.title} className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium text-muted-foreground">{g.title}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {g.ids.map((id) => {
                const p = getProduct(id)!
                const checked = selected.includes(id)
                return (
                  <label
                    key={id}
                    htmlFor={`tb-${id}`}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-2.5 pr-3 transition-colors hover:bg-accent/50 has-[[data-state=checked]]:border-primary"
                  >
                    <Checkbox id={`tb-${id}`} checked={checked} onCheckedChange={() => toggle(id)} className="ml-1" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(photo(id, "cover"))} alt="" width={56} height={56} loading="lazy" className="size-14 shrink-0 rounded-md bg-well object-cover" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm leading-snug">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.sizeLabel}</span>
                    </span>
                    <span className="text-sm font-medium tabular">{rub(p.price)}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex flex-col gap-4 self-start rounded-xl border bg-card p-5 lg:sticky lg:top-24">
        <p className="font-display text-2xl font-semibold">Ваш стол</p>
        {selected.length === 0 ? (
          <p className="text-sm text-muted-foreground">Отметьте вещи слева. От трёх предметов цена как за набор, на 10% ниже.</p>
        ) : (
          <div className="flex flex-wrap gap-2" aria-label="Выбрано">
            {selected.map((id) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={id} src={asset(photo(id, "cover"))} alt={getProduct(id)?.name ?? ""} width={48} height={48} className="size-12 rounded-md bg-well object-cover" />
            ))}
          </div>
        )}
        <dl className="flex flex-col gap-1.5 border-t pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">
              {selected.length} {plural(selected.length, "предмет", "предмета", "предметов")}
            </dt>
            <dd className="tabular">{rub(full)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Скидка за комплект</dt>
            <dd className={discounted ? "text-success tabular" : "text-xs text-muted-foreground"}>
              {discounted ? `−${rub(full - total)}` : `ещё ${toDiscount} ${plural(toDiscount, "предмет", "предмета", "предметов")}`}
            </dd>
          </div>
          <div className="mt-1 flex items-baseline justify-between border-t pt-3">
            <dt className="font-medium">Итого</dt>
            <dd className="text-xl font-semibold tabular">{rub(total)}</dd>
          </div>
        </dl>
        <Button size="lg" disabled={selected.length === 0} onClick={addTable}>
          <Plus />
          Добавить стол в заказ
        </Button>
      </div>
    </div>
  )
}
