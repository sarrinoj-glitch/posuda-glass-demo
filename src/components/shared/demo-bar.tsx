import Link from "next/link"

export function DemoBar({ variant }: { variant: "B" | "C" }) {
  const other = variant === "B" ? { href: "/c/", label: "Открыть вариант C" } : { href: "/b/", label: "Открыть вариант B" }
  return (
    <div className="bg-ink text-ink-foreground">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 text-xs">
        <span>
          Демо, вариант {variant}: {variant === "B" ? "интернет-магазин с корзиной и оплатой" : "бутик сервировки: наборы, подарки, опт"}
        </span>
        <span className="flex gap-4">
          <Link href="/" className="underline-offset-2 hover:underline">
            Сравнение вариантов
          </Link>
          <Link href={other.href} className="underline-offset-2 hover:underline">
            {other.label}
          </Link>
        </span>
      </div>
    </div>
  )
}
