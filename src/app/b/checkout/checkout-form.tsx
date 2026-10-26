"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CheckoutSummary, type CheckoutLine } from "@/components/ui/checkout-summary"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { linesTotal, resolveLine, useCart } from "@/components/store/cart"
import { asset, rub } from "@/lib/utils"

// Demo terms, to be agreed with the owner: free delivery threshold and a first-order promo code.
const FREE_FROM = 5000
const PROMO = "ПЕРВЫЙ"
const PROMO_OFF = 0.1

const deliveries = [
  { id: "pvz", label: "СДЭК, пункт выдачи", note: "Срок и цену покажем после выбора пункта" },
  { id: "courier", label: "СДЭК, курьер до двери", note: "Привезём в удобный интервал" },
  { id: "post", label: "Почта России", note: "Если рядом нет СДЭК" },
] as const

const payments = [
  { id: "card", label: "Картой на сайте" },
  { id: "sbp", label: "СБП по QR-коду" },
  { id: "cod", label: "При получении в пункте выдачи" },
] as const

type Errors = Partial<Record<"name" | "phone" | "city", string>>

export function CheckoutForm() {
  const { lines, ready, clear } = useCart()
  const [delivery, setDelivery] = React.useState<string>("pvz")
  const [payment, setPayment] = React.useState<string>("card")
  const [promo, setPromo] = React.useState("")
  const [promoApplied, setPromoApplied] = React.useState(false)
  const [promoError, setPromoError] = React.useState("")
  const [errors, setErrors] = React.useState<Errors>({})
  const [done, setDone] = React.useState<{ number: string; total: number } | null>(null)

  const subtotal = linesTotal(lines)
  const discount = promoApplied ? -Math.round(subtotal * PROMO_OFF) : 0
  const freeDelivery = subtotal + discount >= FREE_FROM

  const summaryLines: CheckoutLine[] = []
  if (promoApplied) summaryLines.push({ id: "promo", label: `Промокод ${PROMO}`, amount: discount, note: "−10% на первый заказ" })
  summaryLines.push(
    freeDelivery
      ? { id: "delivery", label: "Доставка", amount: 0, note: `Бесплатно от ${rub(FREE_FROM)}` }
      : { id: "delivery", label: "Доставка", amount: null, note: `Бесплатно от ${rub(FREE_FROM)}` },
  )

  function applyPromo() {
    if (promo.trim().toUpperCase() === PROMO) {
      setPromoApplied(true)
      setPromoError("")
    } else {
      setPromoApplied(false)
      setPromoError(`Такого промокода нет. Для демо работает «${PROMO}».`)
    }
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}
    if (!String(data.get("name") ?? "").trim()) next.name = "Напишите, как к вам обращаться"
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "")
    if (phone.length < 10) next.phone = "Нужен номер из 10–11 цифр, чтобы курьер мог позвонить"
    if (!String(data.get("city") ?? "").trim()) next.city = "Укажите город, чтобы посчитать доставку"
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.getElementById(first)?.focus()
      return
    }
    const number = `GL-${Math.floor(10000 + Math.random() * 89999)}`
    setDone({ number, total: subtotal + discount })
    clear()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (done) {
    return (
      <div className="wrap flex max-w-2xl flex-col items-start gap-5 py-16">
        <CheckCircle2 className="size-10 text-success" aria-hidden />
        <h1 className="font-display text-5xl font-semibold">Заказ {done.number} оформлен</h1>
        <p className="text-muted-foreground">
          Сумма {rub(done.total)}. Пришлём трек-номер, когда передадим заказ в доставку.
        </p>
        <p className="rounded-md border bg-card p-3 text-sm text-muted-foreground">
          Это демо: заказ никуда не отправлен, оплата не проводилась.
        </p>
        <Button asChild>
          <Link href="/b/catalog/">Вернуться в каталог</Link>
        </Button>
      </div>
    )
  }

  if (ready && lines.length === 0) {
    return (
      <div className="wrap flex max-w-2xl flex-col items-start gap-5 py-16">
        <h1 className="font-display text-5xl font-semibold">Корзина пустая</h1>
        <p className="text-muted-foreground">
          Добавьте товары из каталога, и здесь появится оформление заказа с расчётом доставки.
        </p>
        <Button asChild>
          <Link href="/b/catalog/">Перейти в каталог</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="wrap grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-10">
        <h1 className="font-display text-5xl font-semibold">Оформление заказа</h1>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-lg font-medium">Получатель</legend>
          <Field id="name" label="Имя" error={errors.name}>
            <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          </Field>
          <Field id="phone" label="Телефон" error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-err" : undefined}
            />
          </Field>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-3 text-lg font-medium">Доставка</legend>
          <RadioGroup value={delivery} onValueChange={setDelivery} className="gap-2">
            {deliveries.map((d) => (
              <Label
                key={d.id}
                htmlFor={`d-${d.id}`}
                className="flex cursor-pointer items-start gap-3 rounded-lg border bg-card p-4 font-normal has-[[data-state=checked]]:border-primary"
              >
                <RadioGroupItem id={`d-${d.id}`} value={d.id} className="mt-0.5" />
                <span className="flex flex-col gap-0.5">
                  <span className="font-medium">{d.label}</span>
                  <span className="text-xs text-muted-foreground">{d.note}</span>
                </span>
              </Label>
            ))}
          </RadioGroup>
          <Field id="city" label={delivery === "pvz" ? "Город" : "Город и адрес"} error={errors.city}>
            <Input id="city" name="city" autoComplete="address-level2" aria-invalid={!!errors.city} aria-describedby={errors.city ? "city-err" : undefined} />
          </Field>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-3 text-lg font-medium">Оплата</legend>
          <RadioGroup value={payment} onValueChange={setPayment} className="gap-2 sm:grid-cols-3">
            {payments.map((p) => (
              <Label
                key={p.id}
                htmlFor={`p-${p.id}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 font-normal has-[[data-state=checked]]:border-primary"
              >
                <RadioGroupItem id={`p-${p.id}`} value={p.id} />
                {p.label}
              </Label>
            ))}
          </RadioGroup>
        </fieldset>

        <div className="flex flex-col gap-2">
          <Label htmlFor="comment">Комментарий к заказу</Label>
          <Textarea id="comment" name="comment" placeholder="Например: упакуйте в подарок" />
        </div>
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
        <h2 className="font-medium">Ваш заказ</h2>
        <ul className="flex flex-col gap-3">
          {lines.map((l) => {
            const r = resolveLine(l.key)
            if (!r) return null
            return (
              <li key={l.key} className="flex items-center gap-3 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(r.image)} alt="" width={48} height={48} className="size-12 rounded-md bg-well object-cover" />
                <span className="min-w-0 flex-1 leading-snug">
                  {r.title}
                  <span className="block text-xs text-muted-foreground tabular">× {l.qty}</span>
                </span>
                <span className="tabular">{rub(r.unit * l.qty)}</span>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="promo">Промокод</Label>
          <div className="flex gap-2">
            <Input
              id="promo"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder={PROMO}
              aria-describedby={promoError ? "promo-err" : undefined}
            />
            <Button type="button" variant="outline" className="bg-card" onClick={applyPromo}>
              Применить
            </Button>
          </div>
          {promoError && (
            <p id="promo-err" className="text-xs text-destructive">
              {promoError}
            </p>
          )}
        </div>

        <CheckoutSummary
          subtotal={subtotal}
          lines={summaryLines}
          footer={
            <Button type="submit" size="lg" className="w-full">
              {payment === "cod" ? "Оформить заказ" : "Перейти к оплате"}
            </Button>
          }
        />
        <p className="text-xs text-muted-foreground">Демо: оплата не проводится, данные никуда не отправляются.</p>
      </aside>
    </form>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
