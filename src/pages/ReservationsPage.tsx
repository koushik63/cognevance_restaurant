import { Calendar, CheckCircle2, Clock, Info, Users } from 'lucide-react';
import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import type { ReservationFormData } from '../types';

const TIME_SLOTS = [
  '12:30 PM',
  '1:30 PM',
  '7:00 PM',
  '7:45 PM',
  '8:30 PM',
  '9:15 PM',
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
}

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function ReservationsPage() {
  const todayStr = getTodayDateString();

  const [form, setForm] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: todayStr,
    time: '7:45 PM',
    guests: 2,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!form.date) {
      nextErrors.date = 'Please select a reservation date.';
    } else if (form.date < todayStr) {
      nextErrors.date = 'Past dates cannot be booked. Please choose today or a future date.';
    }
    if (!form.time) {
      nextErrors.time = 'Please choose a dining time slot.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setConfirmedRef(`RES-DEMO-${randomCode}`);
      setSubmitting(false);
    }, 450);
  };

  const handleReset = () => {
    setConfirmedRef(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      date: todayStr,
      time: '7:45 PM',
      guests: 2,
      specialRequests: '',
    });
    setErrors({});
  };

  return (
    <PageTransition>
      <section className="bg-[#EFE7DC] py-16 lg:py-20 border-b border-[#24211E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Table Reservations"
              title="Reserve Your Evening With Us"
              subtitle="Book a table for lunch or candlelit dinner. Select your preferred date, guest count, and seating time below."
            />
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#F7F3EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Notice */}
          <div className="mb-8 p-4 rounded-2xl bg-[#EFE7DC] border border-[#24211E]/10 flex items-start gap-3 text-xs sm:text-sm text-[#24211E]">
            <Info className="w-5 h-5 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Demonstration Booking:</strong> This reservation flow generates a simulated demo confirmation. Live table availability requires backend integration.
            </p>
          </div>

          {confirmedRef ? (
            <Reveal>
              <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 border border-[#24211E]/10 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C56B45]">
                    Demo Reservation Request Received
                  </span>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#24211E]">
                    We Look Forward to Hosting You, {form.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#756C62]">
                    Demo Reference: <strong className="font-mono text-[#24211E]">{confirmedRef}</strong>
                  </p>
                </div>

                <div className="max-w-md mx-auto bg-[#F7F3EC] rounded-2xl p-6 text-left space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#756C62]">Date</span>
                    <span className="font-medium text-[#24211E]">{form.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#756C62]">Time Slot</span>
                    <span className="font-medium text-[#24211E]">{form.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#756C62]">Party Size</span>
                    <span className="font-medium text-[#24211E]">
                      {form.guests} {form.guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                  </div>
                  {form.specialRequests && (
                    <div className="pt-2 border-t border-[#24211E]/10">
                      <span className="text-[#756C62] block mb-1">Special Requests</span>
                      <span className="text-[#24211E]">{form.specialRequests}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#756C62] max-w-md mx-auto">
                  This is a frontend demonstration. No actual table hold has been created in a restaurant POS.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-7 py-3 rounded-full bg-[#24211E] hover:bg-[#C56B45] text-[#FFFFFF] text-sm font-medium transition-colors cursor-pointer"
                >
                  Make Another Demo Request
                </button>
              </div>
            </Reveal>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#24211E]/10 space-y-8"
            >
              {/* Party Size */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#24211E] mb-3">
                  <Users className="w-4 h-4 text-[#C56B45]" aria-hidden="true" />
                  Number of Guests
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {GUEST_OPTIONS.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, guests: count }))}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        form.guests === count
                          ? 'bg-[#24211E] text-[#FFFFFF]'
                          : 'bg-[#F7F3EC] text-[#24211E] hover:bg-[#EFE7DC]'
                      }`}
                    >
                      {count === 10 ? '10+' : count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="res-date"
                    className="flex items-center gap-2 text-sm font-medium text-[#24211E] mb-2"
                  >
                    <Calendar className="w-4 h-4 text-[#C56B45]" aria-hidden="true" />
                    Reservation Date
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={todayStr}
                    value={form.date}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, date: e.target.value }));
                      setErrors((prev) => ({ ...prev, date: undefined }));
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                  />
                  {errors.date && (
                    <p className="mt-1.5 text-xs text-rose-700" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <span className="flex items-center gap-2 text-sm font-medium text-[#24211E] mb-2">
                    <Clock className="w-4 h-4 text-[#C56B45]" aria-hidden="true" />
                    Preferred Time Slot
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, time: slot }));
                          setErrors((prev) => ({ ...prev, time: undefined }));
                        }}
                        className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          form.time === slot
                            ? 'bg-[#C56B45] text-[#FFFFFF]'
                            : 'bg-[#F7F3EC] text-[#24211E] hover:bg-[#EFE7DC]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="mt-1.5 text-xs text-rose-700" role="alert">
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-[#EFE7DC]">
                <div>
                  <label htmlFor="res-name" className="block text-sm font-medium text-[#24211E] mb-2">
                    Full Name *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, name: e.target.value }));
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Riya Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-700" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="res-email" className="block text-sm font-medium text-[#24211E] mb-2">
                    Email Address *
                  </label>
                  <input
                    id="res-email"
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
                  <label htmlFor="res-phone" className="block text-sm font-medium text-[#24211E] mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="res-phone"
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

              {/* Special Requests */}
              <div>
                <label htmlFor="res-requests" className="block text-sm font-medium text-[#24211E] mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="res-requests"
                  rows={3}
                  value={form.specialRequests}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, specialRequests: e.target.value }))
                  }
                  placeholder="Allergies, anniversary celebration, courtyard seating preference..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#C56B45] hover:bg-[#AD5835] disabled:opacity-60 text-[#FFFFFF] text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                {submitting ? 'Confirming Demo Request...' : 'Request Table Reservation (Demo)'}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
