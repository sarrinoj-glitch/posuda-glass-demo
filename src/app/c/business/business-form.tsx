"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { waLink } from "@/lib/utils"

const kinds = ["Кондитер", "Кафе или ресторан", "Банкетный зал", "Оформитель, прокат", "Магазин"]

export function BusinessForm() {
  const [kind, setKind] = React.useState(kinds[0])
  const [error, setError] = React.useState("")

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("bname") ?? "").trim()
    const city = String(data.get("bcity") ?? "").trim()
    const need = String(data.get("bneed") ?? "").trim()
    if (!need) {
      setError("Напишите, какие позиции и сколько штук нужно — без этого не посчитаем цену")
      document.getElementById("bneed")?.focus()
      return
    }
    setError("")
    const text = [
      "Здравствуйте! Запрос оптового прайса.",
      `Кто мы: ${kind}${name ? `, ${name}` : ""}`,
      city ? `Город: ${city}` : null,
      `Что нужно: ${need}`,
    ]
      .filter(Boolean)
      .join("\n")
    window.open(waLink(text), "_blank", "noopener,noreferrer")
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium">Кто вы</legend>
        <RadioGroup value={kind} onValueChange={setKind} className="flex flex-wrap gap-2">
          {kinds.map((k, i) => (
            <Label
              key={k}
              htmlFor={`k${i}`}
              className="flex cursor-pointer items-center gap-2 rounded-full border bg-background px-3 py-1.5 font-normal has-[[data-state=checked]]:border-primary"
            >
              <RadioGroupItem id={`k${i}`} value={k} />
              {k}
            </Label>
          ))}
        </RadioGroup>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bname">Название или имя</Label>
          <Input id="bname" name="bname" autoComplete="organization" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bcity">Город</Label>
          <Input id="bcity" name="bcity" autoComplete="address-level2" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bneed">Что и сколько нужно</Label>
        <Textarea
          id="bneed"
          name="bneed"
          placeholder="Например: рулетница на золотых ножках — 20 шт., блюдо на ножке 20 см — 30 шт."
          aria-invalid={!!error}
          aria-describedby={error ? "bneed-err" : undefined}
        />
        {error && (
          <p id="bneed-err" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" className="self-start">
        <MessageCircle />
        Отправить запрос в WhatsApp
      </Button>
      <p className="text-xs text-muted-foreground">Демо: номер владельца не подставлен, WhatsApp предложит выбрать чат.</p>
    </form>
  )
}
