import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#24211E]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
