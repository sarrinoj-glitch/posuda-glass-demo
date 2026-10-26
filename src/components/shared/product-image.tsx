import { photo } from "@/lib/catalog"
import { asset, cn } from "@/lib/utils"

export function ProductImage({
  id,
  alt,
  className,
  eager = false,
}: {
  id: string
  alt: string
  className?: string
  eager?: boolean
}) {
  return (
    <div className={cn("relative aspect-square overflow-hidden bg-well", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(photo(id, "cover"))}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        width={720}
        height={720}
        className="size-full object-cover"
      />
    </div>
  )
}
