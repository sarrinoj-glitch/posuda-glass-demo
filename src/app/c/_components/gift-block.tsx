"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/store/cart"

const MAX = 120

export function GiftBlock() {
  const { gift, setGift } = useCart()

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
          <Checkbox id="gift-wrap" checked={gift.wrap} onCheckedChange={(v) => setGift({ ...gift, wrap: v === true })} className="mt-0.5" />
          <Label htmlFor="gift-wrap" className="flex flex-col items-start gap-0.5 font-normal">
            <span className="font-medium">Упаковать заказ в подарок</span>
            <span className="text-xs text-muted-foreground">Коробка, лента и открытка с вашим текстом</span>
          </Label>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gift-text">Текст открытки</Label>
          <Textarea
            id="gift-text"
            maxLength={MAX}
            value={gift.card}
            onChange={(e) => setGift({ ...gift, card: e.target.value, wrap: true })}
            placeholder="Дорогая мама, с днём рождения!"
            aria-describedby="gift-count"
          />
          <span id="gift-count" className="self-end text-xs text-muted-foreground tabular">
            {gift.card.length} / {MAX}
          </span>
        </div>
      </div>

      <div
        className="flex aspect-[4/3] flex-col justify-between rounded-lg border border-brass-soft bg-card p-6 shadow-[inset_0_0_0_6px_var(--card),inset_0_0_0_7px_var(--brass-soft)]"
        aria-label="Так будет выглядеть открытка"
      >
        <span className="text-[11px] tracking-wide text-brass">GLASS</span>
        <p className="font-display text-2xl leading-snug text-balance break-words">
          {gift.card.trim() || "Здесь будет ваш текст"}
        </p>
        <span className="self-end text-[11px] text-muted-foreground">открытка вкладывается в коробку</span>
      </div>
    </div>
  )
}
