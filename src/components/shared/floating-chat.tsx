"use client"

import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { getProduct } from "@/lib/catalog"
import { cn, waLink } from "@/lib/utils"

/** «Задать вопрос» in WhatsApp; on a product page the message already names the product. */
export function FloatingChat() {
  const path = usePathname() ?? ""
  const id = path.match(/\/product\/(\d+)/)?.[1]
  const product = id ? getProduct(id) : undefined
  const text = product
    ? `Здравствуйте! Вопрос по товару «${product.name}» (${product.sizeLabel}).`
    : "Здравствуйте! Вопрос по посуде GLASS."

  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Задать вопрос в WhatsApp"
      className={cn(
        "fixed right-4 z-30 flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm text-ink-foreground shadow-lg transition hover:opacity-90",
        "mr-[env(safe-area-inset-right,0px)]",
        // Above the sticky buy bar on product pages (phones only).
        product ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:bottom-6" : "bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]",
      )}
    >
      <MessageCircle className="size-5" aria-hidden />
      <span className="hidden sm:inline">Задать вопрос</span>
    </a>
  )
}
