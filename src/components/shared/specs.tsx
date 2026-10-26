import type { Product } from "@/lib/catalog"
import { categoryName } from "@/lib/catalog"

export function Specs({ product }: { product: Product }) {
  const rows: [string, string][] = [
    ["Категория", categoryName(product.category)],
    ["Размер", product.sizeLabel],
    ["Материал", product.material],
  ]
  if (product.legs) rows.push(["Ножка", product.legs])
  if (product.pieces) rows.push(["В наборе", `${product.pieces} шт.`])
  if (product.volume) rows.push(["Объём", `${product.volume} мл`])
  if (product.care) rows.push(["Уход", product.care === "hand" ? "ручная мойка, не для микроволновки" : "можно в посудомоечную машину"])
  if (product.country) rows.push(["Страна", product.country])

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted-foreground">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}
