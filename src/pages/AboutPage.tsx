import { ArrowRight, Flame, HeartHandshake, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import chefPortraitImg from '../assets/chef-portrait.jpg';
import heroDiningImg from '../assets/hero-dining.jpg';
import restaurantInteriorImg from '../assets/restaurant-interior.jpg';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { BRAND_INFO, CHEF_PROFILE, RESTAURANT_VALUES } from '../data/restaurantData';

const VALUE_ICONS = [Leaf, Flame, HeartHandshake];

export function AboutPage() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-[#EFE7DC] py-16 lg:py-24 border-b border-[#24211E]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-[#C56B45] mb-4">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#24211E] leading-[1.12]">
              Crafted Around Patience, Fire &amp; Hospitality
            </h1>
            <p className="mt-6 font-serif italic text-xl sm:text-2xl text-[#24211E]/85 leading-relaxed">
              “{BRAND_INFO.philosophyQuote}”
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-20 lg:py-24 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="Food Philosophy"
                title="Rooted in Tradition, Open to Dialogue"
              />
              <p className="text-base text-[#756C62] leading-relaxed">
                Saffron &amp; Stone began with a simple observation: the most memorable meals rarely rush. They unfold over warm bread torn by hand, spices toasted moments before service, and dining rooms bathed in natural light.
              </p>
              <p className="text-base text-[#756C62] leading-relaxed">
                Our kitchen bridges two culinary worlds that revere time and provenance—slow-simmered Indian classics alongside blistered Neapolitan dough and handmade pasta. Every plate is served on custom stoneware crafted to hold warmth at the table.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#EFE7DC]">
                <img
                  src={restaurantInteriorImg}
                  alt="Warm dining room at Saffron & Stone"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Illustrative Chef Section */}
      <section className="py-20 lg:py-24 bg-[#EFE7DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-5">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-[#F7F3EC] border border-[#24211E]/10">
                <img
                  src={chefPortraitImg}
                  alt="Illustrative portrait of the Executive Chef plating a dish"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-7 space-y-5">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-[#C56B45]">
                Kitchen Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#24211E]">
                {CHEF_PROFILE.name}
              </h2>
              <p className="text-sm font-medium uppercase tracking-wider text-[#756C62]">
                {CHEF_PROFILE.title}
              </p>
              <p className="text-base text-[#24211E]/85 leading-relaxed">
                {CHEF_PROFILE.bio}
              </p>
              <p className="text-xs text-[#756C62] italic">
                Note: Chef profile and biography are illustrative demonstration content.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values & Highlights */}
      <section className="py-20 lg:py-24 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What Guides Us"
              title="Three Pillars of Our Kitchen"
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {RESTAURANT_VALUES.map((val, idx) => {
              const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
              return (
                <Reveal key={val.title} delay={idx * 0.08}>
                  <div className="h-full p-8 rounded-3xl bg-[#FFFFFF] border border-[#24211E]/8">
                    <div className="w-12 h-12 rounded-2xl bg-[#EFE7DC] flex items-center justify-center text-[#C56B45] mb-6">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#24211E]">
                      {val.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#756C62] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restaurant Gallery */}
      <section className="py-20 bg-[#24211E] text-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Atmosphere"
              title="Inside Saffron & Stone"
              align="center"
              light
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal className="md:col-span-2">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden">
                <img
                  src={heroDiningImg}
                  alt="Plated signature dish on stone dining table"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="aspect-[16/10] md:aspect-auto md:h-full rounded-3xl overflow-hidden">
                <img
                  src={restaurantInteriorImg}
                  alt="Evening ambience inside the dining room"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/reservations"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C56B45] hover:bg-[#AD5835] text-[#FFFFFF] text-sm font-medium transition-colors"
            >
              Reserve Your Table
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
