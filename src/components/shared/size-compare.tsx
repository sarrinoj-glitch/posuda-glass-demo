import type { Product } from "@/lib/catalog"

// Side view drawn to scale next to a phone (7 × 15 cm), so «оказалось маленьким» stops happening.
// 1 cm = 8 px in the viewBox; the SVG then scales to its container.
const CM = 8
const PHONE = { w: 7, h: 15 }

function fmt(n: number) {
  return String(n).replace(".", ",")
}

export function SizeCompare({ product }: { product: Product }) {
  const s = product.size
  const width = s.kind === "rect" ? s.l : s.d
  const height = s.h ?? 2.5
  const legs = product.legs

  const pad = 28
  const gap = 36
  const phoneW = PHONE.w * CM
  const phoneH = PHONE.h * CM
  const itemW = width * CM
  const itemH = height * CM
  const drawH = Math.max(phoneH, itemH)
  const vbW = pad + phoneW + gap + itemW + pad + 44
  const vbH = drawH + pad + 44
  const ground = pad + drawH

  const x0 = pad + phoneW + gap
  const shape = itemShape({ x: x0, ground, w: itemW, h: itemH, legs, kind: s.kind, cat: product.category })

  return (
    <figure className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="h-auto w-full max-w-[460px]"
        role="img"
        aria-label={`${product.name}: ширина ${fmt(width)} см, высота ${fmt(height)} см рядом с телефоном высотой 15 см`}
      >
        <line x1={8} x2={vbW - 8} y1={ground} y2={ground} className="stroke-foreground/30" strokeWidth={1} />

        {/* phone */}
        <rect x={pad} y={ground - phoneH} width={phoneW} height={phoneH} rx={9} className="fill-foreground/10 stroke-foreground/50" strokeWidth={1.2} />
        <rect x={pad + 5} y={ground - phoneH + 8} width={phoneW - 10} height={phoneH - 18} rx={4} className="fill-foreground/5" />
        <text x={pad + phoneW / 2} y={ground + 18} textAnchor="middle" className="fill-muted-foreground text-[11px]">
          телефон
        </text>
        <text x={pad + phoneW / 2} y={ground + 32} textAnchor="middle" className="fill-muted-foreground text-[11px]">
          15 см
        </text>

        {/* item */}
        <g className="fill-brass-soft/35 stroke-brass" strokeWidth={1.4} strokeLinejoin="round">
          {shape}
        </g>

        {/* width */}
        <line x1={x0} x2={x0 + itemW} y1={ground + 14} y2={ground + 14} className="stroke-foreground/60" strokeWidth={1} />
        <line x1={x0} x2={x0} y1={ground + 9} y2={ground + 19} className="stroke-foreground/60" strokeWidth={1} />
        <line x1={x0 + itemW} x2={x0 + itemW} y1={ground + 9} y2={ground + 19} className="stroke-foreground/60" strokeWidth={1} />
        <text x={x0 + itemW / 2} y={ground + 32} textAnchor="middle" className="fill-foreground text-[12px] font-medium">
          {fmt(width)} см
        </text>

        {/* height */}
        {s.h !== undefined && (
          <>
            <line x1={x0 + itemW + 12} x2={x0 + itemW + 12} y1={ground - itemH} y2={ground} className="stroke-foreground/60" strokeWidth={1} />
            <text
              x={x0 + itemW + 18}
              y={ground - itemH / 2 + 4}
              className="fill-foreground text-[12px] font-medium"
            >
              {fmt(height)} см
            </text>
          </>
        )}
      </svg>
      <figcaption className="text-xs text-muted-foreground">
        Вид сбоку в масштабе рядом с телефоном. {product.sizeLabel}.
      </figcaption>
    </figure>
  )
}

function itemShape({
  x,
  ground,
  w,
  h,
  legs,
  kind,
  cat,
}: {
  x: number
  ground: number
  w: number
  h: number
  legs?: Product["legs"]
  kind: "rect" | "round"
  cat: Product["category"]
}) {
  const top = ground - h
  // Mugs and glasses: a plain tumbler.
  if (cat === "tea") {
    return <path d={`M${x} ${top} L${x + w} ${top} L${x + w - 3} ${ground} L${x + 3} ${ground} Z`} />
  }
  // Butter dishes: a plate with a dome.
  if (cat === "butter") {
    const plate = 1.2 * CM
    const domeW = w * 0.72
    const cx = x + w / 2
    return (
      <>
        <rect x={x} y={ground - plate} width={w} height={plate} rx={3} />
        <path d={`M${cx - domeW / 2} ${ground - plate} Q${cx - domeW / 2} ${top} ${cx} ${top} Q${cx + domeW / 2} ${top} ${cx + domeW / 2} ${ground - plate} Z`} />
      </>
    )
  }
  // Flat pieces: trays, boards, saucers.
  if (h <= 3 * CM) {
    return <rect x={x} y={top} width={w} height={h} rx={3} />
  }
  // Trays on four short legs (рулетницы, менажницы, фарфоровые блюда).
  if (legs && kind === "rect" && h <= 8 * CM) {
    const body = Math.min(h * 0.55, 3 * CM)
    const legW = Math.max(5, w * 0.05)
    return (
      <>
        <path d={`M${x} ${top} L${x + w} ${top} L${x + w - 6} ${top + body} L${x + 6} ${top + body} Z`} />
        <rect x={x + w * 0.1} y={top + body} width={legW} height={h - body} rx={1.5} />
        <rect x={x + w * 0.9 - legW} y={top + body} width={legW} height={h - body} rx={1.5} />
      </>
    )
  }
  // Bowls and dishes on a single stem.
  if (legs || h > w * 0.5) {
    const bowl = h * 0.5
    const stemW = Math.max(6, w * 0.12)
    const footW = Math.max(18, w * 0.42)
    const cx = x + w / 2
    return (
      <>
        <path d={`M${x} ${top} L${x + w} ${top} Q${x + w * 0.82} ${top + bowl} ${cx + stemW} ${top + bowl} L${cx - stemW} ${top + bowl} Q${x + w * 0.18} ${top + bowl} ${x} ${top} Z`} />
        <rect x={cx - stemW / 2} y={top + bowl} width={stemW} height={h - bowl - 4} />
        <rect x={cx - footW / 2} y={ground - 4} width={footW} height={4} rx={2} />
      </>
    )
  }
  return <rect x={x} y={top} width={w} height={h} rx={6} />
}
