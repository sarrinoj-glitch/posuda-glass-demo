"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Qty({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-md border bg-card" role="group" aria-label={`Количество: ${label}`}>
      <Button variant="ghost" size="icon-sm" aria-label="Меньше" onClick={() => onChange(value - 1)}>
        <Minus />
      </Button>
      <span className="w-7 text-center text-sm tabular" aria-live="polite">
        {value}
      </span>
      <Button variant="ghost" size="icon-sm" aria-label="Больше" onClick={() => onChange(value + 1)}>
        <Plus />
      </Button>
    </div>
  )
}
