import { CheckCircle2, Clock, Info, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { BRAND_INFO } from '../data/restaurantData';

interface ContactErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const validate = (): ContactErrors => {
    const next: ContactErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = 'Please enter your name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      next.subject = 'Please enter a brief subject.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'Please enter a message of at least 10 characters.';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    window.setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 450);
  };

  return (
    <PageTransition>
      <section className="bg-[#EFE7DC] py-16 lg:py-20 border-b border-[#24211E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Contact Saffron & Stone"
              subtitle="Questions about private dining, dietary accommodations, or feedback? Send us a note below."
            />
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 p-4 rounded-2xl bg-[#EFE7DC] border border-[#24211E]/10 flex items-start gap-3 text-xs sm:text-sm text-[#24211E]">
            <Info className="w-5 h-5 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Sample Information:</strong> Address, phone number, email, and opening hours below are clearly marked illustrative demo details until a live venue configuration is connected.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Info & Map Placeholder */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <div className="bg-[#FFFFFF] p-7 rounded-3xl border border-[#24211E]/8 space-y-6">
                  <h2 className="font-serif text-2xl font-medium text-[#24211E]">
                    Sample Venue Details
                  </h2>

                  <div className="space-y-4 text-sm text-[#756C62]">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="font-medium text-[#24211E]">Location (Demo)</div>
                        <p>{BRAND_INFO.contact.addressLine1}</p>
                        <p>{BRAND_INFO.contact.addressLine2}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="font-medium text-[#24211E]">Phone (Demo)</div>
                        <p>{BRAND_INFO.contact.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="font-medium text-[#24211E]">Email (Demo)</div>
                        <p>{BRAND_INFO.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2 border-t border-[#EFE7DC]">
                      <Clock className="w-5 h-5 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="space-y-1.5">
                        <div className="font-medium text-[#24211E]">Opening Hours (Illustrative)</div>
                        {BRAND_INFO.hours.map((h) => (
                          <div key={h.days}>
                            <span className="text-[#24211E] font-medium">{h.days}: </span>
                            <span>{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Map Placeholder */}
              <Reveal delay={0.1}>
                <div className="rounded-3xl overflow-hidden border border-[#24211E]/10 bg-[#EFE7DC] p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFFFFF] text-[#C56B45] flex items-center justify-center mx-auto">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#24211E]">
                    Interactive Map Placeholder
                  </h3>
                  <p className="text-xs text-[#756C62] max-w-xs mx-auto">
                    Connect Google Maps or Mapbox here once your live restaurant coordinates are configured.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-[#FFFFFF] p-7 sm:p-10 rounded-3xl border border-[#24211E]/8 space-y-6"
                >
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#24211E]">
                    Send a Message
                  </h2>

                  {status === 'sent' && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-sm text-emerald-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Message received (Demo).</strong> Thank you for reaching out to Saffron &amp; Stone. In a live deployment, this form will deliver directly to our hospitality team.
                      </div>
                    </div>
                  )}

                  {status === 'error' && Object.keys(errors).length > 0 && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-sm text-rose-800" role="alert">
                      Please review the highlighted fields below before sending.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#24211E] mb-2">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, name: e.target.value }));
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Full name"
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-700" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[#24211E] mb-2">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
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
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-[#24211E] mb-2">
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, subject: e.target.value }));
                        setErrors((prev) => ({ ...prev, subject: undefined }));
                      }}
                      placeholder="Private dining inquiry, menu question..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-rose-700" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[#24211E] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, message: e.target.value }));
                        setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3EC] border border-[#24211E]/12 text-sm text-[#24211E] focus:outline-none focus:border-[#C56B45]"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-700" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#24211E] hover:bg-[#C56B45] disabled:opacity-60 text-[#FFFFFF] text-sm font-medium transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
