import type { SpecialOffer, Testimonial } from '../types';

export const BRAND_INFO = {
  name: 'Saffron & Stone',
  tagline: 'Good Food. Beautiful Moments.',
  philosophyQuote:
    'At Saffron & Stone, we believe food is more than a meal. It is an experience that brings people together. Our philosophy combines fresh ingredients, thoughtful preparation, and a welcoming atmosphere.',
  demoNotice:
    'Frontend Demonstration: Sample contact details, illustrative hours, and simulated ordering/reservation flows are shown until connected to a live restaurant backend.',
  contact: {
    addressLine1: '14 Courtyard Lane, Heritage Quarter (Sample Address)',
    addressLine2: 'Bengaluru, Karnataka 560001 (Illustrative Demo)',
    phone: '+91 80 0000 0000 (Sample)',
    email: 'reservations@saffronandstone.demo',
  },
  hours: [
    { days: 'Tuesday – Thursday', time: '12:00 PM – 10:30 PM (Sample)' },
    { days: 'Friday – Sunday', time: '12:00 PM – 11:30 PM (Sample)' },
    { days: 'Monday', time: 'Closed for Kitchen Prep (Sample)' },
  ],
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Ananya Deshmukh',
    role: 'Culinary Writer',
    quote:
      'The 24-Hour Dal Saffron & Stone alongside wood-fired burrata feels effortless yet deeply intentional. Every detail from stoneware to service whispers quiet luxury.',
    rating: 5,
  },
  {
    id: 't-2',
    author: 'Vikramaditya Rao',
    role: 'Architect',
    quote:
      'Warm limewash walls, soft amber light, and food that respects both Indian heritage and Italian craft. Our favourite table for unhurried Friday evenings.',
    rating: 5,
  },
  {
    id: 't-3',
    author: 'Meera & Kabir Nair',
    role: 'Regular Guests',
    quote:
      'Whether we dine in the courtyard or order home on a rainy Sunday, the Zafrani Murgh Tikka and Saffron Panna Cotta arrive consistently extraordinary.',
    rating: 5,
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-1',
    badge: 'Weekday Lunch',
    title: 'Chef’s Three-Course Tasting',
    description:
      'Enjoy a curated starter, signature main course, and artisanal dessert crafted daily from market-fresh produce.',
    code: 'TASTE20',
    validNote: 'Illustrative offer — Tue to Thu, 12:00 PM – 3:30 PM',
  },
  {
    id: 'offer-2',
    badge: 'Direct Ordering',
    title: 'Complimentary Delivery Above ₹999',
    description:
      'Orders of ₹999 or more automatically qualify for zero delivery fees, packed in eco-conscious thermal stoneware-safe boxes.',
    code: 'AUTOMATIC',
    validNote: 'Applied automatically in your cart',
  },
];

export const CHEF_PROFILE = {
  name: 'Chef Aarav Kulkarni (Illustrative Profile)',
  title: 'Executive Chef & Culinary Director',
  bio: 'Trained across heritage kitchens in Lucknow and contemporary trattorias in Bologna, Chef Aarav founded Saffron & Stone to celebrate slow-simmered Indian depth and clean Italian restraint. Every menu follows micro-seasons, cold-pressed oils, and stone-ground spices.',
};

export const RESTAURANT_VALUES = [
  {
    title: 'Single-Origin Ingredients',
    description:
      'From Pampore saffron and Tellicherry pepper to San Marzano tomatoes and local farm greens, provenance leads every plate.',
  },
  {
    title: 'Slow Craft & Open Fire',
    description:
      'Our lentils simmer for 24 hours over dying embers while our sourdough ferments for 48 hours before touching the stone oven.',
  },
  {
    title: 'Warm, Unhurried Hospitality',
    description:
      'Designed as a sanctuary away from city rush—where natural stone, warm linen, and thoughtful service invite conversation.',
  },
];
