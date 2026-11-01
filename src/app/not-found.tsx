import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[70vh] flex-col items-start justify-center gap-5 py-16">
      <span className="font-display text-3xl">GLASS</span>
      <h1 className="font-display text-5xl font-semibold md:text-6xl">Такой страницы нет</h1>
      <p className="max-w-md text-muted-foreground">
        Возможно, ссылка устарела или в адресе опечатка. Откройте один из вариантов сайта или страницу сравнения.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Сравнение вариантов</Link>
        </Button>
        <Button asChild variant="outline" className="bg-card">
          <Link href="/b/">Вариант B</Link>
        </Button>
        <Button asChild variant="outline" className="bg-card">
          <Link href="/c/">Вариант C</Link>
        </Button>
      </div>
    </main>
  )
}
