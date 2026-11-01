import type { Metadata, Viewport } from "next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const SITE = "https://sarrinoj-glitch.github.io/posuda-glass-demo"

export const metadata: Metadata = {
  title: "Посуда GLASS — демо сайта",
  description: "Два варианта сайта для продавца посуды на золотой ножке: интернет-магазин и бутик сервировки.",
  robots: { index: false, follow: false },
  // Link preview in WhatsApp / Telegram when the demo is sent to the owner.
  openGraph: {
    title: "GLASS — посуда на золотой ножке",
    description: "Демо сайта: интернет-магазин и бутик сервировки на реальном ассортименте с Wildberries.",
    url: `${SITE}/`,
    siteName: "GLASS",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${SITE}/og.png`, width: 1200, height: 630, alt: "GLASS — посуда на золотой ножке" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#edeae5",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Onest:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
