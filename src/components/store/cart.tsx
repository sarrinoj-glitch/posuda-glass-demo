"use client"

import * as React from "react"
import { getProduct, photo } from "@/lib/catalog"
import { SET_DISCOUNT, getSet, setPrice } from "@/lib/sets"

// Demo cart: lives in localStorage, one storage key per concept (B cart, C order list).
// Keys: "p:<productId>" a product, "s:<setId>" a ready-made set, "c:<id>.<id>" a table from the builder.

export type Line = { key: string; qty: number }
export type Gift = { wrap: boolean; card: string }

type CartContext = {
  lines: Line[]
  ready: boolean
  count: number
  add: (key: string, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  gift: Gift
  setGift: (gift: Gift) => void
}

const Ctx = React.createContext<CartContext | null>(null)

export function CartProvider({ storageKey, children }: { storageKey: string; children: React.ReactNode }) {
  const [lines, setLines] = React.useState<Line[]>([])
  const [gift, setGift] = React.useState<Gift>({ wrap: false, card: "" })
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const saved = JSON.parse(raw) as { lines?: Line[]; gift?: Gift }
        if (Array.isArray(saved.lines)) setLines(saved.lines.filter((l) => resolveLine(l.key)))
        if (saved.gift) setGift(saved.gift)
      }
    } catch {
      // Private mode or blocked storage: the cart simply starts empty.
    }
    setReady(true)
  }, [storageKey])

  React.useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(storageKey, JSON.stringify({ lines, gift }))
    } catch {
      // Not critical for a demo.
    }
  }, [lines, gift, ready, storageKey])

  const value = React.useMemo<CartContext>(
    () => ({
      lines,
      ready,
      gift,
      setGift,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add: (key, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.key === key)
          if (found) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
          return [...prev, { key, qty }]
        }),
      setQty: (key, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(99, qty) } : l)),
        ),
      remove: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      clear: () => {
        setLines([])
        setGift({ wrap: false, card: "" })
      },
    }),
    [lines, ready, gift],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}

export type ResolvedLine = {
  key: string
  kind: "product" | "set"
  id: string
  title: string
  subtitle: string
  unit: number
  image: string
}

export function resolveLine(key: string): ResolvedLine | null {
  const [kind, id] = key.split(":")
  if (kind === "p") {
    const p = getProduct(id)
    if (!p) return null
    return { key, kind: "product", id, title: p.name, subtitle: p.sizeLabel, unit: p.price, image: photo(id, "cover") }
  }
  if (kind === "c") {
    // Custom table from the builder: "c:<id>.<id>.<id>", priced like a ready-made set.
    const items = id.split(".").map(getProduct).filter((p): p is NonNullable<typeof p> => !!p)
    if (items.length === 0) return null
    const full = items.reduce((s, p) => s + p.price, 0)
    const unit = items.length >= 3 ? Math.round((full * (1 - SET_DISCOUNT)) / 10) * 10 : full
    return {
      key,
      kind: "set",
      id,
      title: `Свой стол: ${items.length} ${items.length === 1 ? "предмет" : items.length < 5 ? "предмета" : "предметов"}`,
      subtitle: items.map((p) => p.name.split(",")[0]).join(" · "),
      unit,
      image: photo(items[0].id, "cover"),
    }
  }
  if (kind === "s") {
    const s = getSet(id)
    if (!s) return null
    return {
      key,
      kind: "set",
      id,
      title: `Набор «${s.name}»`,
      subtitle: s.forWhat,
      unit: setPrice(s).price,
      image: photo(s.cover, "cover"),
    }
  }
  return null
}

export function linesTotal(lines: Line[]) {
  return lines.reduce((sum, l) => sum + (resolveLine(l.key)?.unit ?? 0) * l.qty, 0)
}
