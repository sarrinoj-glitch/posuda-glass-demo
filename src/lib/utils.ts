import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** Prefix a public file path with the GitHub Pages base path. */
export function asset(path: string) {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`
}

const rubFmt = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })

export function rub(value: number) {
  return `${rubFmt.format(Math.round(value))} ₽`
}

/** «1 отзыв», «3 отзыва», «12 отзывов» */
export function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

export function waLink(text: string) {
  // Owner's number is not in the demo; wa.me without a number opens the contact picker.
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function wbLink(id: string) {
  return `https://www.wildberries.ru/catalog/${id}/detail.aspx`
}
