"use client"

import * as React from "react"
import { Qty } from "@/components/shared/qty"
import { AddToCart } from "../../_components/add-to-cart"

export function BuyBox({ id, name }: { id: string; name: string }) {
  const [qty, setQty] = React.useState(1)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Qty value={qty} onChange={(n) => setQty(Math.max(1, Math.min(99, n)))} label={name} />
      <AddToCart id={id} name={name} qty={qty} className="flex-1 sm:flex-none" />
    </div>
  )
}
