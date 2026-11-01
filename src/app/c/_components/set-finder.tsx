"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ProductImage } from "@/components/shared/product-image"
import { getProduct } from "@/lib/catalog"
import { getSet, setPrice } from "@/lib/sets"
import { cn, rub } from "@/lib/utils"
import { AddSetButton } from "./order-buttons"

// Adapted from 21st.dev «Product Finder Quiz» (ziegfiroyt): every answer asks for traits,
// each set scores a point per trait it has, the best one wins and the matched answers become «почему он».

type Choice = { value: string; label: string; hint?: string; traits: string[]; reason?: string }
type Question = { name: string; title: string; weight: number; choices: Choice[] }

const questions: Question[] = [
  {
    name: "occasion",
    title: "Какой повод?",
    // The occasion decides the set; guests and budget only break ties.
    weight: 3,
    choices: [
      { value: "tea", label: "Чаепитие с гостями", hint: "чай, лимон, варенье, сладости", traits: ["tea"], reason: "Собран под чай: кружки, лимонницы и розетки для варенья" },
      { value: "feast", label: "Праздничный стол", hint: "закуски, фрукты, горячее", traits: ["feast"], reason: "Крупные блюда на ножке под закуски, фрукты и горячее" },
      { value: "sweet", label: "Сладкий стол", hint: "рулет, конфеты, мороженое", traits: ["sweet"], reason: "Рулетница и конфетницы как раз под десерты" },
      { value: "gift", label: "Подарок", hint: "маме, подруге, коллеге", traits: ["gift"], reason: "Три вещи, которые красиво смотрятся в одной подарочной коробке" },
    ],
  },
  {
    name: "guests",
    title: "Сколько гостей обычно?",
    weight: 1,
    choices: [
      { value: "small", label: "До 4 человек", traits: ["small"], reason: "Немного предметов, стол на четверых не будет загромождён" },
      { value: "big", label: "5 и больше", traits: ["big"], reason: "Есть крупные вещи по 25–30 см для большого стола" },
    ],
  },
  {
    name: "budget",
    title: "Какой бюджет?",
    weight: 1,
    choices: [
      { value: "3000", label: "До 3 000 ₽", traits: ["b3"], reason: "Укладывается в 3 000 ₽" },
      { value: "5000", label: "До 5 000 ₽", traits: ["b3", "b5"], reason: "Укладывается в 5 000 ₽" },
      { value: "any", label: "Не важно", traits: [] },
    ],
  },
]

// Traits per ready-made set; budgets checked against setPrice() — gift 2 580, tea 3 060, sweet 4 260, guests 5 770 ₽.
const setTraits: Record<string, string[]> = {
  guests: ["feast", "big"],
  sweet: ["sweet", "small", "big", "b5"],
  tea: ["tea", "small", "b5"],
  gift: ["gift", "small", "b3", "b5"],
}

export function SetFinder() {
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [result, setResult] = React.useState<{ setId: string; reasons: string[]; tips: string[] } | null>(null)

  const q = questions[step]
  const current = answers[q?.name ?? ""]

  function pick() {
    const pickedWithWeight = questions
      .map((qq) => ({ choice: qq.choices.find((c) => c.value === answers[qq.name]), weight: qq.weight }))
      .filter((x): x is { choice: Choice; weight: number } => !!x.choice)
    const picked = pickedWithWeight.map((x) => x.choice)
    let best = "guests"
    let bestScore = -1
    for (const [id, traits] of Object.entries(setTraits)) {
      const score = pickedWithWeight.reduce(
        (sum, { choice, weight }) => sum + weight * choice.traits.filter((t) => traits.includes(t)).length,
        0,
      )
      if (score > bestScore) {
        best = id
        bestScore = score
      }
    }
    const reasons = picked
      .filter((c) => c.traits.some((t) => setTraits[best].includes(t)))
      .map((c) => c.reason)
      .filter((r): r is string => !!r)

    // Guests and budget rarely change the set, so they say where the set falls short.
    const tips: string[] = []
    const price = setPrice(getSet(best)!).price
    const limit = answers.budget === "3000" ? 3000 : answers.budget === "5000" ? 5000 : null
    if (limit && price > limit) tips.push(`Набор стоит ${rub(price)}, чуть выше бюджета. В конструкторе ниже можно убрать лишнее.`)
    if (answers.guests === "big" && (best === "tea" || best === "gift")) tips.push("На 5 и больше гостей добавьте к набору блюдо на ножке из каталога.")
    if (answers.guests === "small" && best === "guests") tips.push("Для небольшой компании хватит двух блюд из четырёх — соберите свой стол ниже.")
    setResult({ setId: best, reasons, tips })
  }

  function restart() {
    setResult(null)
    setAnswers({})
    setStep(0)
  }

  if (result) {
    const s = getSet(result.setId)!
    const { price, save } = setPrice(s)
    return (
      <div className="grid gap-8 rounded-2xl border bg-card p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8" aria-live="polite">
        <div className="grid grid-cols-2 gap-1.5 self-start">
          {s.items.map((it) => (
            <ProductImage key={it.id} id={it.id} alt={getProduct(it.id)?.name ?? ""} className="rounded-md" />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm text-muted-foreground">Вам подойдёт</p>
          <h3 className="font-display text-4xl font-semibold">Набор «{s.name}»</h3>
          <p className="text-muted-foreground">{s.forWhat}</p>
          {result.reasons.length > 0 && (
            <ul className="flex flex-col">
              {result.reasons.map((r) => (
                <li key={r} className="border-t py-3 text-sm">
                  {r}
                </li>
              ))}
            </ul>
          )}
          {result.tips.map((t) => (
            <p key={t} className="rounded-md border border-dashed border-brass-soft p-3 text-sm">
              {t}
            </p>
          ))}
          <p className="text-sm tabular">
            <span className="text-2xl font-semibold">{rub(price)}</span>{" "}
            <span className="text-muted-foreground">в наборе, выгода {rub(save)}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="min-w-56 flex-1 sm:flex-none">
              <AddSetButton setId={s.id} name={s.name} />
            </div>
            <Button variant="outline" className="bg-card" onClick={restart}>
              <RotateCcw />
              Ответить заново
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 rounded-2xl border bg-card p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground tabular">
          Вопрос {step + 1} из {questions.length}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {questions.map((_, i) => (
            <span key={i} className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-primary" : "bg-border")} />
          ))}
        </div>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          Три вопроса — и мы назовём один набор из четырёх, с объяснением, почему именно он.
        </p>
      </div>
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 font-display text-3xl font-semibold">{q.title}</legend>
        <RadioGroup value={current ?? ""} onValueChange={(v) => setAnswers((a) => ({ ...a, [q.name]: v }))} className="gap-2">
          {q.choices.map((c) => (
            <Label
              key={c.value}
              htmlFor={`sf-${q.name}-${c.value}`}
              className="flex cursor-pointer items-start gap-3 rounded-lg border bg-background p-4 font-normal has-[[data-state=checked]]:border-primary"
            >
              <RadioGroupItem id={`sf-${q.name}-${c.value}`} value={c.value} className="mt-0.5" />
              <span className="flex flex-col gap-0.5">
                <span className="font-medium">{c.label}</span>
                {c.hint && <span className="text-xs text-muted-foreground">{c.hint}</span>}
              </span>
            </Label>
          ))}
        </RadioGroup>
        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              Назад
            </Button>
          )}
          <Button disabled={!current} onClick={() => (step < questions.length - 1 ? setStep((s) => s + 1) : pick())}>
            {step < questions.length - 1 ? "Дальше" : "Подобрать набор"}
          </Button>
        </div>
      </fieldset>
    </div>
  )
}
