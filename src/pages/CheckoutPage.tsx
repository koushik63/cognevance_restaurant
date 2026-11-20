import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Info,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fallbackImg from '../assets/hero-dining.jpg';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { useCart } from '../hooks/useCart';
import type { ConfirmedOrder, OrderFormData, PaymentMethod } from '../types';
import { formatINR } from '../utils/format';

interface CheckoutErrors {
  customerName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export function CheckoutPage() {
  const {
    items,
    subtotal,
    deliveryCharge,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const validate = (): CheckoutErrors => {
    const next: CheckoutErrors = {};
    if (!form.customerName.trim() || form.customerName.trim().length < 2) {
      next.customerName = 'Please enter your full name.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      next.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.address.trim() || form.address.trim().length < 10) {
      next.address = 'Please enter your complete delivery address.';
    }
    return next;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      const refNum = Math.floor(100000 + Math.random() * 900000);
      const snapshot: ConfirmedOrder = {
        referenceId: `SS-DEMO-${refNum}`,
        items: [...items],
        subtotal,
        deliveryCharge,
        total,
        customer: { ...form },
        createdAt: new Date().toLocaleString('en-IN'),
      };
      setConfirmedOrder(snapshot);
      clearCart();
      setSubmitting(false);
    }, 500);
  };

  if (confirmedOrder) {
    return (
      <PageTransition>
        <section className="py-16 lg:py-24 bg-[#F7F3EC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#24211E]/10 space-y-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#C56B45]">
                  Demo Order Confirmed
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#24211E]">
                  Thank You, {confirmedOrder.customer.customerName}
                </h1>
                <p className="text-sm text-[#756C62]">
                  Demo Order Reference:{' '}
                  <strong className="font-mono text-[#24211E]">
                    {confirmedOrder.referenceId}
                  </strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#EFE7DC] border border-[#24211E]/10 flex items-start gap-3 text-xs sm:text-sm text-[#24211E]">
                <Info className="w-5 h-5 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong>Frontend Demonstration Only:</strong> No real payment was processed and no live kitchen order was dispatched. Configure an order-processing backend to enable live fulfillment.
                </p>
              </div>

              <div className="bg-[#F7F3EC] rounded-2xl p-6 space-y-4">
                <h2 className="font-serif text-xl font-medium text-[#24211E]">
                  Order Summary
                </h2>
                <ul className="space-y-2.5 text-sm">
                  {confirmedOrder.items.map(({ item, quantity }) => (
                    <li key={item.id} className="flex justify-between text-[#24211E]">
                      <span>
                        {quantity} × {item.name}
                      </span>
                      <span className="font-medium">
                        {formatINR(item.price * quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-[#24211E]/10 space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#756C62]">
                    <span>Subtotal</span>
                    <span>{formatINR(confirmedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#756C62]">
                    <span>Delivery Charge</span>
                    <span>
                      {confirmedOrder.deliveryCharge === 0
                        ? 'Complimentary'
                        : formatINR(confirmedOrder.deliveryCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between font-serif text-lg font-semibold text-[#24211E] pt-1">
                    <span>Total</span>
                    <span>{formatINR(confirmedOrder.total)}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#24211E]/10 text-xs text-[#756C62] space-y-1">
                  <div>
                    <strong>Payment Option:</strong>{' '}
                    {confirmedOrder.customer.paymentMethod === 'cod'
                      ? 'Cash on Delivery'
                      : 'Online Payment (Demonstration Only)'}
                  </div>
                  <div>
                    <strong>Delivery Address:</strong> {confirmedOrder.customer.address}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#24211E] hover:bg-[#C56B45] text-[#FFFFFF] text-sm font-medium transition-colors"
                >
                  Back to Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="bg-[#EFE7DC] py-14 lg:py-18 border-b border-[#24211E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Cart & Checkout"
              title="Complete Your Order"
              subtitle="Review your selected dishes, adjust quantities, and enter your delivery details below."
            />
          </Reveal>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="bg-[#FFFFFF] rounded-3xl p-12 sm:p-16 border border-[#24211E]/8 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EFE7DC] text-[#C56B45] flex items-center justify-center mx-auto mb-5">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl font-medium text-[#24211E]">
                Your Cart Is Currently Empty
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#756C62] max-w-md mx-auto">
                Add freshly prepared starters, Indian specials, wood-fired pizzas, or desserts from our menu to begin your order.
              </p>
              <Link
                to="/menu"
                className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C56B45] hover:bg-[#AD5835] text-[#FFFFFF] text-sm font-medium transition-colors"
              >
                Explore Our Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left: Cart Items + Delivery Form */}
              <div className="lg:col-span-7 space-y-8">
                {/* Cart Items List */}
                <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#24211E]/8 space-y-5">
                  <h2 className="font-serif text-2xl font-medium text-[#24211E]">
                    Selected Dishes ({items.reduce((s, i) => s + i.quantity, 0)})
                  </h2>
                  <ul className="divide-y divide-[#EFE7DC]">
                    {items.map(({ item, quantity }) => (
                      <li key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = fallbackImg;
                          }}
                          className="w-18 h-18 rounded-xl object-cover shrink-0 bg-[#EFE7DC]"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg font-medium text-[#24211E] truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#756C62]">
                            {formatINR(item.price)} each
                          </p>
                        </div>

                        <div className="inline-flex items-center rounded-full bg-[#EFE7DC] p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#24211E] hover:bg-[#FFFFFF] cursor-pointer"
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
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#24211E] hover:bg-[#FFFFFF] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="w-20 text-right font-serif font-semibold text-[#24211E]">
                          {formatINR(item.price * quantity)}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="p-1.5 text-[#756C62] hover:text-rose-700 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Checkout Form */}
                <form
                  id="checkout-form"
                  onSubmit={handlePlaceOrder}
                  noValidate
                  className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#24211E]/8 space-y-6"
                >
                  <h2 className="font-serif text-2xl font-medium text-[#24211E]">
                    Delivery Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="co-name" className="block text-sm font-medium text-[#24211E] mb-2">
                        Customer Name *
                      </label>
                      <input
                        id="co-name"
                        type="text"
                        value={form.customerName}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, customerName: e.target.value }));
                          setErrors((prev) => ({ ...prev, customerName: undefined }));
                        }}
                        placeholder="Full name"
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                      />
                      {errors.customerName && (
                        <p className="mt-1.5 text-xs text-rose-700" role="alert">
                          {errors.customerName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="co-phone" className="block text-sm font-medium text-[#24211E] mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="co-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, phone: e.target.value }));
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-rose-700" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="co-email" className="block text-sm font-medium text-[#24211E] mb-2">
                      Email Address *
                    </label>
                    <input
                      id="co-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }));
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-700" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="co-address" className="block text-sm font-medium text-[#24211E] mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      id="co-address"
                      rows={3}
                      value={form.address}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, address: e.target.value }));
                        setErrors((prev) => ({ ...prev, address: undefined }));
                      }}
                      placeholder="Apartment / House No., Street, Landmark, City, PIN"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                    />
                    {errors.address && (
                      <p className="mt-1.5 text-xs text-rose-700" role="alert">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="co-notes" className="block text-sm font-medium text-[#24211E] mb-2">
                      Order Notes (Optional)
                    </label>
                    <input
                      id="co-notes"
                      type="text"
                      value={form.notes}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder="Cutlery preferences, gate code, spice level..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="pt-2 border-t border-[#EFE7DC] space-y-3">
                    <span className="block text-sm font-medium text-[#24211E]">
                      Payment Method
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          {
                            id: 'cod',
                            title: 'Cash on Delivery',
                            subtitle: 'Pay when your order arrives',
                            icon: Banknote,
                          },
                          {
                            id: 'online-demo',
                            title: 'Online Payment (Demo Only)',
                            subtitle: 'Simulated — no real transaction',
                            icon: CreditCard,
                          },
                        ] as {
                          id: PaymentMethod;
                          title: string;
                          subtitle: string;
                          icon: typeof Banknote;
                        }[]
                      ).map((method) => {
                        const Icon = method.icon;
                        const active = form.paymentMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({ ...prev, paymentMethod: method.id }))
                            }
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                              active
                                ? 'border-[#C56B45] bg-[#EFE7DC]/60'
                                : 'border-[#24211E]/12 bg-[#F7F3EC] hover:border-[#24211E]/30'
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 shrink-0 mt-0.5 ${
                                active ? 'text-[#C56B45]' : 'text-[#756C62]'
                              }`}
                            />
                            <div>
                              <div className="text-sm font-medium text-[#24211E]">
                                {method.title}
                              </div>
                              <div className="text-xs text-[#756C62] mt-0.5">
                                {method.subtitle}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {form.paymentMethod === 'online-demo' && (
                      <p className="text-xs text-[#756C62] bg-[#EFE7DC] p-3 rounded-xl">
                        Note: Online Payment is a frontend demonstration only. No card, UPI, or real financial transaction is processed.
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#24211E]/8 space-y-6">
                  <h2 className="font-serif text-2xl font-medium text-[#24211E]">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-[#756C62]">
                      <span>Subtotal</span>
                      <span className="text-[#24211E] font-medium">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#756C62]">
                      <span>Delivery Charge</span>
                      <span className="text-[#24211E] font-medium">
                        {deliveryCharge === 0 ? (
                          <span className="text-emerald-700">Complimentary</span>
                        ) : (
                          formatINR(deliveryCharge)
                        )}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-[#EFE7DC] flex justify-between items-baseline">
                      <span className="font-medium text-[#24211E]">Final Total</span>
                      <span className="font-serif text-3xl font-semibold text-[#24211E]">
                        {formatINR(total)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#EFE7DC] text-xs text-[#24211E] flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-[#C56B45] shrink-0 mt-0.5" />
                    <span>
                      This is a frontend demonstration. Placing an order generates a local demo reference without charging any account.
                    </span>
                  </div>

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-[#C56B45] hover:bg-[#AD5835] disabled:opacity-60 text-[#FFFFFF] text-sm font-medium tracking-wide transition-colors cursor-pointer"
                  >
                    {submitting ? 'Placing Demo Order...' : `Place Demo Order (${formatINR(total)})`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
