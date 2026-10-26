"use client"

import Link from "next/link"
import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/store/cart"
import { OrderSheet } from "./order-sheet"

const nav = [
  { href: "/c/#sets", label: "Наборы" },
  { href: "/c/#builder", label: "Собрать стол" },
  { href: "/c/#gift", label: "В подарок" },
  { href: "/c/#catalog", label: "Каталог" },
  { href: "/c/business/", label: "Для бизнеса" },
]

export function BoutiqueHeader() {
  const { count, ready } = useCart()
  const [orderOpen, setOrderOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
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
              <SheetDescription>Сервировка праздничного стола</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col px-4" aria-label="Разделы">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="border-b py-3 text-sm">
                  {n.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/c/" className="flex flex-col leading-none" aria-label="GLASS, на главную">
          <span className="font-display text-3xl">GLASS</span>
          <span className="hidden text-[11px] text-muted-foreground sm:block">сервировка праздничного стола</span>
        </Link>

        <nav className="mx-auto hidden items-center gap-6 text-sm md:flex" aria-label="Разделы">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>

        <Sheet open={orderOpen} onOpenChange={setOrderOpen}>
          <SheetTrigger asChild>
            <Button className="ml-auto md:ml-0" aria-label={`Мой заказ, позиций: ${count}`}>
              Мой заказ
              {ready && count > 0 && (
                <span className="rounded-full bg-primary-foreground px-1.5 text-xs leading-5 text-primary tabular">{count}</span>
              )}
            </Button>
          </SheetTrigger>
          <OrderSheet />
        </Sheet>
      </div>
    </header>
  )
}
