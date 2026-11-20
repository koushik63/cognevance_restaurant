import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_INFO } from '../data/restaurantData';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-[#24211E] text-[#F7F3EC] border-t border-[#FFFFFF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-[#C56B45] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#C56B45]" />
              </span>
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#FFFFFF]">
                {BRAND_INFO.name}
              </span>
            </div>
            <p className="font-serif italic text-lg text-[#C56B45]">
              “{BRAND_INFO.tagline}”
            </p>
            <p className="text-sm text-[#EFE7DC]/75 leading-relaxed max-w-sm">
              A contemporary dining room celebrating slow-crafted Indian heritage and artisanal Italian warmth.
            </p>
            <p className="text-xs text-[#EFE7DC]/55 border border-[#FFFFFF]/10 rounded-xl p-3 bg-[#FFFFFF]/[0.03]">
              {BRAND_INFO.demoNotice}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C56B45]">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-[#EFE7DC]/80">
              <li>
                <Link to="/" className="hover:text-[#FFFFFF] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FFFFFF] transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFFFFF] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-[#FFFFFF] transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFFFFF] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-[#FFFFFF] transition-colors">
                  Cart &amp; Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C56B45]">
              Illustrative Hours
            </h3>
            <ul className="space-y-3 text-sm text-[#EFE7DC]/80">
              {BRAND_INFO.hours.map((slot) => (
                <li key={slot.days} className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-[#FFFFFF]">{slot.days}</div>
                    <div className="text-[#EFE7DC]/70 text-xs mt-0.5">{slot.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Contact & CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C56B45]">
              Visit &amp; Connect (Sample)
            </h3>
            <ul className="space-y-3 text-sm text-[#EFE7DC]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C56B45] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {BRAND_INFO.contact.addressLine1}
                  <br />
                  {BRAND_INFO.contact.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C56B45] shrink-0" aria-hidden="true" />
                <span>{BRAND_INFO.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C56B45] shrink-0" aria-hidden="true" />
                <span>{BRAND_INFO.contact.email}</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C56B45] hover:bg-[#AD5835] text-[#FFFFFF] text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Book a Table
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#FFFFFF]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFE7DC]/60">
          <p>
            © {CURRENT_YEAR} Saffron &amp; Stone. Frontend demonstration website.
          </p>
          <p>Crafted with care — Good Food. Beautiful Moments.</p>
        </div>
      </div>
    </footer>
  );
}
