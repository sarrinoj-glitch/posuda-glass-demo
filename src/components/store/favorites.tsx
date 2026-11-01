"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { getProduct } from "@/lib/catalog"
import { cn } from "@/lib/utils"

// Favourites and «recently viewed» for the B store. Both live in localStorage like the cart.

type FavContext = { ids: string[]; ready: boolean; has: (id: string) => boolean; toggle: (id: string) => void }

const Ctx = React.createContext<FavContext | null>(null)
const KEY = "glass-demo-b-favorites"

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = React.useState<string[]>([])
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setIds((JSON.parse(raw) as string[]).filter((id) => getProduct(id)))
    } catch {
      // Storage blocked: favourites start empty.
    }
    setReady(true)
  }, [])

  React.useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      // Not critical for a demo.
    }
  }, [ids, ready])

  const value = React.useMemo<FavContext>(
    () => ({
      ids,
      ready,
      has: (id) => ids.includes(id),
      toggle: (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
    }),
    [ids, ready],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useFavorites() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider")
  return ctx
}

export function FavButton({ id, name, className, overlay = false }: { id: string; name: string; className?: string; overlay?: boolean }) {
  const { has, toggle } = useFavorites()
  const active = has(id)
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-pressed={active}
      aria-label={active ? `Убрать из избранного: ${name}` : `В избранное: ${name}`}
      onClick={(e) => {
        e.preventDefault()
        toggle(id)
        if (!active) toast("Добавлено в избранное", { description: name })
      }}
      className={cn(overlay ? "rounded-full border-transparent bg-card/90 shadow-sm backdrop-blur" : "bg-card", className)}
    >
      <Heart className={cn(active && "fill-primary text-primary")} />
    </Button>
  )
}

const RECENT = "glass-demo-b-recent"

export function rememberViewed(id: string): string[] {
  try {
    const prev = JSON.parse(localStorage.getItem(RECENT) ?? "[]") as string[]
    const next = [id, ...prev.filter((x) => x !== id)].slice(0, 9)
    localStorage.setItem(RECENT, JSON.stringify(next))
    return prev.filter((x) => x !== id && getProduct(x))
  } catch {
    return []
  }
}
