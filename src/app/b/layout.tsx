import { CartProvider } from "@/components/store/cart"
import { DemoBar } from "@/components/shared/demo-bar"
import { SiteFooter } from "@/components/shared/footer"
import { StoreHeader } from "./_components/header"

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider storageKey="glass-demo-b-cart">
      <DemoBar variant="B" />
      <StoreHeader />
      <main>{children}</main>
      <SiteFooter base="/b" />
    </CartProvider>
  )
}
