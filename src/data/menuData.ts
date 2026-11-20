import type { MenuCategory, MenuItem } from '../types';

export const MENU_CATEGORIES: MenuCategory[] = [
  'Starters',
  'Main Course',
  'Indian Specials',
  'Italian',
  'Desserts',
  'Beverages',
];

export const MENU_ITEMS: MenuItem[] = [
  // Starters (4 items)
  {
    id: 'st-01',
    name: 'Truffle Burrata & Charred Fig Bruschetta',
    description:
      'Artisanal sourdough brushed with roasted garlic oil, creamy Pugliese burrata, caramelized figs, and aged balsamic.',
    price: 495,
    category: 'Starters',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '15 mins',
  },
  {
    id: 'st-02',
    name: 'Smoked Tandoori Malai Broccoli',
    description:
      'Char-grilled florets marinated in saffron-infused hung curd, cardamom, and toasted cashew cream.',
    price: 425,
    category: 'Starters',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    prepTime: '18 mins',
  },
  {
    id: 'st-03',
    name: 'Zafrani Murgh Tikka',
    description:
      'Free-range chicken morsels steeped in Kashmiri saffron, yogurt, and stone-ground spices, finished over live charcoal.',
    price: 545,
    category: 'Starters',
    dietary: 'non-veg',
    image:
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '20 mins',
  },
  {
    id: 'st-04',
    name: 'Crispy Calamari with Citrus Aioli',
    description:
      'Lightly dusted sea-salted squid rings fried crisp, served with charred lemon and roasted garlic saffron aioli.',
    price: 595,
    category: 'Starters',
    dietary: 'non-veg',
    image:
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80',
    prepTime: '15 mins',
  },

  // Main Course (4 items)
  {
    id: 'mc-01',
    name: 'Herb-Crusted Wild Salmon',
    description:
      'Pan-seared Norwegian salmon over saffron risotto, blistered heirloom cherry tomatoes, and lemon-caper beurre blanc.',
    price: 1195,
    category: 'Main Course',
    dietary: 'non-veg',
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '25 mins',
  },
  {
    id: 'mc-02',
    name: 'Wild Mushroom & Truffle Risotto',
    description:
      'Slow-simmered Carnaroli rice folded with porcini, shiitake, aged Parmigiano-Reggiano, and black truffle oil.',
    price: 795,
    category: 'Main Course',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80',
    prepTime: '25 mins',
  },
  {
    id: 'mc-03',
    name: 'Chargrilled Harissa Cottage Cheese Steak',
    description:
      'Thick-cut artisanal paneer glazed in smoky rose harissa, served with roasted baby potatoes and charred asparagus.',
    price: 685,
    category: 'Main Course',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    prepTime: '22 mins',
  },
  {
    id: 'mc-04',
    name: 'Slow-Braised Lamb Shank',
    description:
      'Six-hour braised lamb shank in rosemary jus, paired with whipped garlic potato mash and honey-glazed heirloom carrots.',
    price: 1295,
    category: 'Main Course',
    dietary: 'non-veg',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    prepTime: '28 mins',
  },

  // Indian Specials (4 items)
  {
    id: 'in-01',
    name: '24-Hour Dal Saffron & Stone',
    description:
      'Whole black urad lentils slow-simmered overnight over charcoal, finished with heirloom tomato puree, fenugreek, and cultured butter.',
    price: 595,
    category: 'Indian Specials',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '20 mins',
  },
  {
    id: 'in-02',
    name: 'Old Delhi Butter Chicken & Garlic Naan',
    description:
      'Tandoor-roasted chicken tikka folded into velvety San Marzano tomato-makhan gravy, served with blistered garlic naan.',
    price: 725,
    category: 'Indian Specials',
    dietary: 'non-veg',
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '22 mins',
  },
  {
    id: 'in-03',
    name: 'Awadhi Subz Dum Biryani',
    description:
      'Aged basmati rice layered with seasonal vegetables, rose water, saffron strands, and caramelized onions, sealed in pastry.',
    price: 625,
    category: 'Indian Specials',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80',
    prepTime: '25 mins',
  },
  {
    id: 'in-04',
    name: 'Kashmiri Rogan Josh',
    description:
      'Tender cuts of lamb simmered withalkanet root, dry ginger, fennel, and Kashmiri chilli, served with saffron pulao.',
    price: 845,
    category: 'Indian Specials',
    dietary: 'non-veg',
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80',
    prepTime: '25 mins',
  },

  // Italian (3 items)
  {
    id: 'it-01',
    name: 'Wood-Fired Burrata & San Marzano Pizza',
    description:
      '48-hour fermented Neapolitan dough topped with crushed San Marzano tomatoes, fresh burrata, basil, and cold-pressed olive oil.',
    price: 695,
    category: 'Italian',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '18 mins',
  },
  {
    id: 'it-02',
    name: 'Handmade Tagliatelle al Ragù',
    description:
      'Fresh egg ribbon pasta tossed in slow-braised lamb and tomato ragù, finished with 24-month aged Parmigiano.',
    price: 785,
    category: 'Italian',
    dietary: 'non-veg',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
    prepTime: '20 mins',
  },
  {
    id: 'it-03',
    name: 'Cacio e Pepe with Cracked Tellicherry Pepper',
    description:
      'Tonnarelli pasta emulsified with aged Pecorino Romano and toasted Tellicherry black peppercorns.',
    price: 645,
    category: 'Italian',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=900&q=80',
    prepTime: '16 mins',
  },

  // Desserts (3 items)
  {
    id: 'ds-01',
    name: 'Classic Espresso Tiramisu',
    description:
      'Savoiardi soaked in single-estate Indian espresso, layered with whipped mascarpone and dusted with Dutch-process cocoa.',
    price: 425,
    category: 'Desserts',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '10 mins',
  },
  {
    id: 'ds-02',
    name: 'Saffron & Pistachio Panna Cotta',
    description:
      'Silky cardamom-infused cream set with Kashmiri saffron, topped with roasted Iranian pistachios and rose petals.',
    price: 395,
    category: 'Desserts',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    prepTime: '10 mins',
  },
  {
    id: 'ds-03',
    name: 'Warm Valrhona Dark Chocolate Fondant',
    description:
      'Molten 70% dark chocolate cake served with house-churned Madagascar vanilla bean gelato and sea salt.',
    price: 465,
    category: 'Desserts',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    prepTime: '14 mins',
  },

  // Beverages (3 items)
  {
    id: 'bv-01',
    name: 'Smoked Saffron & Blood Orange Spritz',
    description:
      'Zero-proof botanical aperitif with pressed blood orange, saffron reduction, rosemary sprig, and sparkling tonic.',
    price: 295,
    category: 'Beverages',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    popular: true,
    prepTime: '6 mins',
  },
  {
    id: 'bv-02',
    name: 'Cold-Pressed Pomegranate & Mint Cooler',
    description:
      'Freshly pressed ruby pomegranate, crushed garden mint, Himalayan pink salt, and lime.',
    price: 245,
    category: 'Beverages',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
    prepTime: '5 mins',
  },
  {
    id: 'bv-03',
    name: 'Single-Estate Chikmagalur Pour-Over',
    description:
      'Hand-brewed medium-roast Arabica with notes of roasted hazelnut, jaggery, and dark cocoa. Served hot or over ice.',
    price: 225,
    category: 'Beverages',
    dietary: 'veg',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    prepTime: '7 mins',
  },
];
