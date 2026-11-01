"use client"

import * as React from "react"
import { FavButton } from "@/components/store/favorites"
import { Qty } from "@/components/shared/qty"
import { AddToCart } from "../../_components/add-to-cart"
import { OneClick } from "./one-click"

export function BuyBox({ id, name, price }: { id: string; name: string; price: number }) {
  const [qty, setQty] = React.useState(1)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Qty value={qty} onChange={(n) => setQty(Math.max(1, Math.min(99, n)))} label={name} />
        <AddToCart id={id} name={name} qty={qty} className="flex-1 sm:flex-none" />
        <FavButton id={id} name={name} className="size-10" />
      </div>
      <OneClick name={name} price={price} qty={qty} />
    </div>
  )
}
