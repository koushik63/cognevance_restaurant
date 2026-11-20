import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Search, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DishCard } from '../components/DishCard';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import type { DietaryType, MenuCategory } from '../types';

type SortOption = 'featured' | 'price-asc' | 'price-desc';
type CategoryFilter = 'All' | MenuCategory;
type DietaryFilter = 'all' | DietaryType;

export function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const validInitialCategory: CategoryFilter =
    initialCategory && MENU_CATEGORIES.includes(initialCategory as MenuCategory)
      ? (initialCategory as MenuCategory)
      : 'All';

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>(validInitialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const handleCategoryChange = (category: CategoryFilter) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const popularItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.popular).slice(0, 3),
    []
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }
      if (query) {
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        return matchName || matchDesc || matchCat;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, dietaryFilter, searchQuery, sortBy]);

  const resetFilters = () => {
    handleCategoryChange('All');
    setSearchQuery('');
    setDietaryFilter('all');
    setSortBy('featured');
  };

  const categories: CategoryFilter[] = ['All', ...MENU_CATEGORIES];

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-[#EFE7DC] py-16 lg:py-20 border-b border-[#24211E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Culinary Collection"
              title="Our Seasonal Menu"
              subtitle="Thoughtfully crafted plates blending heritage Indian spices with wood-fired Italian technique. All prices in INR."
            />
          </Reveal>
        </div>
      </section>

      {/* Popular Highlights */}
      <section className="py-12 bg-[#F7F3EC] border-b border-[#24211E]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C56B45] mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Most Ordered Signatures
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularItems.map((item) => (
              <DishCard key={`pop-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Filter & Search Controls */}
      <section className="py-12 lg:py-16 bg-[#F7F3EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar */}
          <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-3xl border border-[#24211E]/8 space-y-5">
            {/* Search, Dietary, Sort */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search */}
              <div className="md:col-span-5 relative">
                <Search
                  className="w-4 h-4 text-[#756C62] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dishes, ingredients, or courses..."
                  aria-label="Search menu items"
                  className="w-full pl-11 pr-10 py-3 rounded-full bg-[#F7F3EC] border border-[#24211E]/10 text-sm text-[#24211E] placeholder:text-[#756C62] focus:outline-none focus:border-[#C56B45]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#756C62] hover:text-[#24211E] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dietary Filter */}
              <div className="md:col-span-4 flex items-center gap-2" role="group" aria-label="Dietary preference">
                {(
                  [
                    { id: 'all', label: 'All' },
                    { id: 'veg', label: 'Veg Only' },
                    { id: 'non-veg', label: 'Non-Veg' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDietaryFilter(option.id)}
                    className={`flex-1 py-2.5 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      dietaryFilter === option.id
                        ? 'bg-[#24211E] text-[#FFFFFF]'
                        : 'bg-[#F7F3EC] text-[#756C62] hover:text-[#24211E]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="md:col-span-3 relative">
                <ArrowUpDown
                  className="w-4 h-4 text-[#756C62] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="Sort menu items by price"
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-[#F7F3EC] border border-[#24211E]/10 text-xs font-medium text-[#24211E] focus:outline-none focus:border-[#C56B45] cursor-pointer"
                >
                  <option value="featured">Sort: Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 pt-1"
              role="tablist"
              aria-label="Food categories"
            >
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#FFFFFF]'
                        : 'text-[#756C62] hover:text-[#24211E] bg-[#F7F3EC]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="category-pill-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#C56B45]"
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-[#756C62]">
            <span>
              Showing <strong className="text-[#24211E]">{filteredItems.length}</strong>{' '}
              {filteredItems.length === 1 ? 'dish' : 'dishes'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </span>
            {(selectedCategory !== 'All' ||
              searchQuery ||
              dietaryFilter !== 'all' ||
              sortBy !== 'featured') && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-[#C56B45] hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

          {/* Dish Grid */}
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center bg-[#FFFFFF] rounded-3xl border border-[#24211E]/8">
              <h3 className="font-serif text-2xl text-[#24211E]">No matching dishes found</h3>
              <p className="text-sm text-[#756C62] mt-2">
                Try clearing your search or switching to another category.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#24211E] text-[#FFFFFF] text-sm font-medium hover:bg-[#C56B45] transition-colors cursor-pointer"
              >
                Show All Dishes
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <DishCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
