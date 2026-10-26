import { getProduct } from "./catalog"

// Example sets for concept C, built only from real SKUs.
// The 10% set discount is a proposal for the owner, not an existing offer.
export const SET_DISCOUNT = 0.1

export type TableSet = {
  id: string
  name: string
  forWhat: string
  items: { id: string; qty: number }[]
  cover: string
}

export const sets: TableSet[] = [
  {
    id: "sweet",
    name: "Сладкий стол",
    forWhat: "рулет, конфеты, мороженое и варенье к чаю",
    items: [
      { id: "831189565", qty: 1 },
      { id: "780286917", qty: 1 },
      { id: "784711627", qty: 2 },
      { id: "1162398207", qty: 1 },
    ],
    cover: "831189565",
  },
  {
    id: "tea",
    name: "Чай по-восточному",
    forWhat: "шесть кружек, лимон, варенье и сладости",
    items: [
      { id: "832504458", qty: 1 },
      { id: "845919844", qty: 1 },
      { id: "1162790195", qty: 1 },
      { id: "787375072", qty: 1 },
    ],
    cover: "832504458",
  },
  {
    id: "guests",
    name: "Стол на 6 гостей",
    forWhat: "закуски, фрукты, нарезка и горячее",
    items: [
      { id: "787326583", qty: 1 },
      { id: "846029415", qty: 1 },
      { id: "785572732", qty: 1 },
      { id: "963704973", qty: 1 },
    ],
    cover: "846029415",
  },
  {
    id: "gift",
    name: "Подарок хозяйке",
    forWhat: "блюдо, лимонница и маслёнка в подарочной коробке",
    items: [
      { id: "845992505", qty: 1 },
      { id: "952658967", qty: 1 },
      { id: "1280101349", qty: 1 },
    ],
    cover: "845992505",
  },
]

export function getSet(id: string) {
  return sets.find((s) => s.id === id)
}

export function setPrice(set: TableSet) {
  const full = set.items.reduce((sum, it) => sum + (getProduct(it.id)?.price ?? 0) * it.qty, 0)
  const price = Math.round((full * (1 - SET_DISCOUNT)) / 10) * 10
  return { full, price, save: full - price }
}

export function setCount(set: TableSet) {
  return set.items.reduce((n, it) => n + it.qty, 0)
}
