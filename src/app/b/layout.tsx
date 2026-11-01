import { CartProvider } from "@/components/store/cart"
import { FavoritesProvider } from "@/components/store/favorites"
import { DemoBar } from "@/components/shared/demo-bar"
import { FloatingChat } from "@/components/shared/floating-chat"
import { SiteFooter } from "@/components/shared/footer"
import { StoreHeader } from "./_components/header"

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider storageKey="glass-demo-b-cart">
      <FavoritesProvider>
        <DemoBar variant="B" />
        <StoreHeader />
        <main>{children}</main>
        <SiteFooter base="/b" />
        <FloatingChat />
      </FavoritesProvider>
    </CartProvider>
  )
}
