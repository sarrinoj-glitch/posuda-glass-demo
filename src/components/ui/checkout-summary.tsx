import type { ComponentProps, ReactNode } from "react"
import { cn, rub } from "@/lib/utils"

// Adapted from 21st.dev «Checkout Summary» (astralyxdev): every adjustment is its own row,
// the total is summed from the rows, and an unknown charge reads «рассчитаем» instead of a false 0 ₽.
// Amounts here are whole roubles.

export type CheckoutLine = {
  id: string
  label: ReactNode
  /** Negative for a discount. `null` when not yet known. */
  amount: number | null
  note?: ReactNode
  discount?: boolean
}

function CheckoutSummary({
  subtotal,
  lines = [],
  totalLabel = "Итого",
  subtotalLabel = "Товары",
  pendingLabel = "рассчитаем на следующем шаге",
  pendingNote = "Итоговую сумму покажем, когда выберете адрес доставки.",
  footer,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  subtotal: number
  lines?: CheckoutLine[]
  totalLabel?: ReactNode
  subtotalLabel?: ReactNode
  pendingLabel?: ReactNode
  pendingNote?: ReactNode
  footer?: ReactNode
}) {
  const total = lines.reduce((sum, line) => sum + (line.amount ?? 0), subtotal)
  const pending = lines.some((line) => line.amount === null)

  return (
    <div data-slot="checkout-summary" className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)} {...props}>
      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex items-baseline gap-3">
          <dt className="min-w-0 flex-1 text-muted-foreground">{subtotalLabel}</dt>
          <dd className="shrink-0 tabular">{rub(subtotal)}</dd>
        </div>

        {lines.map((line) => {
          const isDiscount = line.discount ?? (line.amount !== null && line.amount < 0)
          return (
            <div key={line.id} className="flex items-baseline gap-3">
              <dt className="min-w-0 flex-1 text-muted-foreground">
                {line.label}
                {line.note && <span className="block text-xs text-muted-foreground/80">{line.note}</span>}
              </dt>
              <dd
                className={cn(
                  "shrink-0 tabular",
                  line.amount === null && "text-xs text-muted-foreground",
                  isDiscount && "text-success",
                )}
              >
                {line.amount === null ? pendingLabel : line.amount === 0 ? "бесплатно" : rub(line.amount)}
              </dd>
            </div>
          )
        })}

        <div className="flex items-baseline gap-3 border-t pt-3">
          <dt className="min-w-0 flex-1 font-medium">{totalLabel}</dt>
          <dd className="shrink-0 text-lg font-semibold tabular">
            {rub(total)}
            {pending && <span className="ms-1 text-xs font-normal text-muted-foreground">+ доставка</span>}
          </dd>
        </div>
      </dl>

      {pending && <p className="text-xs text-muted-foreground">{pendingNote}</p>}

      {footer && <div className="flex flex-col gap-2">{footer}</div>}
    </div>
  )
}

export { CheckoutSummary }
