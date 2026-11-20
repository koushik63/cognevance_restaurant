import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Reservations', to: '/reservations' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const { totalItems, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F3EC]/92 backdrop-blur-md border-b border-[#24211E]/10'
          : 'bg-[#F7F3EC]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C56B45] rounded-md"
        >
          <span className="w-8 h-8 rounded-full border border-[#C56B45]/50 flex items-center justify-center bg-[#EFE7DC] group-hover:bg-[#C56B45] transition-colors duration-300">
            <span className="w-2.5 h-2.5 rotate-45 bg-[#C56B45] group-hover:bg-[#FFFFFF] transition-colors duration-300" />
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#24211E] leading-none">
              Saffron &amp; Stone
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#756C62] mt-1 hidden sm:block">
              Contemporary Kitchen
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#C56B45]'
                    : 'text-[#24211E]/85 hover:text-[#C56B45]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#C56B45]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open shopping cart with ${totalItems} items`}
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#EFE7DC] hover:bg-[#24211E] text-[#24211E] hover:text-[#FFFFFF] transition-colors duration-300 text-sm font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C56B45]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            <motion.span
              key={totalItems}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#C56B45] text-[#FFFFFF] text-[11px] font-semibold"
            >
              {totalItems}
            </motion.span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2.5 rounded-full bg-[#EFE7DC] text-[#24211E] hover:bg-[#24211E] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile navigation"
            className="md:hidden overflow-hidden bg-[#F7F3EC] border-b border-[#24211E]/10"
          >
            <div className="px-4 py-5 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EFE7DC] text-[#C56B45]'
                        : 'text-[#24211E] hover:bg-[#EFE7DC]/60'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/checkout"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-[#24211E] text-[#FFFFFF] text-center text-sm font-medium"
              >
                View Cart &amp; Checkout ({totalItems})
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
