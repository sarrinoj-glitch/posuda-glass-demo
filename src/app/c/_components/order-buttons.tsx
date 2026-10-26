"use client"

import { ExternalLink, Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/store/cart"
import { cn, wbLink } from "@/lib/utils"

/** Concept C's two paths: add to a WhatsApp order here, or buy a single piece on Wildberries. */
export function OrderButtons({ id, name, size = "default", className }: { id: string; name: string; size?: "default" | "lg"; className?: string }) {
  const { add } = useCart()
  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        size={size}
        className="flex-1"
        onClick={() => {
          add(`p:${id}`)
          toast.success("Добавлено в заказ", { description: name })
        }}
      >
        <Plus />В заказ
      </Button>
      <Button asChild size={size} variant="outline" className="flex-1 bg-card">
        <a href={wbLink(id)} target="_blank" rel="noopener noreferrer" aria-label={`Купить на Wildberries: ${name}`}>
          На WB
          <ExternalLink />
        </a>
      </Button>
    </div>
  )
}

export function AddSetButton({ setId, name }: { setId: string; name: string }) {
  const { add } = useCart()
  return (
    <Button
      className="w-full"
      onClick={() => {
        add(`s:${setId}`)
        toast.success("Набор добавлен в заказ", { description: name })
      }}
    >
      <Plus />
      Добавить набор в заказ
    </Button>
  )
}
