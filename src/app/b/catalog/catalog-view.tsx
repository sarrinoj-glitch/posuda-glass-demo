"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { categories, products } from "@/lib/catalog"
import type { CategoryId, Product } from "@/lib/catalog"
import { plural } from "@/lib/utils"
import { ProductCard } from "../_components/product-card"

type PriceBand = "all" | "to700" | "700-1500" | "from1500"
type Legs = "gold" | "silver" | "none"
type Sort = "popular" | "cheap" | "expensive"

const priceBands: { id: PriceBand; label: string; test: (p: number) => boolean }[] = [
  { id: "all", label: "Любая", test: () => true },
  { id: "to700", label: "до 700 ₽", test: (p) => p < 700 },
  { id: "700-1500", label: "700–1 500 ₽", test: (p) => p >= 700 && p <= 1500 },
  { id: "from1500", label: "от 1 500 ₽", test: (p) => p > 1500 },
]

const legOptions: { id: Legs; label: string; test: (p: Product) => boolean }[] = [
  { id: "gold", label: "Золотистая ножка", test: (p) => p.legs === "золотистая" },
  { id: "silver", label: "Серебристая ножка", test: (p) => p.legs === "серебристая" },
  { id: "none", label: "Без металла", test: (p) => !p.legs || p.legs === "стеклянная" },
]

export function CatalogView() {
  const params = useSearchParams()
  const router = useRouter()
  const initialCat = params.get("cat") as CategoryId | null
  const q = (params.get("q") ?? "").trim().toLowerCase()

  const [cats, setCats] = React.useState<CategoryId[]>(initialCat ? [initialCat] : [])
  const [price, setPrice] = React.useState<PriceBand>("all")
  const [legs, setLegs] = React.useState<Legs[]>([])
  const [machine, setMachine] = React.useState(false)
  const [sort, setSort] = React.useState<Sort>("popular")

  React.useEffect(() => {
    setCats(initialCat ? [initialCat] : [])
  }, [initialCat])

  const band = priceBands.find((b) => b.id === price)!
  const list = products
    .filter((p) => (q ? p.name.toLowerCase().includes(q) || p.text.toLowerCase().includes(q) : true))
    .filter((p) => (cats.length ? cats.includes(p.category) : true))
    .filter((p) => band.test(p.price))
    .filter((p) => (legs.length ? legOptions.filter((o) => legs.includes(o.id)).some((o) => o.test(p)) : true))
    .filter((p) => (machine ? p.care === "machine" : true))
    .sort((a, b) => (sort === "cheap" ? a.price - b.price : sort === "expensive" ? b.price - a.price : b.reviews - a.reviews))

  const activeCount = cats.length + legs.length + (price !== "all" ? 1 : 0) + (machine ? 1 : 0)

  function reset() {
    if (q) router.replace("/b/catalog/")
    setCats([])
    setLegs([])
    setPrice("all")
    setMachine(false)
  }

  function toggle<T>(arr: T[], v: T) {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
  }

  const filters = (
    <div className="flex flex-col gap-7 text-sm">
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2 font-medium">Категория</legend>
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <Checkbox id={`cat-${c.id}`} checked={cats.includes(c.id)} onCheckedChange={() => setCats((v) => toggle(v, c.id))} />
            <Label htmlFor={`cat-${c.id}`} className="font-normal">
              {c.name}
            </Label>
          </div>
        ))}
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-medium">Цена</legend>
        <div className="flex flex-wrap gap-2">
          {priceBands.map((b) => (
            <Button
              key={b.id}
              type="button"
              size="sm"
              variant={price === b.id ? "default" : "outline"}
              className={price === b.id ? "" : "bg-card"}
              aria-pressed={price === b.id}
              onClick={() => setPrice(b.id)}
            >
              {b.label}
            </Button>
          ))}
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2 font-medium">Ножка</legend>
        {legOptions.map((o) => (
          <div key={o.id} className="flex items-center gap-2">
            <Checkbox id={`legs-${o.id}`} checked={legs.includes(o.id)} onCheckedChange={() => setLegs((v) => toggle(v, o.id))} />
            <Label htmlFor={`legs-${o.id}`} className="font-normal">
              {o.label}
            </Label>
          </div>
        ))}
      </fieldset>
      <div className="flex items-center gap-2">
        <Checkbox id="machine" checked={machine} onCheckedChange={(v) => setMachine(v === true)} />
        <Label htmlFor="machine" className="font-normal">
          Можно в посудомоечную машину
        </Label>
      </div>
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" className="self-start" onClick={reset}>
          <X />
          Сбросить фильтры
        </Button>
      )}
    </div>
  )

  return (
    <div className="wrap py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">{q ? `Поиск: «${params.get("q")}»` : "Каталог"}</h1>
          <p className="mt-1 text-sm text-muted-foreground tabular">
            {list.length} {plural(list.length, "товар", "товара", "товаров")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="bg-card md:hidden">
                <SlidersHorizontal />
                Фильтры{activeCount > 0 ? ` · ${activeCount}` : ""}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto bg-background">
              <SheetHeader>
                <SheetTitle>Фильтры</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">{filters}</div>
            </SheetContent>
          </Sheet>
          <label htmlFor="sort" className="sr-only">
            Сортировка
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-md border bg-card px-3 text-sm"
          >
            <option value="popular">Сначала популярные</option>
            <option value="cheap">Сначала дешевле</option>
            <option value="expensive">Сначала дороже</option>
          </select>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block" aria-label="Фильтры">
          {filters}
        </aside>
        {list.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-card p-8">
            <p className="font-display text-2xl font-semibold">Под эти условия ничего не нашлось</p>
            <p className="max-w-md text-sm text-muted-foreground">
              В каталоге 30 позиций. Попробуйте убрать фильтр по цене или ножке, или посмотрите все товары.
            </p>
            <Button onClick={reset}>Показать все товары</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} eager={i < 6} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
