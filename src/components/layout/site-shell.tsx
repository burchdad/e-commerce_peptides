'use client';

import { CartProvider } from '@/context/cart-context';

import { AgeGateModal } from '@/components/layout/age-gate-modal';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

export const SiteShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      <AgeGateModal />
      <Navbar />
      <main className="container py-10">{children}</main>
      <Footer />
    </CartProvider>
  );
};
