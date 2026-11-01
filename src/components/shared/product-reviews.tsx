"use client"

import * as React from "react"
import { Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { ReviewSet } from "@/lib/reviews"
import { asset, cn, plural } from "@/lib/utils"

const PAGE = 4

// Kept here rather than imported from lib/reviews so the full reviews JSON stays out of the client bundle.
function reviewPhoto(uuid: string, thumb = false) {
  return `/r/${uuid}${thumb ? "-t" : ""}.webp`
}

export function ProductReviews({ data, rating, total }: { data: ReviewSet; rating?: number; total: number }) {
  const [onlyPhotos, setOnlyPhotos] = React.useState(false)
  const [shown, setShown] = React.useState(PAGE)
  const [open, setOpen] = React.useState<{ uuid: string; who: string } | null>(null)

  const photos = data.items.flatMap((r) => r.photos.map((uuid) => ({ uuid, who: `${r.name}, ${r.date}` })))
  const list = onlyPhotos ? data.items.filter((r) => r.photos.length) : data.items
  const withPhotos = data.items.filter((r) => r.photos.length).length

  if (data.items.length === 0) {
    return (
      <section aria-labelledby="reviews-h" className="flex flex-col gap-3">
        <h2 id="reviews-h" className="font-display text-3xl font-semibold">Отзывы</h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          Отзывов с текстом пока нет: товар недавно появился. Фото и отзывы покупателей похожих вещей есть на страницах
          конфетниц и блюд на ножке.
        </p>
      </section>
    )
  }

  return (
    <section aria-labelledby="reviews-h" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="reviews-h" className="font-display text-3xl font-semibold">Отзывы</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {rating !== undefined && total >= 3 && (
              <>
                <Star className="size-4 fill-brass-soft text-brass" aria-hidden />
                <span className="font-medium text-foreground tabular">{rating.toFixed(1).replace(".", ",")}</span>
                <span>·</span>
              </>
            )}
            <span className="tabular">
              {total} {plural(total, "оценка", "оценки", "оценок")} на Wildberries
            </span>
          </p>
          {data.scope === "series" && (
            <p className="text-xs text-muted-foreground">
              На этот товар отзывов пока мало, ниже — отзывы на товары этой серии из общей карточки WB.
            </p>
          )}
        </div>
        {withPhotos > 0 && (
          <div className="flex gap-2" role="group" aria-label="Какие отзывы показать">
            <Button size="sm" variant={onlyPhotos ? "outline" : "default"} className={onlyPhotos ? "bg-card" : ""} aria-pressed={!onlyPhotos} onClick={() => { setOnlyPhotos(false); setShown(PAGE) }}>
              Все · {data.items.length}
            </Button>
            <Button size="sm" variant={onlyPhotos ? "default" : "outline"} className={onlyPhotos ? "" : "bg-card"} aria-pressed={onlyPhotos} onClick={() => { setOnlyPhotos(true); setShown(PAGE) }}>
              <Camera />С фото · {withPhotos}
            </Button>
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Фото покупателей</p>
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
            {photos.map((p) => (
              <li key={p.uuid} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setOpen(p)}
                  className="block overflow-hidden rounded-md bg-well"
                  aria-label={`Открыть фото покупателя: ${p.who}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(reviewPhoto(p.uuid, true))} alt="" width={96} height={96} loading="lazy" className="size-24 object-cover transition hover:opacity-90" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="grid gap-4 md:grid-cols-2">
        {list.slice(0, shown).map((r) => (
          <li key={r.id} className="flex flex-col gap-3 rounded-lg border bg-card p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium">{r.name}</span>
              <span className="text-xs text-muted-foreground">{r.date}</span>
            </div>
            <Stars value={r.rating} />
            <div className="flex flex-col gap-1.5 text-sm leading-relaxed">
              {r.text && <p>{r.text}</p>}
              {r.pros && (
                <p>
                  <span className="text-muted-foreground">Понравилось: </span>
                  {r.pros}
                </p>
              )}
              {r.cons && (
                <p>
                  <span className="text-muted-foreground">Не понравилось: </span>
                  {r.cons}
                </p>
              )}
            </div>
            {r.photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {r.photos.map((uuid) => (
                  <button
                    key={uuid}
                    type="button"
                    onClick={() => setOpen({ uuid, who: `${r.name}, ${r.date}` })}
                    className="overflow-hidden rounded-md bg-well"
                    aria-label="Открыть фото"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(reviewPhoto(uuid, true))} alt="" width={64} height={64} loading="lazy" className="size-16 object-cover" />
                  </button>
                ))}
              </div>
            )}
            {r.answer && (
              <p className="rounded-md bg-muted p-3 text-xs leading-relaxed">
                <span className="font-medium">Ответ продавца: </span>
                {r.answer}
              </p>
            )}
          </li>
        ))}
      </ul>

      {list.length > shown && (
        <Button variant="outline" className="self-start bg-card" onClick={() => setShown((n) => n + PAGE)}>
          Показать ещё {Math.min(PAGE, list.length - shown)}
        </Button>
      )}

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-[min(92vw,720px)] gap-3 bg-card p-3 sm:max-w-[min(92vw,720px)]">
          <DialogTitle className="sr-only">Фото покупателя</DialogTitle>
          <DialogDescription className="px-1 text-xs">{open?.who}</DialogDescription>
          {open && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset(reviewPhoto(open.uuid))} alt={`Фото покупателя: ${open.who}`} className="max-h-[75vh] w-full rounded-md bg-well object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`Оценка ${value} из 5`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn("size-3.5", n <= value ? "fill-brass-soft text-brass" : "text-border")} aria-hidden />
      ))}
    </span>
  )
}
