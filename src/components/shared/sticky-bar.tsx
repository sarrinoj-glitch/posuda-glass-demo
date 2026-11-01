import { rub } from "@/lib/utils"

/** Phone-only bar pinned to the bottom of a product page: price stays visible next to the action. */
export function StickyBar({ price, name, children }: { price: number; name: string; children: React.ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur md:hidden">
      <div className="wrap flex items-center gap-3 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs text-muted-foreground">{name}</span>
          <span className="text-lg font-semibold tabular">{rub(price)}</span>
        </div>
        <div className="ml-auto flex shrink-0 gap-2">{children}</div>
      </div>
    </div>
  )
}
