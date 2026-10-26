// Real assortment of the WB seller «Посуда GLASS» (seller 250096444), snapshot 26.10.2026.
// Prices are WB prices with WB Wallet on that date. Sizes come from the cards and the «Размеры» photos.
// Names are rewritten: third-party marks from WB titles (SMEG, Рогашка/Rogaška, Diamonds) are dropped.

export type CategoryId = "stands" | "roll" | "menazh" | "sweets" | "lemon" | "tea" | "butter" | "boards"

export const categories: { id: CategoryId; name: string; hint: string }[] = [
  { id: "stands", name: "Блюда на ножке", hint: "фрукты, пирожные, салаты" },
  { id: "roll", name: "Рулетницы", hint: "рулеты, выпечка, нарезка" },
  { id: "menazh", name: "Менажницы", hint: "орехи, сухофрукты, сладости" },
  { id: "sweets", name: "Конфетницы и креманки", hint: "конфеты, мороженое, варенье" },
  { id: "lemon", name: "Лимонницы", hint: "лимон к чаю" },
  { id: "tea", name: "Кружки и стаканы", hint: "чай, кофе, напитки" },
  { id: "butter", name: "Маслёнки", hint: "масло, сыр, лимон" },
  { id: "boards", name: "Доски для подачи", hint: "стейк, хлеб, рыба" },
]

export type Size =
  | { kind: "rect"; l: number; w: number; h?: number }
  | { kind: "round"; d: number; h?: number }

export type Product = {
  id: string
  name: string
  category: CategoryId
  price: number
  rating?: number
  reviews: number
  size: Size
  sizeLabel: string
  pieces?: number
  volume?: number
  material: string
  legs?: "золотистая" | "серебристая" | "стеклянная"
  country?: string
  /** From the WB card or its photos; omitted when the seller doesn't say. */
  care?: "hand" | "machine"
  photos: number
  hit?: boolean
  text: string
}

export const products: Product[] = [
  {
    id: "831189565", name: "Рулетница на золотых ножках, 30 см", category: "roll", price: 2093, rating: 4.8, reviews: 57,
    size: { kind: "rect", l: 30, w: 15, h: 7 }, sizeLabel: "30 × 15 см, высота 7 см", material: "стекло, металл", legs: "золотистая",
    care: "hand", photos: 5, hit: true,
    text: "Прямоугольное рельефное стекло с золотой каймой на четырёх металлических ножках. Помещается целый рулет, круассаны или выпечка.",
  },
  {
    id: "832504458", name: "Кружки для чая гранёные, 6 шт. по 180 мл", category: "tea", price: 817, rating: 4.9, reviews: 81,
    size: { kind: "round", d: 7, h: 10 }, sizeLabel: "Ø 7 см, высота 10 см", pieces: 6, volume: 180, material: "стекло",
    care: "machine", photos: 5, hit: true,
    text: "Шесть гранёных кружек с удобной ручкой, по 180 мл. Можно мыть в посудомоечной машине.",
  },
  {
    id: "845992505", name: "Блюдо фарфоровое на ножках, 25 см", category: "stands", price: 1511, rating: 4.9, reviews: 39,
    size: { kind: "rect", l: 25, w: 16, h: 6 }, sizeLabel: "25 × 16 см, высота 6 см", material: "фарфор, металл", legs: "золотистая",
    care: "hand", photos: 5, hit: true,
    text: "Белое блюдо с волнистым краем и рельефом на дне, стоит на золотистых ножках. Под салат, фрукты или пирожные.",
  },
  {
    id: "963598768", name: "Доска для подачи круглая, 25 см", category: "boards", price: 715, rating: 5, reviews: 39,
    size: { kind: "round", d: 25, h: 2 }, sizeLabel: "Ø 25 см, бортик 2 см", material: "дерево, пропитка льняным маслом",
    care: "hand", photos: 5, hit: true,
    text: "Круглая деревянная доска с углублением и бортиком 2 см. Для хлеба, сыра, капкейков и роллов.",
  },
  {
    id: "787326583", name: "Менажница на золотых ножках, 3 секции", category: "menazh", price: 2211, rating: 4.8, reviews: 35,
    size: { kind: "rect", l: 30, w: 15, h: 7 }, sizeLabel: "30 × 15 см, высота 7 см", material: "стекло, металл", legs: "золотистая",
    care: "hand", photos: 5, hit: true,
    text: "Три секции под орехи, сухофрукты и конфеты. Кайма матовым золотом, ножки металлические — менажница стоит устойчиво.",
  },
  {
    id: "845919844", name: "Лимонницы на серебристой ножке, 2 шт.", category: "lemon", price: 1260, rating: 5, reviews: 26,
    size: { kind: "round", d: 11, h: 4.5 }, sizeLabel: "Ø 11 см, высота 4,5 см", pieces: 2, material: "стекло, металл", legs: "серебристая",
    country: "Турция", care: "hand", photos: 5, hit: true,
    text: "Пара лимонниц с гранёным дном на металлической ножке. Под нарезанный лимон к чаю, варенье или мёд.",
  },
  {
    id: "846029415", name: "Блюдо фарфоровое на ножках, 30 см", category: "stands", price: 2052, rating: 4.9, reviews: 26,
    size: { kind: "rect", l: 30, w: 20, h: 6 }, sizeLabel: "30 × 20 см, высота 6 см", material: "фарфор, металл", legs: "золотистая",
    care: "hand", photos: 5,
    text: "Большое фарфоровое блюдо на золотистых ножках. Фруктовая тарелка или салат на всю семью.",
  },
  {
    id: "785572732", name: "Блюдо на ножке овальное, 25 см", category: "stands", price: 1304, rating: 5, reviews: 23,
    size: { kind: "rect", l: 25, w: 19, h: 12 }, sizeLabel: "25 × 19 см, высота 12 см", material: "стекло, металл", legs: "золотистая",
    country: "Турция", photos: 5,
    text: "Рифлёное стекло с золотой каймой на литой ножке. Под печенье, клубнику в шоколаде, фрукты.",
  },
  {
    id: "787294058", name: "Блюдо на ножке круглое, 20 см", category: "stands", price: 1304, rating: 5, reviews: 19,
    size: { kind: "round", d: 20, h: 10 }, sizeLabel: "Ø 20 см, высота 10 см", material: "стекло, металл", legs: "золотистая",
    country: "Турция", care: "hand", photos: 5,
    text: "Круглое блюдо с золотой каймой на ножке со стеклянной вставкой. Для капкейков, пирожных, бенто-торта.",
  },
  {
    id: "780286917", name: "Конфетница с золотой каймой на ножке", category: "sweets", price: 817, rating: 4.9, reviews: 19,
    size: { kind: "round", d: 11, h: 9.5 }, sizeLabel: "Ø 11 см, высота 9,5 см", material: "стекло, металл", legs: "серебристая",
    country: "Турция", care: "hand", photos: 5,
    text: "Чаша с золотой каймой на ножке в виде листьев. По отзывам, помещается целая упаковка конфет или три шарика мороженого.",
  },
  {
    id: "787375072", name: "Блюдца овальные с каймой, 3 шт.", category: "sweets", price: 738, rating: 4.9, reviews: 17,
    size: { kind: "rect", l: 15.5, w: 9.5, h: 2.5 }, sizeLabel: "15,5 × 9,5 см, высота 2,5 см", pieces: 3, material: "стекло",
    care: "hand", photos: 5,
    text: "Три небольших блюдца с золотой каймой — под орехи, изюм, драже. Продаются в подарочной коробке.",
  },
  {
    id: "784711627", name: "Креманка с золотой каймой", category: "sweets", price: 530, rating: 4.9, reviews: 16,
    size: { kind: "round", d: 10, h: 8 }, sizeLabel: "Ø 10 см, высота 8 см", material: "стекло",
    care: "hand", photos: 5,
    text: "Порционная креманка на короткой ножке. Мороженое, десерт, конфеты к чаю.",
  },
  {
    id: "952658967", name: "Лимонница на ножке, 15,5 см", category: "lemon", price: 927, rating: 5, reviews: 16,
    size: { kind: "rect", l: 15.5, w: 9.5, h: 6 }, sizeLabel: "15,5 × 9,5 см, высота 6 см", material: "стекло, металл", legs: "серебристая",
    country: "Турция", care: "hand", photos: 5,
    text: "Вытянутая лимонница с рифлёным краем на серебристой ножке. Лимон, лайм, нарезанные фрукты.",
  },
  {
    id: "963704973", name: "Доска для подачи круглая, 30 см", category: "boards", price: 840, rating: 4.9, reviews: 16,
    size: { kind: "round", d: 30, h: 2 }, sizeLabel: "Ø 30 см, бортик 2 см", material: "дерево, пропитка льняным маслом",
    care: "hand", photos: 5,
    text: "Большая доска с углублением — стейк, пицца, сырная тарелка на компанию.",
  },
  {
    id: "778118975", name: "Конфетница квадратная на литой ножке", category: "sweets", price: 2240, rating: 4.9, reviews: 15,
    size: { kind: "rect", l: 12, w: 12, h: 15.5 }, sizeLabel: "12 × 12 см, высота 15,5 см", material: "стекло, металл", legs: "золотистая",
    country: "Турция", care: "hand", photos: 5,
    text: "Квадратная чаша на тяжёлой литой ножке с позолотой. Самая высокая вещь в коллекции — центр сладкого стола.",
  },
  {
    id: "811446619", name: "Кружки с золотой каймой, 6 шт. по 250 мл", category: "tea", price: 721, rating: 4.6, reviews: 14,
    size: { kind: "round", d: 7, h: 9 }, sizeLabel: "Ø 7 см, высота 9 см", pieces: 6, volume: 250, material: "стекло",
    care: "hand", photos: 5,
    text: "Рифлёные кружки с каймой матовым золотом. Шесть штук в подарочной коробке.",
  },
  {
    id: "965154595", name: "Менажница стеклянная, 3 секции", category: "menazh", price: 653, rating: 4.7, reviews: 12,
    size: { kind: "rect", l: 30, w: 15, h: 3 }, sizeLabel: "30 × 15 см", material: "стекло",
    care: "machine", photos: 5,
    text: "Прозрачная менажница с рельефом без ножек. Можно в посудомоечную машину и микроволновку.",
  },
  {
    id: "967591807", name: "Рулетница стеклянная, 30 см", category: "roll", price: 555, rating: 4.8, reviews: 12,
    size: { kind: "rect", l: 30, w: 15, h: 3 }, sizeLabel: "30 × 15 см", material: "стекло",
    photos: 5,
    text: "Рельефная рулетница без ножек — для рулета, нарезки, канапе. Самый доступный вариант.",
  },
  {
    id: "1110279870", name: "Доска для подачи с соусником, 28 см", category: "boards", price: 840, rating: 4.9, reviews: 9,
    size: { kind: "rect", l: 28, w: 16, h: 2 }, sizeLabel: "28 × 16 см, бортик 2 см", material: "дерево",
    care: "hand", photos: 5,
    text: "Прямоугольная доска с круглой выемкой под соус или лимон. Под рыбу, стейк, роллы.",
  },
  {
    id: "787306300", name: "Рулетница на литой ножке, 30 см", category: "roll", price: 884, rating: 4.3, reviews: 6,
    size: { kind: "rect", l: 30, w: 15, h: 12 }, sizeLabel: "30 × 15 см, высота 12 см", material: "стекло, металл", legs: "золотистая",
    care: "hand", photos: 5,
    text: "Рулетница с золотой каймой на одной высокой ножке. Подача выпечки и печенья.",
  },
  {
    id: "967582053", name: "Менажница на серебристых ножках", category: "menazh", price: 1680, rating: 5, reviews: 6,
    size: { kind: "rect", l: 30, w: 15, h: 7 }, sizeLabel: "30 × 15 см", material: "стекло, металл", legs: "серебристая",
    photos: 5,
    text: "Три секции с гранёным рельефом на серебристых ножках. Ягоды, орехи, конфеты.",
  },
  {
    id: "811238036", name: "Менажница круглая гранёная, 28 см", category: "menazh", price: 1474, rating: 5, reviews: 4,
    size: { kind: "round", d: 28, h: 2 }, sizeLabel: "Ø 28 см, высота 2 см", material: "стекло",
    photos: 4,
    text: "Круглая менажница с лучевым рельефом и секциями. В подарочной коробке.",
  },
  {
    id: "1129528753", name: "Рулетница на ножках с декором «Оливки»", category: "roll", price: 2277, rating: 5, reviews: 4,
    size: { kind: "rect", l: 30, w: 15, h: 7 }, sizeLabel: "30 × 15 см, высота 7 см", material: "стекло, металл", legs: "золотистая",
    photos: 5,
    text: "Рулетница на золотистых ножках с декоративной веточкой на ручке. Подарочный вариант.",
  },
  {
    id: "800747620", name: "Стаканы гранёные, 6 шт. по 280 мл", category: "tea", price: 508, rating: 4.5, reviews: 2,
    size: { kind: "round", d: 8, h: 9 }, sizeLabel: "Ø 8 см, высота 9 см", pieces: 6, volume: 280, material: "стекло",
    photos: 4,
    text: "Шесть стаканов с гранями для сока, воды и горячих напитков. В подарочной коробке.",
  },
  {
    id: "1162398207", name: "Розетки для варенья на ножке, 2 шт.", category: "sweets", price: 763, rating: 5, reviews: 1,
    size: { kind: "round", d: 9, h: 5.5 }, sizeLabel: "Ø 9 см, высота 5,5 см", pieces: 2, material: "стекло, металл", legs: "золотистая",
    care: "hand", photos: 5,
    text: "Две розетки с сотовым рельефом и золотой каймой на ножке-листе. Варенье, мёд, джем.",
  },
  {
    id: "1162790195", name: "Розетки «Жемчуг» на ножке, 2 шт.", category: "sweets", price: 582, reviews: 0,
    size: { kind: "round", d: 8, h: 5.5 }, sizeLabel: "Ø 8 см, высота 5,5 см", pieces: 2, material: "стекло, металл", legs: "золотистая",
    care: "hand", photos: 5,
    text: "Розетки с краем из золотых бусин на ножке-листе. Для варенья и мёда к чаю.",
  },
  {
    id: "1280101349", name: "Маслёнка с куполом «Жемчуг»", category: "butter", price: 427, rating: 5, reviews: 5,
    size: { kind: "round", d: 14, h: 9 }, sizeLabel: "Ø 14 см, высота 9 см", material: "стекло", country: "Китай",
    photos: 5,
    text: "Стеклянная маслёнка с крышкой-куполом и бусинами по краю. Масло, сыр, нарезанный лимон.",
  },
  {
    id: "1280119642", name: "Маслёнка с куполом гладкая", category: "butter", price: 427, rating: 5, reviews: 3,
    size: { kind: "round", d: 14, h: 8 }, sizeLabel: "Ø 14 см, высота 8 см", material: "стекло", country: "Китай",
    care: "machine", photos: 5,
    text: "Классическая маслёнка с гладким куполом. Можно мыть в посудомоечной машине.",
  },
  {
    id: "1280082140", name: "Маслёнка с куполом «Рельеф»", category: "butter", price: 427, rating: 5, reviews: 2,
    size: { kind: "round", d: 14, h: 8 }, sizeLabel: "Ø 14 см, высота 8 см", material: "стекло", country: "Китай",
    care: "machine", photos: 5,
    text: "Маслёнка с рифлёным куполом. Подходит для посудомоечной машины и микроволновки.",
  },
  {
    id: "1329329164", name: "Лимонницы на стеклянной ножке, 2 шт.", category: "lemon", price: 598, rating: 2, reviews: 1,
    size: { kind: "round", d: 11, h: 7 }, sizeLabel: "Ø 11 см, высота 7 см", pieces: 2, material: "стекло", legs: "стеклянная",
    country: "Китай", care: "machine", photos: 5,
    text: "Пара полностью стеклянных лимонниц с гранёной чашей. Можно в посудомоечную машину.",
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function categoryName(id: CategoryId) {
  return categories.find((c) => c.id === id)?.name ?? ""
}

export function photo(id: string, n: number | "cover") {
  return `/p/${id}/${n}.webp`
}

/** Rating is shown only when there are enough reviews to mean something. */
export function showRating(p: Product) {
  return p.rating !== undefined && p.reviews >= 3
}

export type Review = { name: string; date: string; productId: string; text: string }

// Real WB reviews of this seller (wording kept, trimmed to the point).
export const reviews: Review[] = [
  { name: "Зарина", date: "март 2026", productId: "831189565", text: "Отличная рулетница, качественная, тяжелая, можно использовать под все. Пришла целая, хорошо упаковано, заказала еще на подарок." },
  { name: "Айша", date: "июль 2026", productId: "778118975", text: "Прочное стекло и металлическая ножка, тяжёлая, что тоже считаю плюсом! Доставлен целым и хорошо запакованным." },
  { name: "Светлана", date: "февраль 2026", productId: "787326583", text: "Очень легко собирается и обалденно смотрится! Нарядная, изящная менажница! Если на подарок, то идея супер!" },
  { name: "Елена", date: "октябрь 2026", productId: "785572732", text: "Взяла на подарок коллеге, уверена, что понравится! И себе обязательно закажу!" },
  { name: "Татьяна", date: "июнь 2026", productId: "780286917", text: "На вид маленькая вазочка, а по вместимости очень даже неплохо, вошла целая упаковка конфет." },
  { name: "Эльмира", date: "май 2026", productId: "832504458", text: "Коробку хорошо упаковали, ничего не разбилось, всё прекрасно, всё целое." },
]
