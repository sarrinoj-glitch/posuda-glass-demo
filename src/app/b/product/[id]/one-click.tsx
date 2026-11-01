"use client"

import * as React from "react"
import { CheckCircle2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { rub } from "@/lib/utils"

/** «Купить в 1 клик»: only a phone number, the manager calls back and fills in the rest. */
export function OneClick({ name, price, qty }: { name: string; price: number; qty: number }) {
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState("")
  const [done, setDone] = React.useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const phone = String(new FormData(e.currentTarget).get("oc-phone") ?? "").replace(/\D/g, "")
    if (phone.length < 10) {
      setError("Нужен номер из 10–11 цифр — по нему менеджер позвонит подтвердить заказ")
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) {
          setDone(false)
          setError("")
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="bg-card">
          <Zap />
          Купить в 1 клик
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background sm:max-w-md">
        {done ? (
          <div className="flex flex-col items-start gap-3 py-2">
            <CheckCircle2 className="size-8 text-success" aria-hidden />
            <DialogTitle className="font-display text-3xl">Заявка принята</DialogTitle>
            <DialogDescription>
              Менеджер позвонит, уточнит адрес и способ оплаты. Демо: заявка никуда не отправлена.
            </DialogDescription>
            <Button className="mt-2" onClick={() => setOpen(false)}>
              Продолжить покупки
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl">Купить в 1 клик</DialogTitle>
              <DialogDescription>
                {name}
                {qty > 1 ? ` × ${qty}` : ""} — {rub(price * qty)}. Оставьте телефон, остальное уточним в звонке.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="oc-phone">Телефон</Label>
              <Input
                id="oc-phone"
                name="oc-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7"
                autoFocus
                aria-invalid={!!error}
                aria-describedby={error ? "oc-err" : undefined}
              />
              {error && (
                <p id="oc-err" className="text-xs text-destructive">
                  {error}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" size="lg" className="w-full">
                Жду звонка
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
