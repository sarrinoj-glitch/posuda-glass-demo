import data from "@/data/reviews.json"

// Real WB reviews per product (seller 250096444), pulled 01.11.2026.
// scope "series": WB merges several products into one card; too few reviews on this exact
// item, so the page shows reviews of the whole card and says so.

export type ProductReview = {
  id: string
  name: string
  date: string
  rating: number
  text: string
  pros: string
  cons: string
  photos: string[]
  answer: string | null
}

export type ReviewSet = { scope: "product" | "series"; items: ProductReview[] }

const all = data as Record<string, ReviewSet>

export function reviewsFor(id: string): ReviewSet {
  const set = all[id] ?? { scope: "product", items: [] }
  // A merged card can hold dozens of reviews about other items: keep the page about this one.
  return set.scope === "series" ? { scope: "series", items: set.items.slice(0, 6) } : set
}
