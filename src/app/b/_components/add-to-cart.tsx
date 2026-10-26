"use client"

import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/store/cart"
import { cn } from "@/lib/utils"

export function AddToCart({
  id,
  name,
  qty = 1,
  compact = false,
  className,
}: {
  id: string
  name: string
  qty?: number
  compact?: boolean
  className?: string
}) {
  const { add } = useCart()
  const router = useRouter()

  function onClick() {
    add(`p:${id}`, qty)
    toast.success("Добавлено в корзину", {
      description: name,
      action: { label: "Оформить", onClick: () => router.push("/b/checkout/") },
    })
  }

  if (compact) {
    return (
      <Button variant="outline" size="icon" onClick={onClick} aria-label={`В корзину: ${name}`} className={cn("bg-card", className)}>
        <ShoppingBag />
      </Button>
    )
  }
  return (
    <Button size="lg" onClick={onClick} className={className}>
      <ShoppingBag />
      В корзину
    </Button>
  )
}
