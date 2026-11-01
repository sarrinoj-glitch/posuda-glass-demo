"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { Heart, Menu, Search, ShoppingBag } from "lucide-react"
import { useFavorites } from "@/components/store/favorites"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/store/cart"
import { categories } from "@/lib/catalog"
import { CartSheet } from "./cart-sheet"

export function StoreHeader() {
  const { count, ready } = useCart()
  const favs = useFavorites()
  const router = useRouter()
  const [q, setQ] = React.useState("")
  const [cartOpen, setCartOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  function search(e: React.FormEvent) {
    e.preventDefault()
    setMenuOpen(false)
    router.push(`/b/catalog/?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="border-b bg-card/60">
        <p className="wrap py-1.5 text-center text-xs text-muted-foreground">
          Доставка по России · бесплатно от 5 000 ₽ · заменим, если приедет разбитым
        </p>
      </div>
      <div className="wrap flex h-16 items-center gap-3">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Открыть меню">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-background">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">GLASS</SheetTitle>
              <SheetDescription>Посуда для праздничного стола</SheetDescription>
            </SheetHeader>
            <form onSubmit={search} className="px-4">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Например, рулетница" aria-label="Поиск по каталогу" />
            </form>
            <nav className="flex flex-col px-4" aria-label="Категории">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/b/catalog/?cat=${c.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="border-b py-3 text-sm"
                >
                  {c.name}
                </Link>
              ))}
              <Link href="/b/#delivery" onClick={() => setMenuOpen(false)} className="py-3 text-sm">
                Доставка и оплата
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/b/" className="flex items-baseline gap-2" aria-label="GLASS, на главную">
          <span className="font-display text-3xl leading-none">GLASS</span>
          <span className="hidden text-xs text-muted-foreground lg:inline">посуда для праздничного стола</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-5 text-sm whitespace-nowrap md:flex" aria-label="Основное меню">
          <Link href="/b/catalog/" className="hover:text-primary">Каталог</Link>
          <Link href="/b/catalog/?cat=stands" className="hidden hover:text-primary lg:inline">Блюда на ножке</Link>
          <Link href="/b/catalog/?cat=roll" className="hover:text-primary">Рулетницы</Link>
          <Link href="/b/#delivery" className="hover:text-primary">Доставка</Link>
        </nav>

        <form onSubmit={search} className="relative ml-auto hidden w-52 md:block lg:w-64" role="search">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по каталогу"
            aria-label="Поиск по каталогу"
            className="bg-card pl-8"
          />
        </form>

        <Button asChild variant="ghost" size="icon" className="relative ml-auto md:ml-0" aria-label={`Избранное, товаров: ${favs.ids.length}`}>
          <Link href="/b/favorites/">
            <Heart />
            {favs.ready && favs.ids.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 rounded-full bg-primary px-1 text-[10px] leading-4 text-primary-foreground tabular">
                {favs.ids.length}
              </span>
            )}
          </Link>
        </Button>

        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 bg-card" aria-label={`Корзина, товаров: ${count}`}>
              <ShoppingBag />
              <span className="hidden sm:inline">Корзина</span>
              {ready && count > 0 && (
                <span className="rounded-full bg-primary px-1.5 text-xs leading-5 text-primary-foreground tabular">{count}</span>
              )}
            </Button>
          </SheetTrigger>
          <CartSheet onNavigate={() => setCartOpen(false)} />
        </Sheet>
      </div>
    </header>
  )
}
