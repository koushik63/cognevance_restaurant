import { motion } from 'framer-motion';
import { Check, Clock, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import fallbackDiningImg from '../assets/hero-dining.jpg';
import { useCart } from '../hooks/useCart';
import type { MenuItem } from '../types';
import { formatINR } from '../utils/format';

interface DishCardProps {
  item: MenuItem;
}

export function DishCard({ item }: DishCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [imgSrc, setImgSrc] = useState(item.image);
  const [justAdded, setJustAdded] = useState(false);

  const cartEntry = items.find((entry) => entry.item.id === item.id);
  const quantityInCart = cartEntry?.quantity ?? 0;

  const handleAdd = () => {
    addItem(item, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#24211E]/8 transition-colors duration-300 hover:border-[#C56B45]/40"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE7DC]">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => setImgSrc(fallbackDiningImg)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24211E]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFFFFF]/95 backdrop-blur-sm text-[11px] font-medium tracking-wide text-[#24211E] border border-[#24211E]/10"
            aria-label={item.dietary === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
          >
            <span
              className={`w-2.5 h-2.5 rounded-[2px] border flex items-center justify-center ${
                item.dietary === 'veg' ? 'border-emerald-700' : 'border-rose-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.dietary === 'veg' ? 'bg-emerald-700' : 'bg-rose-700'
                }`}
              />
            </span>
            {item.dietary === 'veg' ? 'Veg' : 'Non-Veg'}
          </span>

          {item.popular && (
            <span className="px-2.5 py-1 rounded-full bg-[#24211E]/90 text-[#F7F3EC] text-[11px] font-medium tracking-wider uppercase">
              Signature
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2 text-xs text-[#756C62] mb-2">
          <span className="uppercase tracking-[0.14em] font-medium text-[#C56B45]">
            {item.category}
          </span>
          {item.prepTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {item.prepTime}
            </span>
          )}
        </div>

        <h3 className="font-serif text-xl font-medium text-[#24211E] leading-snug group-hover:text-[#C56B45] transition-colors">
          {item.name}
        </h3>

        <p className="mt-2 text-sm text-[#756C62] leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        <div className="mt-5 pt-4 border-t border-[#EFE7DC] flex items-center justify-between gap-3">
          <div>
            <span className="font-serif text-xl font-semibold text-[#24211E]">
              {formatINR(item.price)}
            </span>
          </div>

          {quantityInCart === 0 ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={handleAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#24211E] text-[#FFFFFF] text-xs font-medium tracking-wide hover:bg-[#C56B45] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C56B45]"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                  Add to Cart
                </>
              )}
            </motion.button>
          ) : (
            <div
              className="inline-flex items-center rounded-full bg-[#EFE7DC] p-1 border border-[#24211E]/10"
              role="group"
              aria-label={`Quantity controls for ${item.name}`}
            >
              <button
                type="button"
                onClick={() => updateQuantity(item.id, quantityInCart - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#24211E] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-[#24211E]">
                {quantityInCart}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, quantityInCart + 1)}
                aria-label={`Increase quantity of ${item.name}`}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#24211E] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
