import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles, Star, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroDiningImg from '../assets/hero-dining.jpg';
import restaurantInteriorImg from '../assets/restaurant-interior.jpg';
import { DishCard } from '../components/DishCard';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { BRAND_INFO, SPECIAL_OFFERS, TESTIMONIALS } from '../data/restaurantData';

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Starters: 'Charcoal-kissed small plates & artisanal bruschetta',
  'Main Course': 'Slow-braised classics & wild-caught plates',
  'Indian Specials': '24-hour lentils, tandoor roasts & dum biryanis',
  Italian: '48-hour sourdough pizza & handmade ribbon pasta',
  Desserts: 'Saffron panna cotta, tiramisu & dark chocolate',
  Beverages: 'Botanical spritzes & single-estate pour-overs',
};

export function HomePage() {
  const featuredDishes = MENU_ITEMS.filter((item) => item.popular).slice(0, 6);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#24211E] text-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-7 z-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C56B45]/50 bg-[#C56B45]/10 text-[#E6A98E] text-xs uppercase tracking-[0.2em] font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                {BRAND_INFO.tagline}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium tracking-tight leading-[1.08] text-[#FFFFFF]"
              >
                A Taste Worth Remembering.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-[#EFE7DC]/80 leading-relaxed max-w-xl"
              >
                Discover thoughtfully prepared dishes, fresh ingredients, and unforgettable dining experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C56B45] hover:bg-[#AD5835] text-[#FFFFFF] text-sm font-medium tracking-wide transition-colors"
                >
                  Explore Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/reservations"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#EFE7DC]/30 hover:border-[#FFFFFF] hover:bg-[#FFFFFF]/10 text-[#FFFFFF] text-sm font-medium tracking-wide transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Reserve a Table
                </Link>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-[#FFFFFF]/10">
                <motion.img
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  src={heroDiningImg}
                  alt="Signature contemporary dish plated on handmade stoneware at Saffron & Stone"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24211E]/50 via-transparent to-transparent" />
              </div>

              {/* Floating Editorial Caption */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="hidden sm:flex items-center gap-4 absolute -bottom-5 -left-4 bg-[#F7F3EC] text-[#24211E] px-5 py-4 rounded-2xl border border-[#24211E]/10 max-w-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFE7DC] flex items-center justify-center text-[#C56B45] shrink-0">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold">Crafted Daily</p>
                  <p className="text-xs text-[#756C62]">
                    Stone-ground spices &amp; wood-fired sourdough
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Restaurant Introduction */}
      <section className="py-20 lg:py-28 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#EFE7DC]">
                <img
                  src={restaurantInteriorImg}
                  alt="Warm limewash dining room with stone arches at Saffron & Stone"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="Our Philosophy"
                title="Where Warm Stone Meets Quiet Craft"
                subtitle={BRAND_INFO.philosophyQuote}
              />
              <div className="pt-2 flex flex-wrap gap-8 border-t border-[#24211E]/10">
                <div>
                  <div className="font-serif text-3xl font-semibold text-[#24211E]">24 Hr</div>
                  <div className="text-xs uppercase tracking-wider text-[#756C62] mt-1">
                    Slow-Simmered Dal
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-semibold text-[#24211E]">48 Hr</div>
                  <div className="text-xs uppercase tracking-wider text-[#756C62] mt-1">
                    Fermented Dough
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-semibold text-[#24211E]">100%</div>
                  <div className="text-xs uppercase tracking-wider text-[#756C62] mt-1">
                    Single-Origin Spices
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#C56B45] hover:text-[#24211E] transition-colors"
                >
                  Read Our Full Story
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 lg:py-24 bg-[#EFE7DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <Reveal>
              <SectionHeading
                eyebrow="Signature Plates"
                title="Featured From Our Kitchen"
                subtitle="Guest favourites balancing heritage Indian warmth and contemporary Italian technique."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#24211E] hover:bg-[#C56B45] text-[#FFFFFF] text-sm font-medium transition-colors self-start md:self-auto"
              >
                View Full Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredDishes.map((dish, idx) => (
              <Reveal key={dish.id} delay={idx * 0.06}>
                <DishCard item={dish} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Food Categories */}
      <section className="py-20 lg:py-24 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Explore By Course"
              title="Curated Culinary Categories"
              subtitle="Browse our menu by course—from charcoal-roasted starters to botanical zero-proof pairings."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MENU_CATEGORIES.map((category, idx) => (
              <Reveal key={category} delay={idx * 0.05}>
                <Link
                  to={`/menu?category=${encodeURIComponent(category)}`}
                  className="group block p-7 rounded-2xl bg-[#FFFFFF] border border-[#24211E]/8 hover:border-[#C56B45]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C56B45]">
                      0{idx + 1}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#756C62] group-hover:text-[#C56B45] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-medium text-[#24211E] group-hover:text-[#C56B45] transition-colors">
                    {category}
                  </h3>
                  <p className="mt-2 text-sm text-[#756C62]">
                    {CATEGORY_DESCRIPTIONS[category]}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-[#EFE7DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Seasonal Highlights"
              title="Thoughtful Dining Privileges"
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SPECIAL_OFFERS.map((offer, idx) => (
              <Reveal key={offer.id} delay={idx * 0.1}>
                <div className="h-full p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#24211E]/8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#EFE7DC] text-[#C56B45] text-xs font-semibold uppercase tracking-wider">
                      {offer.badge}
                    </span>
                    <h3 className="mt-5 font-serif text-2xl sm:text-3xl font-medium text-[#24211E]">
                      {offer.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#756C62] leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-[#EFE7DC] flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-[#756C62]">{offer.validNote}</span>
                    <span className="px-3 py-1 rounded-lg bg-[#24211E] text-[#F7F3EC] text-xs font-mono tracking-wider">
                      {offer.code}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 lg:py-28 bg-[#24211E] text-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Guest Notes"
              title="Words From Our Table"
              subtitle="Sample reflections capturing the atmosphere and culinary experience at Saffron & Stone."
              align="center"
              light
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.08}>
                <blockquote className="h-full p-8 rounded-3xl bg-[#FFFFFF]/[0.04] border border-[#FFFFFF]/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[#C56B45] mb-5" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="font-serif italic text-lg text-[#F7F3EC]/95 leading-relaxed">
                      “{item.quote}”
                    </p>
                  </div>
                  <footer className="mt-6 pt-5 border-t border-[#FFFFFF]/10">
                    <div className="font-medium text-sm text-[#FFFFFF]">{item.author}</div>
                    <div className="text-xs text-[#EFE7DC]/60 mt-0.5">{item.role}</div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-20 lg:py-24 bg-[#F7F3EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-[#C56B45] mb-3">
              Join Us This Evening
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#24211E] leading-tight">
              Settle Into Warm Candlelight &amp; Thoughtful Courses
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#756C62] max-w-2xl mx-auto">
              Reserve a table for an unhurried dinner or order our freshly prepared dishes straight to your home.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C56B45] hover:bg-[#AD5835] text-[#FFFFFF] text-sm font-medium tracking-wide transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Reserve a Table
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EFE7DC] hover:bg-[#24211E] text-[#24211E] hover:text-[#FFFFFF] text-sm font-medium tracking-wide transition-colors"
              >
                Order Online
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
