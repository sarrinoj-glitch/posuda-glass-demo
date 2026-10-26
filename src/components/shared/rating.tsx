import { Star } from "lucide-react"
import type { Product } from "@/lib/catalog"
import { showRating } from "@/lib/catalog"
import { cn, plural } from "@/lib/utils"

export function Rating({ product, className }: { product: Product; className?: string }) {
  if (!showRating(product)) {
    return <span className={cn("text-xs text-muted-foreground", className)}>Новинка</span>
  }
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <Star className="size-3.5 fill-brass-soft text-brass" aria-hidden />
      <span className="font-medium text-foreground tabular">{product.rating!.toFixed(1).replace(".", ",")}</span>
      <span className="tabular">
        · {product.reviews} {plural(product.reviews, "отзыв", "отзыва", "отзывов")}
      </span>
    </span>
  )
}
