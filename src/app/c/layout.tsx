import { CartProvider } from "@/components/store/cart"
import { DemoBar } from "@/components/shared/demo-bar"
import { FloatingChat } from "@/components/shared/floating-chat"
import { SiteFooter } from "@/components/shared/footer"
import { BoutiqueHeader } from "./_components/header"

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider storageKey="glass-demo-c-order">
      <DemoBar variant="C" />
      <BoutiqueHeader />
      <main>{children}</main>
      <SiteFooter base="/c" />
      <FloatingChat />
    </CartProvider>
  )
}
