import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import fallbackImg from '../assets/hero-dining.jpg';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/format';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    subtotal,
    deliveryCharge,
    total,
    freeDeliveryRemaining,
  } = useCart();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#24211E]/50 backdrop-blur-[2px]"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="relative z-10 w-full max-w-md bg-[#F7F3EC] h-full flex flex-col border-l border-[#24211E]/10"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#24211E]/10 flex items-center justify-between bg-[#FFFFFF]">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#24211E]">
                  Your Order
                </h2>
                <p className="text-xs text-[#756C62] mt-0.5">
                  Prepared fresh to order
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart drawer"
                className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#24211E] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Banner */}
            {items.length > 0 && (
              <div className="px-6 py-3 bg-[#EFE7DC] border-b border-[#24211E]/8 text-xs text-[#24211E]">
                {freeDeliveryRemaining > 0 ? (
                  <span>
                    Add <strong className="text-[#C56B45]">{formatINR(freeDeliveryRemaining)}</strong> more for complimentary delivery
                  </span>
                ) : (
                  <span className="font-medium text-emerald-800">
                    Complimentary delivery unlocked on your order.
                  </span>
                )}
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#EFE7DC] flex items-center justify-center text-[#C56B45] mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl text-[#24211E]">
                    Your table order is empty
                  </h3>
                  <p className="text-sm text-[#756C62] mt-2 max-w-xs">
                    Explore our starters, slow-simmered Indian classics, and wood-fired Italian dishes.
                  </p>
                  <Link
                    to="/menu"
                    onClick={closeDrawer}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#24211E] text-[#FFFFFF] text-sm font-medium hover:bg-[#C56B45] transition-colors"
                  >
                    Explore Menu
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map(({ item, quantity }) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#24211E]/8"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = fallbackImg;
                          }}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#EFE7DC]"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-base font-medium text-[#24211E] leading-snug truncate">
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                              className="text-[#756C62] hover:text-rose-700 transition-colors p-1 cursor-pointer shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center rounded-full bg-[#EFE7DC] p-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, quantity - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[#24211E] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center text-xs font-semibold text-[#24211E]">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, quantity + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[#24211E] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="font-serif font-semibold text-[#24211E]">
                              {formatINR(item.price * quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-[#FFFFFF] border-t border-[#24211E]/10 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#756C62]">
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#756C62]">
                    <span>Delivery Charge</span>
                    <span>
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-700 font-medium">Complimentary</span>
                      ) : (
                        formatINR(deliveryCharge)
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#EFE7DC] flex justify-between items-baseline">
                    <span className="font-medium text-[#24211E]">Total</span>
                    <span className="font-serif text-2xl font-semibold text-[#24211E]">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={closeDrawer}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C56B45] hover:bg-[#AD5835] text-[#FFFFFF] font-medium text-sm tracking-wide transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
