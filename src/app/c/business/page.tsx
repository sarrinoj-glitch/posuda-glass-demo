import { Building2, Cake, FileText, PackageOpen, Repeat } from "lucide-react"
import { ProductImage } from "@/components/shared/product-image"
import { BusinessForm } from "./business-form"

export const metadata = { title: "Опт для бизнеса — GLASS" }

const picks = ["831189565", "787294058", "846029415", "778118975"]

export default function BusinessPage() {
  return (
    <>
      <section className="wrap grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-5xl leading-[0.95] font-semibold md:text-6xl">
            Посуда на ножке для кондитеров, кафе и банкетных залов
          </h1>
          <p className="max-w-lg text-muted-foreground md:text-lg">
            Те же блюда, рулетницы и конфетницы, что на Wildberries, но партиями: одинаковые артикулы, допоставка и счёт
            для ИП или компании.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="flex gap-3">
              <Cake className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <span className="text-sm">
                <span className="block font-medium">Кондитеры</span>
                <span className="text-muted-foreground">подача и фото тортов, рулетов, бенто</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Building2 className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <span className="text-sm">
                <span className="block font-medium">Банкетные залы и кафе</span>
                <span className="text-muted-foreground">десятки одинаковых блюд на один зал</span>
              </span>
            </li>
            <li className="flex gap-3">
              <PackageOpen className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <span className="text-sm">
                <span className="block font-medium">Оформители и прокат</span>
                <span className="text-muted-foreground">сладкие столы, свадьбы, кэнди-бары</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Repeat className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
              <span className="text-sm">
                <span className="block font-medium">Допоставка</span>
                <span className="text-muted-foreground">разбилось в зале — привезём такой же артикул</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-2 self-start">
          {picks.map((id) => (
            <ProductImage key={id} id={id} alt="" eager className="rounded-lg" />
          ))}
        </div>
      </section>

      <section className="border-y bg-card py-14" aria-labelledby="terms-h">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-4">
            <h2 id="terms-h" className="font-display text-4xl font-semibold">Условия</h2>
            <div className="overflow-x-auto rounded-lg border bg-background">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3 font-medium">Объём</th>
                    <th className="p-3 font-medium">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">до 10 шт. одной позиции</td>
                    <td className="p-3 text-muted-foreground">розничная</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">от 10 шт.</td>
                    <td className="p-3 text-muted-foreground">оптовая, пришлём прайс</td>
                  </tr>
                  <tr>
                    <td className="p-3">от 50 шт. или постоянные поставки</td>
                    <td className="p-3 text-muted-foreground">индивидуально</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <FileText className="mt-0.5 size-4 shrink-0" aria-hidden />
              Пороги в таблице — пример для демо, точные условия задаёт владелец.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-4xl font-semibold">Запрос прайса</h2>
            <BusinessForm />
          </div>
        </div>
      </section>
    </>
  )
}
