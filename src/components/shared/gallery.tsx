"use client"

import * as React from "react"
import { photo } from "@/lib/catalog"
import { asset, cn } from "@/lib/utils"

export function Gallery({ id, count, name }: { id: string; count: number; name: string }) {
  const [active, setActive] = React.useState(1)
  const shots = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div className="relative flex-1 overflow-hidden rounded-lg bg-well">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(photo(id, active))}
          alt={`${name}, фото ${active} из ${count}`}
          width={720}
          height={960}
          className="aspect-[3/4] w-full object-cover"
        />
      </div>
      <div className="flex gap-2 md:w-20 md:flex-col" role="tablist" aria-label="Фотографии товара">
        {shots.map((n) => (
          <button
            key={n}
            type="button"
            role="tab"
            aria-selected={n === active}
            aria-label={`Фото ${n}`}
            onClick={() => setActive(n)}
            className={cn(
              "relative w-16 shrink-0 overflow-hidden rounded-md bg-well ring-offset-2 ring-offset-background transition md:w-20",
              n === active ? "ring-2 ring-primary" : "opacity-75 hover:opacity-100",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(photo(id, n))} alt="" loading="lazy" width={120} height={160} className="aspect-[3/4] w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
